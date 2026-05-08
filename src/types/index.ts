export interface Profile {
  id: string;
  nome: string;
  email: string;
  plano: 'free' | 'basic' | 'pro';
  creditos: number;
  data_criacao: string;
}

export interface BannerCopy {
  titulo: string;
  subtitulo: string;
  beneficios: string[];
  cta: string;
}

export interface Banner {
  id: string;
  user_id: string;
  tipo: string;
  produto: string;
  preco: string;
  dados: {
    copies: BannerCopy[];
    selected_index?: number;
  };
  imagem_url: string;
  data_criacao: string;
}

export interface GenerateRequest {
  tipo: string;
  produto: string;
  preco: string;
  beneficios: string;
  diferencial: string;
}

export interface Plan {
  id: string;
  label: string;
  creditos: number;
  valor: number;
  popular?: boolean;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    label: 'Starter',
    creditos: 10,
    valor: 10,
    features: ['10 gerações de banners', '5 variações por geração', 'Download em PNG', 'Suporte por email'],
  },
  {
    id: 'popular',
    label: 'Popular',
    creditos: 50,
    valor: 29,
    popular: true,
    features: ['50 gerações de banners', '5 variações por geração', 'Download em PNG', 'Histórico completo', 'Suporte prioritário'],
  },
  {
    id: 'pro',
    label: 'Pro',
    creditos: 100,
    valor: 49,
    features: ['100 gerações de banners', '5 variações por geração', 'Download em PNG', 'Histórico completo', 'Suporte 24h', 'Acesso antecipado a novos templates'],
  },
];
