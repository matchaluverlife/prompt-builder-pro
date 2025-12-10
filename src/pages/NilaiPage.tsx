import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface NilaiWithRelations {
  id: string;
  nilai_angka: number;
  nilai_huruf: string;
  semester: string;
  tahun_ajaran: string;
  mahasiswa: {
    nim: string;
    nama: string;
  };
  mata_kuliah: {
    kode: string;
    nama: string;
  };
}

const NilaiPage = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<NilaiWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const { data: nilai, error } = await supabase
      .from('nilai')
      .select(`
        id,
        nilai_angka,
        nilai_huruf,
        semester,
        tahun_ajaran,
        mahasiswa:mahasiswa_id (nim, nama),
        mata_kuliah:mata_kuliah_id (kode, nama)
      `)
      .order('created_at', { ascending: false });
    
    if (!error && nilai) {
      setData(nilai as unknown as NilaiWithRelations[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter(n => 
    n.mahasiswa?.nama?.toLowerCase().includes(search.toLowerCase()) ||
    n.mahasiswa?.nim?.includes(search) ||
    n.mata_kuliah?.nama?.toLowerCase().includes(search.toLowerCase())
  );

  const getNilaiColor = (huruf: string) => {
    if (huruf.startsWith('A')) return 'bg-success/10 text-success';
    if (huruf.startsWith('B')) return 'bg-primary/10 text-primary';
    if (huruf.startsWith('C')) return 'bg-warning/10 text-warning';
    return 'bg-destructive/10 text-destructive';
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Data Nilai</h1>
        <p className="text-muted-foreground">Relasi data nilai mahasiswa dengan mata kuliah</p>
      </div>

      <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama atau mata kuliah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {data.length === 0 ? 'Belum ada data nilai' : 'Tidak ada hasil pencarian'}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">NIM</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Nama Mahasiswa</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Mata Kuliah</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Nilai</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Semester</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Tahun Ajaran</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((nilai, index) => (
                  <tr 
                    key={nilai.id} 
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-4 text-sm font-medium text-primary">{nilai.mahasiswa?.nim || '-'}</td>
                    <td className="py-4 px-4 text-sm font-medium text-foreground">{nilai.mahasiswa?.nama || '-'}</td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      <span className="text-muted-foreground text-xs">{nilai.mata_kuliah?.kode || '-'}</span>
                      <br />
                      {nilai.mata_kuliah?.nama || '-'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{nilai.nilai_angka}</span>
                        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getNilaiColor(nilai.nilai_huruf))}>
                          {nilai.nilai_huruf}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{nilai.semester}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{nilai.tahun_ajaran}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="p-4 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredData.length} dari {data.length} data nilai
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NilaiPage;
