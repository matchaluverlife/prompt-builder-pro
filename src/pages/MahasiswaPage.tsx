import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Mahasiswa {
  id: string;
  nim: string;
  nama: string;
  email: string;
  jurusan: string;
  angkatan: number;
}

const MahasiswaPage = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Mahasiswa[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const { data: mahasiswa, error } = await supabase
      .from('mahasiswa')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && mahasiswa) {
      setData(mahasiswa);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter(mhs => 
    mhs.nama.toLowerCase().includes(search.toLowerCase()) ||
    mhs.nim.includes(search) ||
    mhs.jurusan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Data Mahasiswa</h1>
        <p className="text-muted-foreground">Daftar seluruh mahasiswa yang terdaftar dalam sistem</p>
      </div>

      <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari mahasiswa..."
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
              {data.length === 0 ? 'Belum ada data mahasiswa' : 'Tidak ada hasil pencarian'}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">NIM</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Nama</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Email</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Jurusan</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Angkatan</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((mhs, index) => (
                  <tr 
                    key={mhs.id} 
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-4 text-sm font-medium text-primary">{mhs.nim}</td>
                    <td className="py-4 px-4 text-sm font-medium text-foreground">{mhs.nama}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{mhs.email}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{mhs.jurusan}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {mhs.angkatan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="p-4 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredData.length} dari {data.length} mahasiswa
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MahasiswaPage;
