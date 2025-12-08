import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Database, BarChart3, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: 'Manajemen Mahasiswa',
      description: 'Kelola data mahasiswa dengan mudah dan terstruktur',
    },
    {
      icon: Database,
      title: 'Data Terintegrasi',
      description: 'Tabel data yang saling berelasi untuk analisis komprehensif',
    },
    {
      icon: BarChart3,
      title: 'Dashboard Statistik',
      description: 'Visualisasi data real-time untuk pengambilan keputusan',
    },
  ];

  const checklist = [
    'Sistem berbasis web',
    'Login/autentikasi pengguna',
    'Submit data dengan form interaktif',
    'Tabel data dengan relasi',
    'Dashboard statistik metadata',
    'Hasil preprocessing data',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Sistem Akuisisi Data Pendidikan
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Kelola Data Pendidikan dengan{' '}
              <span className="text-primary">Mudah & Efisien</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Platform modern untuk mengakuisisi, mengelola, dan menganalisis data dalam lingkungan pendidikan. 
              Mendukung tabel data berelasi dengan dashboard statistik yang komprehensif.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button variant="hero" size="xl">
                  Mulai Sekarang
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl">
                  Lihat Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Fitur Utama</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sistem lengkap dengan berbagai fitur untuk mengelola data pendidikan
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card p-8 rounded-2xl shadow-md border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Komponen Sistem yang Tersedia
                </h2>
                <p className="text-muted-foreground mb-8">
                  Sistem ini dirancang untuk memenuhi kebutuhan akuisisi data pendidikan dengan fitur-fitur lengkap:
                </p>
                <ul className="space-y-4">
                  {checklist.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded-full w-3/4" />
                  <div className="h-4 bg-muted rounded-full w-full" />
                  <div className="h-4 bg-muted rounded-full w-5/6" />
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mt-6 flex items-center justify-center">
                    <BarChart3 className="w-16 h-16 text-primary/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="h-20 bg-muted rounded-lg" />
                    <div className="h-20 bg-muted rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Siap Mengelola Data Pendidikan?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Mulai gunakan sistem akuisisi data untuk menganalisis dan memproses data pendidikan dengan lebih efektif.
          </p>
          <Link to="/login">
            <Button size="xl" className="bg-card text-primary hover:bg-card/90">
              Daftar Gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 EduData - Sistem Akuisisi Data Pendidikan</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
