import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=2000&q=60)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/60 to-navy-950/80" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-20 flex flex-col items-center text-center">
        {/* Badge */}
        <span className="inline-block bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-6 sm:mb-8">
          Itapevi e Região
        </span>

        {/* Título Principal */}
        <h1 className="hero-title-main font-bold text-white leading-tight max-w-4xl">
          Vidraçaria Elizabeth
          <span className="text-teal-400 block mt-2">Soluções do Médio ao Alto Padrão</span>
        </h1>

        {/* Descrição */}
        <p className="hero-description mt-6 sm:mt-8 text-white/70 max-w-2xl leading-relaxed font-light">
          Atendemos Itapevi e região com projetos sob medida que se adaptam à sua necessidade. De instalações essenciais a acabamentos de luxo, garantimos qualidade e precisão em cada detalhe.
        </p>

        {/* Botões Padronizados */}
        <div className="hero-buttons-container mt-10 sm:mt-12 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/vidros"
            className="w-full sm:w-[220px] bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide transition-all duration-200 hover:shadow-2xl hover:shadow-teal-500/40 hover:-translate-y-0.5 text-center"
          >
            VIDROS
          </Link>
          <Link
            to="/esquadrias"
            className="w-full sm:w-[220px] border-2 border-white/40 hover:border-teal-400 text-white hover:text-teal-300 font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm text-center"
          >
            ESQUADRIAS
          </Link>
        </div>

        {/* Seção de Estatísticas */}
        <div className="hero-stats-section mt-14 sm:mt-16 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-white/60 place-items-center">
            <div className="flex flex-col items-center gap-2.5">
              <span className="hero-stat-number text-teal-400 font-bold">15+</span>
              <span className="hero-stat-label text-white/70 font-medium text-center">Anos de experiência</span>
            </div>
            <div className="flex flex-col items-center gap-2.5 hidden sm:flex">
              <span className="hero-stat-number text-teal-400 font-bold">500+</span>
              <span className="hero-stat-label text-white/70 font-medium text-center">Obras realizadas</span>
            </div>
            <div className="flex flex-col items-center gap-2.5 hidden sm:flex">
              <span className="hero-stat-number text-teal-400 font-bold">100%</span>
              <span className="hero-stat-label text-white/70 font-medium text-center">Dos condomínios</span>
            </div>
          </div>

          {/* Estatísticas Mobile (coluna) */}
          <div className="sm:hidden mt-6 flex flex-col items-center gap-6 text-white/60">
            <div className="flex flex-col items-center gap-2">
              <span className="hero-stat-number text-teal-400 font-bold">500+</span>
              <span className="hero-stat-label text-white/70 font-medium">Obras realizadas</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="hero-stat-number text-teal-400 font-bold">100%</span>
              <span className="hero-stat-label text-white/70 font-medium">Dos condomínios</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a href="#contato-rapido" className="text-white/40 hover:text-teal-400 transition-colors">
          <ChevronDown className="w-7 h-7" />
        </a>
      </div>
    </section>
  );
}
