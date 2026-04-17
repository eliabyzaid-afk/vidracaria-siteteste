import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Mariana Costa',
    role: 'Moradora — Alphaville',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: 'Atendimento rápido, preço justo e instalação impecável. O box de banheiro ficou lindo! Recomendo a Elisabeth sem hesitar.',
    rating: 5,
  },
  {
    name: 'Ricardo Almeida',
    role: 'Arquiteto — Barueri',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: 'Indico para todos os meus clientes. A qualidade do material e o acabamento são excepcionais. Equipe profissional do início ao fim.',
    rating: 5,
  },
  {
    name: 'Fernanda Souza',
    role: 'Síndica — Condomínio São Paulo',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: 'Fechamos o guarda-corpo de toda a área da piscina. Ficou elegantíssimo. Prazo cumprido e sem dor de cabeça. 5 estrelas!',
    rating: 5,
  },
  {
    name: 'Carlos Mendes',
    role: 'Proprietário — Santana de Parnaíba',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: 'Fiz o fechamento da sacada e as esquadrias de todo o apartamento. Resultado profissional, super limpo e dentro do prazo.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-teal-600 text-sm font-semibold tracking-[0.15em] uppercase">Depoimentos</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900">
            O que nossos clientes dizem
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-gray-500 text-sm font-medium">4.9/5 no Google Reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-teal-100 group-hover:text-teal-200 transition-colors" />

              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.text}"</p>

              <div className="flex items-center gap-3">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-teal-100"
                />
                <div>
                  <div className="font-semibold text-navy-900 text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-3 py-1.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-xs text-gray-500 font-medium">Google</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
