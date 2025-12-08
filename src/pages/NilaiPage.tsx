import DashboardLayout from '@/components/layout/DashboardLayout';
import { nilaiData, mahasiswaData, mataKuliahData } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const NilaiPage = () => {
  const [search, setSearch] = useState('');

  const enrichedData = nilaiData.map(nilai => {
    const mahasiswa = mahasiswaData.find(m => m.id === nilai.mahasiswaId);
    const mataKuliah = mataKuliahData.find(mk => mk.id === nilai.mataKuliahId);
    return {
      ...nilai,
      namaMahasiswa: mahasiswa?.nama || '-',
      nimMahasiswa: mahasiswa?.nim || '-',
      namaMataKuliah: mataKuliah?.nama || '-',
      kodeMataKuliah: mataKuliah?.kode || '-',
    };
  });

  const filteredData = enrichedData.filter(n => 
    n.namaMahasiswa.toLowerCase().includes(search.toLowerCase()) ||
    n.nimMahasiswa.includes(search) ||
    n.namaMataKuliah.toLowerCase().includes(search.toLowerCase())
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
                  <td className="py-4 px-4 text-sm font-medium text-primary">{nilai.nimMahasiswa}</td>
                  <td className="py-4 px-4 text-sm font-medium text-foreground">{nilai.namaMahasiswa}</td>
                  <td className="py-4 px-4 text-sm text-foreground">
                    <span className="text-muted-foreground text-xs">{nilai.kodeMataKuliah}</span>
                    <br />
                    {nilai.namaMataKuliah}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{nilai.nilaiAngka}</span>
                      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getNilaiColor(nilai.nilaiHuruf))}>
                        {nilai.nilaiHuruf}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{nilai.semester}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{nilai.tahunAjaran}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredData.length} dari {nilaiData.length} data nilai
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NilaiPage;
