import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import { getStats, mahasiswaData, nilaiData } from '@/data/mockData';
import { Users, BookOpen, FileText, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const stats = getStats();

  const COLORS = ['hsl(221, 83%, 53%)', 'hsl(187, 92%, 35%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)', 'hsl(0, 84%, 60%)', 'hsl(280, 67%, 55%)'];

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
          trend="+12% dari bulan lalu"
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
          trend="+25 data baru"
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
        </div>

        {/* Distribusi Jurusan */}
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Distribusi Jurusan</h3>
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
        </div>
      </div>

      {/* Recent Data */}
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Mahasiswa Terbaru</h3>
        <div className="overflow-x-auto">
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
              {mahasiswaData.slice(0, 5).map((mhs) => (
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
