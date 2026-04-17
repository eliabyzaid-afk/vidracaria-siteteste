import { CheckCircle2, Building2, Award, Users, Wrench } from 'lucide-react';

const checklist = [
  'Atendimento rápido e direto, sem enrolação',
  'Orçamento ágil e sem compromisso',
  'Equipe própria, experiente e organizada',
  'Instalação limpa, segura e bem executada',
  'Compromisso com prazos combinados',
  'Suporte mesmo após a finalização',
];

const stats = [
  { icon: Building2, value: '100%', label: 'dos condomínios da região' },
  { icon: Award, value: '15 anos', label: 'de expertise no mercado' },
  { icon: Users, value: '2.000+', label: 'clientes satisfeitos' },
  { icon: Wrench, value: '500+', label: 'obras entregues' },
];

export default function Authority() {
  return (
    <section id="diferenciais" className="bg-navy-900 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="authority-copy">
            <span className="text-teal-400 text-sm font-semibold tracking-[0.15em] uppercase">Por que a Elisabeth?</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-tight">
              Por que a Vidraçaria Elisabeth é a escolha certa?
            </h2>
            <p className="mt-5 text-white/60 text-base leading-relaxed">
              Aqui você não contrata apenas um serviço — você garante um resultado bem feito, do início ao fim. Trabalhamos com atenção em cada detalhe para entregar um acabamento de qualidade, com compromisso, organização e respeito ao seu espaço.
            </p>

            <ul className="mt-8 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-white/75 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-teal-300 text-base leading-relaxed">
              💬 Fale com um especialista agora e faça seu orçamento sem compromisso.
            </p>

            <div className="mt-6">
              <a
                href="https://wa.me/5511000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-full text-sm tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/30"
              >
                Falar com especialista
              </a>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white/5 border border-white/10 hover:border-teal-500/40 rounded-2xl p-6 transition-colors duration-200 group"
                  >
                    <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-500/30 transition-colors">
                      <Icon className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/50 text-xs leading-relaxed">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 bg-gradient-to-r from-teal-500/20 to-teal-600/10 border border-teal-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-teal-300 font-semibold text-sm mb-1">Empresa certificada</div>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Todos os nossos vidros seguem os protocolos de segurança exigidos pela ABNT NBR 7199, garantindo a integridade dos moradores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
