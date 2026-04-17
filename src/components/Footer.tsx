import { Diamond, Phone, MessageCircle, MapPin, Instagram, Facebook } from 'lucide-react';

const quickLinks = [
  { label: 'Box de Banheiro', href: '#produtos' },
  { label: 'Espelhos sob Medida', href: '#produtos' },
  { label: 'Guarda-corpo', href: '#produtos' },
  { label: 'Fechamento de Sacadas', href: '#produtos' },
  { label: 'Esquadrias de Alumínio', href: '#produtos' },
  { label: 'Vidros Temperados', href: '#produtos' },
];

export default function Footer() {
  return (
    <footer id="contato" className="bg-navy-950">
      <div className="bg-teal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Pronto para transformar seu espaço?
              </h2>
              <p className="mt-2 text-white/80 text-sm">
                Fale agora pelo WhatsApp e receba um orçamento em até 24 horas.
              </p>
            </div>
            <a
              href="https://wa.me/5511000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-white hover:bg-gray-50 text-teal-600 font-bold px-10 py-4 rounded-full text-sm tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-black/20 flex items-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              SOLICITAR ORÇAMENTO PELO WHATSAPP
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-teal-500 rounded flex items-center justify-center">
                <Diamond className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold text-base tracking-wide">VIDRAÇARIA</span>
                <span className="text-teal-400 font-semibold text-xs tracking-[0.2em] uppercase">Elisabeth</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Especialistas em vidros, espelhos e esquadrias de alumínio. Atendemos Alphaville, Barueri, Santana de Parnaíba e toda a região.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-teal-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-teal-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Produtos</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-teal-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Empresa</h3>
            <ul className="space-y-2.5">
              {['Sobre nós', 'Nossos projetos', 'Depoimentos', 'Blog', 'Trabalhe conosco'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-teal-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contato</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+551100000000"
                  className="flex items-start gap-3 text-white/50 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-white/30 mb-0.5">Telefone / SAC</div>
                    <span className="text-sm">(11) 0000-0000</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/50 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-white/30 mb-0.5">WhatsApp</div>
                    <span className="text-sm">(11) 9 0000-0000</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/50">
                  <MapPin className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-white/30 mb-0.5">Endereço</div>
                    <span className="text-sm">Itapevi e região — SP</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Vidraçaria Elisabeth. Todos os direitos reservados.
          </p>
          <p className="text-white/20 text-xs">
            CNPJ: 00.000.000/0001-00
          </p>
        </div>
      </div>
    </footer>
  );
}
