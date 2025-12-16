import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import { Users, BookOpen, FileText, TrendingUp, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface Mahasiswa {
  id: string;
  nim: string;
  nama: string;
  jurusan: string;
  angkatan: number;
}

interface Stats {
  totalMahasiswa: number;
  totalMataKuliah: number;
  totalNilai: number;
  rataRataIPK: string;
  distribusiNilai: { huruf: string; count: number }[];
  distribusiJurusan: { jurusan: string; count: number }[];
}

const Dashboard = () => {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalMahasiswa: 0,
    totalMataKuliah: 0,
    totalNilai: 0,
    rataRataIPK: '0.00',
    distribusiNilai: [],
    distribusiJurusan: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const COLORS = ['hsl(221, 83%, 53%)', 'hsl(187, 92%, 35%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)', 'hsl(0, 84%, 60%)', 'hsl(280, 67%, 55%)'];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch mahasiswa
        const { data: mahasiswaData } = await supabase
          .from('mahasiswa')
          .select('*')
          .order('created_at', { ascending: false });

        // Fetch mata kuliah count
        const { count: mataKuliahCount } = await supabase
          .from('mata_kuliah')
          .select('*', { count: 'exact', head: true });

        // Fetch nilai with mata_kuliah for IPK calculation
        const { data: nilaiData } = await supabase
          .from('nilai')
          .select('*, mata_kuliah:mata_kuliah_id(sks)');

        const mahasiswaList = mahasiswaData || [];
        const nilaiList = nilaiData || [];

        // Calculate distribusi nilai
        const nilaiCount: Record<string, number> = {};
        nilaiList.forEach(n => {
          nilaiCount[n.nilai_huruf] = (nilaiCount[n.nilai_huruf] || 0) + 1;
        });
        const distribusiNilai = Object.entries(nilaiCount).map(([huruf, count]) => ({ huruf, count }));

        // Calculate distribusi jurusan
        const jurusanCount: Record<string, number> = {};
        mahasiswaList.forEach(m => {
          jurusanCount[m.jurusan] = (jurusanCount[m.jurusan] || 0) + 1;
        });
        const distribusiJurusan = Object.entries(jurusanCount).map(([jurusan, count]) => ({ jurusan, count }));

        // Calculate rata-rata IPK
        const getBobot = (nilaiHuruf: string): number => {
          const bobotMap: Record<string, number> = {
            'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'E': 0
          };
          return bobotMap[nilaiHuruf] || 0;
        };

        let totalIPK = 0;
        let studentCount = 0;
        mahasiswaList.forEach(mhs => {
          const studentNilai = nilaiList.filter(n => n.mahasiswa_id === mhs.id);
          if (studentNilai.length > 0) {
            let totalBobot = 0;
            let totalSks = 0;
            studentNilai.forEach(n => {
              const sks = n.mata_kuliah?.sks || 0;
              totalBobot += getBobot(n.nilai_huruf) * sks;
              totalSks += sks;
            });
            if (totalSks > 0) {
              totalIPK += totalBobot / totalSks;
              studentCount++;
            }
          }
        });

        const rataRataIPK = studentCount > 0 ? (totalIPK / studentCount).toFixed(2) : '0.00';

        setMahasiswa(mahasiswaList);
        setStats({
          totalMahasiswa: mahasiswaList.length,
          totalMataKuliah: mataKuliahCount || 0,
          totalNilai: nilaiList.length,
          rataRataIPK,
          distribusiNilai,
          distribusiJurusan,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Statistik dan ringkasan data pendidikan</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Mahasiswa"
          value={stats.totalMahasiswa}
          icon={Users}
          color="primary"
        />
        <StatCard
          title="Total Mata Kuliah"
          value={stats.totalMataKuliah}
          icon={BookOpen}
          color="accent"
        />
        <StatCard
          title="Total Data Nilai"
          value={stats.totalNilai}
          icon={FileText}
          color="success"
        />
        <StatCard
          title="Rata-rata IPK"
          value={stats.rataRataIPK}
          icon={TrendingUp}
          color="warning"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Distribusi Nilai */}
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Distribusi Nilai</h3>
          {stats.distribusiNilai.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.distribusiNilai}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="huruf" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="count" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              Belum ada data nilai
            </div>
          )}
        </div>

        {/* Distribusi Jurusan */}
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Distribusi Jurusan</h3>
          {stats.distribusiJurusan.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.distribusiJurusan}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="count"
                  label={({ jurusan, percent }) => `${jurusan.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.distribusiJurusan.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              Belum ada data mahasiswa
            </div>
          )}
        </div>
      </div>

      {/* Recent Data */}
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Mahasiswa Terbaru</h3>
        <div className="overflow-x-auto">
          {mahasiswa.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">NIM</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nama</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Jurusan</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Angkatan</th>
                </tr>
              </thead>
              <tbody>
                {mahasiswa.slice(0, 5).map((mhs) => (
                  <tr key={mhs.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{mhs.nim}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{mhs.nama}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{mhs.jurusan}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {mhs.angkatan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada data mahasiswa
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
