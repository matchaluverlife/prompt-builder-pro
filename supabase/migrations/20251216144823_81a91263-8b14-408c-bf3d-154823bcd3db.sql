-- Allow anyone to delete from mahasiswa
CREATE POLICY "Anyone can delete mahasiswa"
ON public.mahasiswa
FOR DELETE
USING (true);

-- Allow anyone to delete from mata_kuliah
CREATE POLICY "Anyone can delete mata_kuliah"
ON public.mata_kuliah
FOR DELETE
USING (true);

-- Allow anyone to delete from nilai
CREATE POLICY "Anyone can delete nilai"
ON public.nilai
FOR DELETE
USING (true);