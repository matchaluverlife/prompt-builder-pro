import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - langsung redirect ke dashboard
    toast({
      title: isLogin ? "Login Berhasil!" : "Registrasi Berhasil!",
      description: "Selamat datang di EduData",
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">EduData</h1>
              <p className="text-sm text-muted-foreground">Sistem Akuisisi Data</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? 'Masuk ke Akun' : 'Buat Akun Baru'}
            </h2>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Masukkan kredensial untuk mengakses sistem' 
                : 'Daftar untuk mulai mengelola data pendidikan'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="hero" className="w-full h-12">
              {isLogin ? 'Masuk' : 'Daftar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-medium ml-2 hover:underline"
              >
                {isLogin ? 'Daftar' : 'Masuk'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-center text-primary-foreground">
          <div className="w-24 h-24 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-8 animate-float">
            <GraduationCap className="w-14 h-14" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Sistem Akuisisi Data Pendidikan
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Platform modern untuk mengakuisisi, mengelola, dan menganalisis data dalam lingkungan pendidikan. 
            Mendukung tabel data berelasi dengan dashboard statistik yang komprehensif.
          </p>
          
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm text-primary-foreground/70">Mahasiswa</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-primary-foreground/70">Mata Kuliah</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm text-primary-foreground/70">Data Nilai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
