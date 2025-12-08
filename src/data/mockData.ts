import { Mahasiswa, MataKuliah, Nilai, PreprocessedData } from '@/types/data';

export const mahasiswaData: Mahasiswa[] = [
  { id: '1', nim: '2021001', nama: 'Ahmad Rizki', email: 'ahmad@email.com', jurusan: 'Teknik Informatika', angkatan: 2021, createdAt: new Date('2021-08-15') },
  { id: '2', nim: '2021002', nama: 'Siti Nurhaliza', email: 'siti@email.com', jurusan: 'Sistem Informasi', angkatan: 2021, createdAt: new Date('2021-08-15') },
  { id: '3', nim: '2022001', nama: 'Budi Santoso', email: 'budi@email.com', jurusan: 'Teknik Informatika', angkatan: 2022, createdAt: new Date('2022-08-15') },
  { id: '4', nim: '2022002', nama: 'Dewi Lestari', email: 'dewi@email.com', jurusan: 'Manajemen Informatika', angkatan: 2022, createdAt: new Date('2022-08-15') },
  { id: '5', nim: '2023001', nama: 'Eko Prasetyo', email: 'eko@email.com', jurusan: 'Teknik Informatika', angkatan: 2023, createdAt: new Date('2023-08-15') },
  { id: '6', nim: '2023002', nama: 'Fitri Handayani', email: 'fitri@email.com', jurusan: 'Sistem Informasi', angkatan: 2023, createdAt: new Date('2023-08-15') },
  { id: '7', nim: '2021003', nama: 'Galih Pratama', email: 'galih@email.com', jurusan: 'Manajemen Informatika', angkatan: 2021, createdAt: new Date('2021-08-15') },
  { id: '8', nim: '2022003', nama: 'Hana Safitri', email: 'hana@email.com', jurusan: 'Teknik Informatika', angkatan: 2022, createdAt: new Date('2022-08-15') },
];

export const mataKuliahData: MataKuliah[] = [
  { id: '1', kode: 'IF101', nama: 'Algoritma dan Pemrograman', sks: 3, semester: 1, dosen: 'Dr. Ir. Sutrisno' },
  { id: '2', kode: 'IF102', nama: 'Struktur Data', sks: 3, semester: 2, dosen: 'Prof. Agus Wijaya' },
  { id: '3', kode: 'IF201', nama: 'Basis Data', sks: 4, semester: 3, dosen: 'Dr. Maya Sari' },
  { id: '4', kode: 'IF202', nama: 'Pemrograman Web', sks: 3, semester: 4, dosen: 'Ir. Bambang Suryanto' },
  { id: '5', kode: 'IF301', nama: 'Machine Learning', sks: 3, semester: 5, dosen: 'Prof. Dr. Rina Dewi' },
  { id: '6', kode: 'IF302', nama: 'Data Mining', sks: 3, semester: 6, dosen: 'Dr. Fajar Nugroho' },
  { id: '7', kode: 'SI101', nama: 'Sistem Informasi Manajemen', sks: 3, semester: 3, dosen: 'Dr. Linda Kartika' },
  { id: '8', kode: 'MI101', nama: 'Jaringan Komputer', sks: 3, semester: 4, dosen: 'Ir. Dedi Kurniawan' },
];

