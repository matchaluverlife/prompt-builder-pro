-- Create mahasiswa table
CREATE TABLE public.mahasiswa (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nim TEXT NOT NULL UNIQUE,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  jurusan TEXT NOT NULL,
  angkatan INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mata_kuliah table
CREATE TABLE public.mata_kuliah (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kode TEXT NOT NULL UNIQUE,
  nama TEXT NOT NULL,
  sks INTEGER NOT NULL,
  semester INTEGER NOT NULL,
  dosen TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create nilai table
CREATE TABLE public.nilai (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mahasiswa_id UUID NOT NULL REFERENCES public.mahasiswa(id) ON DELETE CASCADE,
  mata_kuliah_id UUID NOT NULL REFERENCES public.mata_kuliah(id) ON DELETE CASCADE,
  nilai_angka INTEGER NOT NULL CHECK (nilai_angka >= 0 AND nilai_angka <= 100),
  nilai_huruf TEXT NOT NULL,
  semester TEXT NOT NULL,
  tahun_ajaran TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mahasiswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mata_kuliah ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nilai ENABLE ROW LEVEL SECURITY;

-- Public read/write policies (for now, will add admin auth later)
CREATE POLICY "Anyone can view mahasiswa" ON public.mahasiswa FOR SELECT USING (true);
CREATE POLICY "Anyone can insert mahasiswa" ON public.mahasiswa FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view mata_kuliah" ON public.mata_kuliah FOR SELECT USING (true);
CREATE POLICY "Anyone can insert mata_kuliah" ON public.mata_kuliah FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view nilai" ON public.nilai FOR SELECT USING (true);
CREATE POLICY "Anyone can insert nilai" ON public.nilai FOR INSERT WITH CHECK (true);