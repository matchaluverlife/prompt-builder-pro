import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Users, BookOpen, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

type DataType = 'mahasiswa' | 'matakuliah' | 'nilai';

const SubmitDataPage = () => {
  const [activeType, setActiveType] = useState<DataType>('mahasiswa');
  const { toast } = useToast();

  const dataTypes = [
    { id: 'mahasiswa' as DataType, label: 'Mahasiswa', icon: Users },
    { id: 'matakuliah' as DataType, label: 'Mata Kuliah', icon: BookOpen },
    { id: 'nilai' as DataType, label: 'Nilai', icon: FileText },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Data Berhasil Ditambahkan!",
      description: `Data ${activeType} baru telah berhasil disimpan ke sistem.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Submit Data</h1>
        <p className="text-muted-foreground">Tambahkan data baru ke dalam sistem</p>
      </div>

      <div className="max-w-2xl">
        {/* Data Type Selector */}
        <div className="flex gap-2 mb-6">
          {dataTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
                activeType === type.id
                  ? "gradient-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground border border-border hover:bg-muted"
              )}
            >
              <type.icon className="w-5 h-5" />
              {type.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="bg-card rounded-xl shadow-md border border-border p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {activeType === 'mahasiswa' && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nim">NIM</Label>
                    <Input id="nim" placeholder="Contoh: 2024001" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input id="nama" placeholder="Nama mahasiswa" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jurusan">Jurusan</Label>
                    <Input id="jurusan" placeholder="Teknik Informatika" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="angkatan">Angkatan</Label>
                    <Input id="angkatan" type="number" placeholder="2024" required />
                  </div>
                </div>
              </>
            )}

            {activeType === 'matakuliah' && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="kode">Kode Mata Kuliah</Label>
                    <Input id="kode" placeholder="Contoh: IF101" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="namaMk">Nama Mata Kuliah</Label>
                    <Input id="namaMk" placeholder="Nama mata kuliah" required />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sks">SKS</Label>
                    <Input id="sks" type="number" placeholder="3" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Input id="semester" type="number" placeholder="1" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dosen">Dosen Pengampu</Label>
                  <Input id="dosen" placeholder="Nama dosen" required />
                </div>
              </>
            )}

            {activeType === 'nilai' && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nimNilai">NIM Mahasiswa</Label>
                    <Input id="nimNilai" placeholder="2024001" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kodeMk">Kode Mata Kuliah</Label>
                    <Input id="kodeMk" placeholder="IF101" required />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nilaiAngka">Nilai Angka</Label>
                    <Input id="nilaiAngka" type="number" placeholder="85" min="0" max="100" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nilaiHuruf">Nilai Huruf</Label>
                    <Input id="nilaiHuruf" placeholder="A" required />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="semesterNilai">Semester</Label>
                    <Input id="semesterNilai" placeholder="Ganjil/Genap" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tahunAjaran">Tahun Ajaran</Label>
                    <Input id="tahunAjaran" placeholder="2024/2025" required />
                  </div>
                </div>
              </>
            )}

            <Button type="submit" variant="hero" className="w-full">
              Simpan Data
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubmitDataPage;