export const nilaiData: Nilai[] = [
  { id: '1', mahasiswaId: '1', mataKuliahId: '1', nilaiAngka: 85, nilaiHuruf: 'A', semester: 'Ganjil', tahunAjaran: '2021/2022' },
  { id: '2', mahasiswaId: '1', mataKuliahId: '2', nilaiAngka: 78, nilaiHuruf: 'B+', semester: 'Genap', tahunAjaran: '2021/2022' },
  { id: '3', mahasiswaId: '1', mataKuliahId: '3', nilaiAngka: 90, nilaiHuruf: 'A', semester: 'Ganjil', tahunAjaran: '2022/2023' },
  { id: '4', mahasiswaId: '2', mataKuliahId: '1', nilaiAngka: 72, nilaiHuruf: 'B', semester: 'Ganjil', tahunAjaran: '2021/2022' },
  { id: '5', mahasiswaId: '2', mataKuliahId: '7', nilaiAngka: 88, nilaiHuruf: 'A', semester: 'Ganjil', tahunAjaran: '2022/2023' },
  { id: '6', mahasiswaId: '3', mataKuliahId: '1', nilaiAngka: 95, nilaiHuruf: 'A', semester: 'Ganjil', tahunAjaran: '2022/2023' },
  { id: '7', mahasiswaId: '3', mataKuliahId: '2', nilaiAngka: 82, nilaiHuruf: 'A-', semester: 'Genap', tahunAjaran: '2022/2023' },
  { id: '8', mahasiswaId: '4', mataKuliahId: '8', nilaiAngka: 68, nilaiHuruf: 'B-', semester: 'Genap', tahunAjaran: '2022/2023' },
  { id: '9', mahasiswaId: '5', mataKuliahId: '1', nilaiAngka: 75, nilaiHuruf: 'B+', semester: 'Ganjil', tahunAjaran: '2023/2024' },
  { id: '10', mahasiswaId: '6', mataKuliahId: '7', nilaiAngka: 92, nilaiHuruf: 'A', semester: 'Ganjil', tahunAjaran: '2023/2024' },
  { id: '11', mahasiswaId: '7', mataKuliahId: '1', nilaiAngka: 60, nilaiHuruf: 'C', semester: 'Ganjil', tahunAjaran: '2021/2022' },
  { id: '12', mahasiswaId: '8', mataKuliahId: '5', nilaiAngka: 87, nilaiHuruf: 'A', semester: 'Ganjil', tahunAjaran: '2023/2024' },
];

export const preprocessedData: PreprocessedData[] = [
  { id: '1', mahasiswaId: '1', ipk: 3.75, totalSks: 48, kategoriPrestasi: 'Sangat Baik', rataRataNilai: 84.33 },
  { id: '2', mahasiswaId: '2', ipk: 3.45, totalSks: 42, kategoriPrestasi: 'Baik', rataRataNilai: 80.00 },
  { id: '3', mahasiswaId: '3', ipk: 3.85, totalSks: 36, kategoriPrestasi: 'Sangat Baik', rataRataNilai: 88.50 },
  { id: '4', mahasiswaId: '4', ipk: 2.90, totalSks: 30, kategoriPrestasi: 'Cukup', rataRataNilai: 68.00 },
  { id: '5', mahasiswaId: '5', ipk: 3.20, totalSks: 18, kategoriPrestasi: 'Baik', rataRataNilai: 75.00 },
  { id: '6', mahasiswaId: '6', ipk: 3.90, totalSks: 18, kategoriPrestasi: 'Sangat Baik', rataRataNilai: 92.00 },
  { id: '7', mahasiswaId: '7', ipk: 2.50, totalSks: 48, kategoriPrestasi: 'Kurang', rataRataNilai: 60.00 },
  { id: '8', mahasiswaId: '8', ipk: 3.65, totalSks: 24, kategoriPrestasi: 'Baik', rataRataNilai: 87.00 },
];

export const getStats = () => ({
  totalMahasiswa: mahasiswaData.length,
  totalMataKuliah: mataKuliahData.length,
  totalNilai: nilaiData.length,
  rataRataIPK: parseFloat((preprocessedData.reduce((sum, p) => sum + p.ipk, 0) / preprocessedData.length).toFixed(2)),
  distribusiNilai: [
    { huruf: 'A', count: nilaiData.filter(n => n.nilaiHuruf === 'A').length },
    { huruf: 'A-', count: nilaiData.filter(n => n.nilaiHuruf === 'A-').length },
    { huruf: 'B+', count: nilaiData.filter(n => n.nilaiHuruf === 'B+').length },
    { huruf: 'B', count: nilaiData.filter(n => n.nilaiHuruf === 'B').length },
    { huruf: 'B-', count: nilaiData.filter(n => n.nilaiHuruf === 'B-').length },
    { huruf: 'C', count: nilaiData.filter(n => n.nilaiHuruf === 'C').length },
  ],
  distribusiJurusan: [
    { jurusan: 'Teknik Informatika', count: mahasiswaData.filter(m => m.jurusan === 'Teknik Informatika').length },
    { jurusan: 'Sistem Informasi', count: mahasiswaData.filter(m => m.jurusan === 'Sistem Informasi').length },
    { jurusan: 'Manajemen Informatika', count: mahasiswaData.filter(m => m.jurusan === 'Manajemen Informatika').length },
  ],
});
