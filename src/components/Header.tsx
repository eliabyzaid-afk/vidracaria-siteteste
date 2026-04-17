import { useState, useEffect } from 'react';
import { Menu, X, Diamond } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Produtos', href: '#produtos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy-900 shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-teal-500 rounded flex items-center justify-center">
              <Diamond className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
        <div className="text-white font-bold text-sm sm:text-base tracking-wide">VIDDRAÇARIA</div>
              <div className="text-teal-400 font-semibold text-xs tracking-[0.2em] uppercase">Elisabeth</div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-white/80 hover:text-teal-400 text-sm font-medium tracking-wide transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/galeria"
              className="text-white/80 hover:text-teal-400 text-sm font-medium tracking-wide transition-colors duration-200"
            >
              Galeria
            </Link>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-teal-400 text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/30"
            >
              Orçamento Grátis
            </a>
          </nav>

          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-navy-900 border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-1">
            <Link
              to="/"
              className="text-white/80 hover:text-teal-400 text-sm font-medium py-3 border-b border-white/5 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-teal-400 text-sm font-medium py-3 border-b border-white/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/galeria"
              className="text-white/80 hover:text-teal-400 text-sm font-medium py-3 border-b border-white/5 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Galeria
            </Link>
            <a
              href="#contato"
              className="mt-3 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-3 px-5 rounded-full text-center transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Orçamento Grátis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
