import DashboardLayout from '@/components/layout/DashboardLayout';
import { preprocessedData, mahasiswaData } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const PreprocessingPage = () => {
  const [search, setSearch] = useState('');

  const enrichedData = preprocessedData.map(data => {
    const mahasiswa = mahasiswaData.find(m => m.id === data.mahasiswaId);
    return {
      ...data,
      namaMahasiswa: mahasiswa?.nama || '-',
      nimMahasiswa: mahasiswa?.nim || '-',
      jurusan: mahasiswa?.jurusan || '-',
    };
  });

  const filteredData = enrichedData.filter(d => 
    d.namaMahasiswa.toLowerCase().includes(search.toLowerCase()) ||
    d.nimMahasiswa.includes(search)
  );

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
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr 
                  key={data.id} 
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4 text-sm font-medium text-primary">{data.nimMahasiswa}</td>
                  <td className="py-4 px-4 text-sm font-medium text-foreground">{data.namaMahasiswa}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{data.jurusan}</td>
                  <td className="py-4 px-4 text-sm font-bold text-foreground">{data.ipk.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      {data.totalSks} SKS
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-foreground">{data.rataRataNilai.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getKategoriColor(data.kategoriPrestasi))}>
                      {data.kategoriPrestasi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredData.length} dari {preprocessedData.length} data preprocessing
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PreprocessingPage;
