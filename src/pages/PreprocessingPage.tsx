import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface PreprocessedStudent {
  id: string;
  nim: string;
  nama: string;
  jurusan: string;
  ipk: number;
  totalSks: number;
  rataRataNilai: number;
  kategoriPrestasi: string;
}

const PreprocessingPage = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<PreprocessedStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAndProcessData = async () => {
    setIsLoading(true);
    try {
      // Fetch all mahasiswa
      const { data: mahasiswaList, error: mahasiswaError } = await supabase
        .from('mahasiswa')
        .select('*');

      if (mahasiswaError) throw mahasiswaError;

      // Fetch all nilai with mata_kuliah for SKS
      const { data: nilaiList, error: nilaiError } = await supabase
        .from('nilai')
        .select(`
          *,
          mata_kuliah:mata_kuliah_id(sks)
        `);

      if (nilaiError) throw nilaiError;

      // Process data for each student
      const processedData: PreprocessedStudent[] = (mahasiswaList || []).map(mhs => {
        const studentNilai = (nilaiList || []).filter(n => n.mahasiswa_id === mhs.id);
        
        let totalBobot = 0;
        let totalSks = 0;
        let totalNilai = 0;

        studentNilai.forEach(n => {
          const sks = n.mata_kuliah?.sks || 0;
          const bobot = getBobot(n.nilai_huruf);
          totalBobot += bobot * sks;
          totalSks += sks;
          totalNilai += n.nilai_angka;
        });

        const ipk = totalSks > 0 ? totalBobot / totalSks : 0;
        const rataRataNilai = studentNilai.length > 0 ? totalNilai / studentNilai.length : 0;
        const kategoriPrestasi = getKategori(ipk);

        return {
          id: mhs.id,
          nim: mhs.nim,
          nama: mhs.nama,
          jurusan: mhs.jurusan,
          ipk,
          totalSks,
          rataRataNilai,
          kategoriPrestasi,
        };
      });

      setData(processedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBobot = (nilaiHuruf: string): number => {
    const bobotMap: Record<string, number> = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'E': 0
    };
    return bobotMap[nilaiHuruf] || 0;
  };

  const getKategori = (ipk: number): string => {
    if (ipk >= 3.5) return 'Sangat Baik';
    if (ipk >= 3.0) return 'Baik';
    if (ipk >= 2.5) return 'Cukup';
    return 'Kurang';
  };

  useEffect(() => {
    fetchAndProcessData();
  }, []);

  const filteredData = data.filter(d => 
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.nim.includes(search)
  );

  const handleDelete = async (id: string, nama: string) => {
    const { error } = await supabase.from('mahasiswa').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: 'Gagal menghapus data', variant: 'destructive' });
    } else {
      toast({ title: 'Berhasil', description: `Data ${nama} berhasil dihapus` });
      fetchAndProcessData();
    }
  };

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case 'Sangat Baik': return 'bg-success/10 text-success';
      case 'Baik': return 'bg-primary/10 text-primary';
      case 'Cukup': return 'bg-warning/10 text-warning';
      default: return 'bg-destructive/10 text-destructive';
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Hasil Preprocessing Data</h1>
        <p className="text-muted-foreground">Data yang telah diproses dan dikategorisasi berdasarkan performa</p>
      </div>

      <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama atau NIM..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {data.length === 0 ? 'Belum ada data mahasiswa' : 'Tidak ada hasil pencarian'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">NIM</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Nama</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Jurusan</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">IPK</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Total SKS</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Rata-rata Nilai</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Kategori</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-4 text-sm font-medium text-primary">{item.nim}</td>
                    <td className="py-4 px-4 text-sm font-medium text-foreground">{item.nama}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{item.jurusan}</td>
                    <td className="py-4 px-4 text-sm font-bold text-foreground">{item.ipk.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        {item.totalSks} SKS
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">{item.rataRataNilai.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getKategoriColor(item.kategoriPrestasi))}>
                        {item.kategoriPrestasi}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Data Mahasiswa</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus data {item.nama}? Semua data nilai terkait juga akan terhapus. Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id, item.nama)}>Hapus</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="p-4 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredData.length} dari {data.length} data preprocessing
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PreprocessingPage;
