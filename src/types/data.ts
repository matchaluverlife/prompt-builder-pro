export interface Mahasiswa {
  id: string;
  nim: string;
  nama: string;
  email: string;
  jurusan: string;
  angkatan: number;
  createdAt: Date;
}

export interface MataKuliah {
  id: string;
  kode: string;
  nama: string;
  sks: number;
  semester: number;
  dosen: string;
}

export interface Nilai {
  id: string;
  mahasiswaId: string;
  mataKuliahId: string;
  nilaiAngka: number;
  nilaiHuruf: string;
  semester: string;
  tahunAjaran: string;
}

export interface PreprocessedData {
  id: string;
  mahasiswaId: string;
  ipk: number;
  totalSks: number;
  kategoriPrestasi: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang';
  rataRataNilai: number;
}

export interface DashboardStats {
  totalMahasiswa: number;
  totalMataKuliah: number;
  totalNilai: number;
  rataRataIPK: number;
  distribusiNilai: { huruf: string; count: number }[];
  distribusiJurusan: { jurusan: string; count: number }[];
}
