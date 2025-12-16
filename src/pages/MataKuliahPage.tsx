import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Trash2 } from 'lucide-react';
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

interface MataKuliah {
  id: string;
  kode: string;
  nama: string;
  sks: number;
  semester: number;
  dosen: string;
}

const MataKuliahPage = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<MataKuliah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    const { data: mataKuliah, error } = await supabase
      .from('mata_kuliah')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && mataKuliah) {
      setData(mataKuliah);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter(mk => 
    mk.nama.toLowerCase().includes(search.toLowerCase()) ||
    mk.kode.toLowerCase().includes(search.toLowerCase()) ||
    mk.dosen.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, nama: string) => {
    const { error } = await supabase.from('mata_kuliah').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: 'Gagal menghapus data', variant: 'destructive' });
    } else {
      toast({ title: 'Berhasil', description: `Mata kuliah ${nama} berhasil dihapus` });
      fetchData();
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Data Mata Kuliah</h1>
        <p className="text-muted-foreground">Daftar seluruh mata kuliah yang tersedia</p>
      </div>

      <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari mata kuliah..."
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
              {data.length === 0 ? 'Belum ada data mata kuliah' : 'Tidak ada hasil pencarian'}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Kode</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Nama Mata Kuliah</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">SKS</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Semester</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Dosen Pengampu</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((mk, index) => (
                  <tr 
                    key={mk.id} 
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-4 text-sm font-medium text-primary">{mk.kode}</td>
                    <td className="py-4 px-4 text-sm font-medium text-foreground">{mk.nama}</td>
                    <td className="py-4 px-4 text-sm font-medium text-foreground">
                        {mk.sks} SKS
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">Semester {mk.semester}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{mk.dosen}</td>
                    <td className="py-4 px-4">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Mata Kuliah</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus mata kuliah {mk.nama}? Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(mk.id, mk.nama)}>Hapus</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="p-4 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredData.length} dari {data.length} mata kuliah
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MataKuliahPage;
