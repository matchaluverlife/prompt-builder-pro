import DashboardLayout from '@/components/layout/DashboardLayout';
import { mataKuliahData } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

const MataKuliahPage = () => {
  const [search, setSearch] = useState('');

  const filteredData = mataKuliahData.filter(mk => 
    mk.nama.toLowerCase().includes(search.toLowerCase()) ||
    mk.kode.toLowerCase().includes(search.toLowerCase()) ||
    mk.dosen.toLowerCase().includes(search.toLowerCase())
  );

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
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Kode</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Nama Mata Kuliah</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">SKS</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Semester</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Dosen Pengampu</th>
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
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      {mk.sks} SKS
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-foreground">Semester {mk.semester}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{mk.dosen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredData.length} dari {mataKuliahData.length} mata kuliah
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MataKuliahPage;
