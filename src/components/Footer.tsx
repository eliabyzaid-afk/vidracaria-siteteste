import { Diamond, MessageCircle, MapPin, Instagram, Facebook } from 'lucide-react';

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
                href="https://www.instagram.com/vidracaria_elisabeth?igsh=aGhieWgxNjUyOGRl"
                target="_blank"
                rel="noopener noreferrer"
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
              <li>
                <a href="#" className="text-white/50 hover:text-teal-400 text-sm transition-colors">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDkyNjg1NDA5NDE0MDA2?story_media_id=3199624587046292799_62002757424&igsh=czQ4c2U0ZnA3Y29n" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-teal-400 text-sm transition-colors">
                  Nossos projetos
                </a>
              </li>
              <li>
                <a href="#" className="text-white/50 hover:text-teal-400 text-sm transition-colors">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#" className="text-white/50 hover:text-teal-400 text-sm transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/50 hover:text-teal-400 text-sm transition-colors">
                  Trabalhe conosco
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contato</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/5511000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/50 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-white/30 mb-0.5">WhatsApp Comercial</div>
                    <a
                  href="https://api.whatsapp.com/send/?phone=5511983093577&text=Ol%C3%A1%21+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+o+servi%C3%A7o+de+vidra%C3%A7aria+e+or%C3%A7amentos.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-teal-400 transition-colors"
                >
                  (11) 98309-3577
                </a>
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
                    <a
                  href="https://api.whatsapp.com/send/?phone=5511980347789&text=Ol%C3%A1%21+Gostaria+de+tirar+uma+d%C3%BAvida+sobre+um+projeto.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-teal-400 transition-colors"
                >
                  (11) 98034-7789
                </a>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/50">
                  <MapPin className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-white/30 mb-0.5">Endereço</div>
                    <a
                  href="https://www.google.com/maps/dir//Vidraçaria+Elisabeth,+R.+San+Salvador,+24+-+Jardim+Santa+Rita,+Itapevi+-+SP,+06660-200/@-23.5521935,-46.95137,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x94cf01e66b9cb9e1:0xbd3af40a45c26c49!2m2!1d-46.9479233!2d-23.5521364?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-teal-400 transition-colors"
                >
                  R. San Salvador, 24 - Jardim Santa Rita, Itapevi - SP, 06660-200
                </a>
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
