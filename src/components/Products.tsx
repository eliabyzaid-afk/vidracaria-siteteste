import { Droplets, Sparkles, Shield, Home, LayoutGrid, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    icon: Droplets,
    title: 'Box de Banheiro',
    description: 'Renove seu banheiro com estilo e praticidade. Modelos sob medida em vidro temperado.',
    image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Sparkles,
    title: 'Espelhos sob Medida',
    description: 'Beleza e funcionalidade em perfeita harmonia. Espelhos personalizados para qualquer ambiente.',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Shield,
    title: 'Guarda-corpo de Piscina',
    description: 'Segurança com transparência total. Proteção elegante para piscinas e escadas.',
    image: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Home,
    title: 'Fechamento de Sacadas',
    description: 'Proteção e conforto para sua família. Fechamentos em vidro que valorizam seu imóvel.',
    image: 'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: LayoutGrid,
    title: 'Esquadrias de Alumínio',
    description: 'Durabilidade e design impecável. Janelas e portas de alumínio com acabamento premium.',
    image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Layers,
    title: 'Vidros Temperados',
    description: 'Resistência e segurança certificadas. Vidros que seguem todos os protocolos da ABNT.',
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function Products() {
  return (
    <section id="produtos" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-teal-600 text-sm font-semibold tracking-[0.15em] uppercase">O que fazemos</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900">
            Nossas Especialidades
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Do projeto à instalação, entregamos soluções completas em vidro e alumínio com garantia e qualidade premium.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.title}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-navy-900 font-bold text-lg mb-2">{product.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>
                  <Link
                    to="/galeria"
                    className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-semibold group/link transition-colors"
                  >
                    Ver Galeria Completa
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/galeria"
            className="inline-flex items-center gap-3 border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide transition-all duration-200"
          >
            Ver Galeria Completa
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
