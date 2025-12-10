import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Users, BookOpen, FileText, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

type DataType = 'mahasiswa' | 'matakuliah' | 'nilai';

interface MahasiswaForm {
  nim: string;
  nama: string;
  email: string;
  jurusan: string;
  angkatan: string;
}

interface MataKuliahForm {
  kode: string;
  nama: string;
  sks: string;
  semester: string;
  dosen: string;
}

interface NilaiForm {
  nim: string;
  kodeMk: string;
  nilaiAngka: string;
  nilaiHuruf: string;
  semester: string;
  tahunAjaran: string;
}

const SubmitDataPage = () => {
  const [activeType, setActiveType] = useState<DataType>('mahasiswa');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Form states
  const [mahasiswaForm, setMahasiswaForm] = useState<MahasiswaForm>({
    nim: '', nama: '', email: '', jurusan: '', angkatan: ''
  });
  const [mataKuliahForm, setMataKuliahForm] = useState<MataKuliahForm>({
    kode: '', nama: '', sks: '', semester: '', dosen: ''
  });
  const [nilaiForm, setNilaiForm] = useState<NilaiForm>({
    nim: '', kodeMk: '', nilaiAngka: '', nilaiHuruf: '', semester: '', tahunAjaran: ''
  });

  const dataTypes = [
    { id: 'mahasiswa' as DataType, label: 'Mahasiswa', icon: Users },
    { id: 'matakuliah' as DataType, label: 'Mata Kuliah', icon: BookOpen },
    { id: 'nilai' as DataType, label: 'Nilai', icon: FileText },
  ];

  const resetForms = () => {
    setMahasiswaForm({ nim: '', nama: '', email: '', jurusan: '', angkatan: '' });
    setMataKuliahForm({ kode: '', nama: '', sks: '', semester: '', dosen: '' });
    setNilaiForm({ nim: '', kodeMk: '', nilaiAngka: '', nilaiHuruf: '', semester: '', tahunAjaran: '' });
  };

  const handleSubmitMahasiswa = async () => {
    const { error } = await supabase.from('mahasiswa').insert({
      nim: mahasiswaForm.nim.trim(),
      nama: mahasiswaForm.nama.trim(),
      email: mahasiswaForm.email.trim(),
      jurusan: mahasiswaForm.jurusan.trim(),
      angkatan: parseInt(mahasiswaForm.angkatan)
    });
    
    if (error) throw error;
  };

  const handleSubmitMataKuliah = async () => {
    const { error } = await supabase.from('mata_kuliah').insert({
      kode: mataKuliahForm.kode.trim(),
      nama: mataKuliahForm.nama.trim(),
      sks: parseInt(mataKuliahForm.sks),
      semester: parseInt(mataKuliahForm.semester),
      dosen: mataKuliahForm.dosen.trim()
    });
    
    if (error) throw error;
  };

  const handleSubmitNilai = async () => {
    // Find mahasiswa by NIM
    const { data: mahasiswa, error: mahasiswaError } = await supabase
      .from('mahasiswa')
      .select('id')
      .eq('nim', nilaiForm.nim.trim())
      .maybeSingle();
    
    if (mahasiswaError) throw mahasiswaError;
    if (!mahasiswa) throw new Error('Mahasiswa dengan NIM tersebut tidak ditemukan');

    // Find mata kuliah by kode
    const { data: mataKuliah, error: mkError } = await supabase
      .from('mata_kuliah')
      .select('id')
      .eq('kode', nilaiForm.kodeMk.trim())
      .maybeSingle();
    
    if (mkError) throw mkError;
    if (!mataKuliah) throw new Error('Mata kuliah dengan kode tersebut tidak ditemukan');

    // Insert nilai
    const { error } = await supabase.from('nilai').insert({
      mahasiswa_id: mahasiswa.id,
      mata_kuliah_id: mataKuliah.id,
      nilai_angka: parseInt(nilaiForm.nilaiAngka),
      nilai_huruf: nilaiForm.nilaiHuruf.trim().toUpperCase(),
      semester: nilaiForm.semester.trim(),
      tahun_ajaran: nilaiForm.tahunAjaran.trim()
    });
    
    if (error) throw error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeType === 'mahasiswa') {
        await handleSubmitMahasiswa();
      } else if (activeType === 'matakuliah') {
        await handleSubmitMataKuliah();
      } else {
        await handleSubmitNilai();
      }

      toast({
        title: "Data Berhasil Ditambahkan!",
        description: `Data ${activeType} baru telah berhasil disimpan ke database.`,
      });
      
      resetForms();
    } catch (error: any) {
      console.error('Submit error:', error);
      
      let errorMessage = 'Terjadi kesalahan saat menyimpan data.';
      if (error.message?.includes('duplicate')) {
        errorMessage = 'Data dengan NIM/Kode tersebut sudah ada di database.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Gagal Menyimpan Data",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Submit Data</h1>
        <p className="text-muted-foreground">Tambahkan data baru ke dalam database</p>
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
                    <Input 
                      id="nim" 
                      placeholder="Contoh: 2024001" 
                      value={mahasiswaForm.nim}
                      onChange={(e) => setMahasiswaForm(prev => ({ ...prev, nim: e.target.value }))}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input 
                      id="nama" 
                      placeholder="Nama mahasiswa" 
                      value={mahasiswaForm.nama}
                      onChange={(e) => setMahasiswaForm(prev => ({ ...prev, nama: e.target.value }))}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="email@example.com" 
                    value={mahasiswaForm.email}
                    onChange={(e) => setMahasiswaForm(prev => ({ ...prev, email: e.target.value }))}
                    required 
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jurusan">Jurusan</Label>
                    <Input 
                      id="jurusan" 
                      placeholder="Teknik Informatika" 
                      value={mahasiswaForm.jurusan}
                      onChange={(e) => setMahasiswaForm(prev => ({ ...prev, jurusan: e.target.value }))}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="angkatan">Angkatan</Label>
                    <Input 
                      id="angkatan" 
                      type="number" 
                      placeholder="2024" 
                      value={mahasiswaForm.angkatan}
                      onChange={(e) => setMahasiswaForm(prev => ({ ...prev, angkatan: e.target.value }))}
                      required 
                    />
                  </div>
                </div>
              </>
            )}

            {activeType === 'matakuliah' && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="kode">Kode Mata Kuliah</Label>
                    <Input 
                      id="kode" 
                      placeholder="Contoh: IF101" 
                      value={mataKuliahForm.kode}
                      onChange={(e) => setMataKuliahForm(prev => ({ ...prev, kode: e.target.value }))}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="namaMk">Nama Mata Kuliah</Label>
                    <Input 
                      id="namaMk" 
                      placeholder="Nama mata kuliah" 
                      value={mataKuliahForm.nama}
                      onChange={(e) => setMataKuliahForm(prev => ({ ...prev, nama: e.target.value }))}
                      required 
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sks">SKS</Label>
                    <Input 
                      id="sks" 
                      type="number" 
                      placeholder="3" 
                      value={mataKuliahForm.sks}
                      onChange={(e) => setMataKuliahForm(prev => ({ ...prev, sks: e.target.value }))}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Input 
                      id="semester" 
                      type="number" 
                      placeholder="1" 
                      value={mataKuliahForm.semester}
                      onChange={(e) => setMataKuliahForm(prev => ({ ...prev, semester: e.target.value }))}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dosen">Dosen Pengampu</Label>
                  <Input 
                    id="dosen" 
                    placeholder="Nama dosen" 
                    value={mataKuliahForm.dosen}
                    onChange={(e) => setMataKuliahForm(prev => ({ ...prev, dosen: e.target.value }))}
                    required 
                  />
                </div>
              </>
            )}

            {activeType === 'nilai' && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nimNilai">NIM Mahasiswa</Label>
                    <Input 
                      id="nimNilai" 
                      placeholder="2024001" 
                      value={nilaiForm.nim}
                      onChange={(e) => setNilaiForm(prev => ({ ...prev, nim: e.target.value }))}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kodeMk">Kode Mata Kuliah</Label>
                    <Input 
                      id="kodeMk" 
                      placeholder="IF101" 
                      value={nilaiForm.kodeMk}
                      onChange={(e) => setNilaiForm(prev => ({ ...prev, kodeMk: e.target.value }))}
                      required 
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nilaiAngka">Nilai Angka</Label>
                    <Input 
                      id="nilaiAngka" 
                      type="number" 
                      placeholder="85" 
                      min="0" 
                      max="100" 
                      value={nilaiForm.nilaiAngka}
                      onChange={(e) => setNilaiForm(prev => ({ ...prev, nilaiAngka: e.target.value }))}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nilaiHuruf">Nilai Huruf</Label>
                    <Input 
                      id="nilaiHuruf" 
                      placeholder="A" 
                      value={nilaiForm.nilaiHuruf}
                      onChange={(e) => setNilaiForm(prev => ({ ...prev, nilaiHuruf: e.target.value }))}
                      required 
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="semesterNilai">Semester</Label>
                    <Input 
                      id="semesterNilai" 
                      placeholder="Ganjil/Genap" 
                      value={nilaiForm.semester}
                      onChange={(e) => setNilaiForm(prev => ({ ...prev, semester: e.target.value }))}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tahunAjaran">Tahun Ajaran</Label>
                    <Input 
                      id="tahunAjaran" 
                      placeholder="2024/2025" 
                      value={nilaiForm.tahunAjaran}
                      onChange={(e) => setNilaiForm(prev => ({ ...prev, tahunAjaran: e.target.value }))}
                      required 
                    />
                  </div>
                </div>
              </>
            )}

            <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan Data'
              )}
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubmitDataPage;
