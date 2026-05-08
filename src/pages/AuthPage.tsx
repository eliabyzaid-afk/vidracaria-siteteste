import { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

type Mode = 'login' | 'signup';

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'signup') {
      if (!nome.trim()) { setError('Digite seu nome.'); setLoading(false); return; }
      const { error } = await signUp(email, password, nome);
      if (error) setError(error.message === 'User already registered' ? 'Email já cadastrado.' : error.message);
    } else {
      const { error } = await signIn(email, password);
      if (error) setError('Email ou senha incorretos.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(6,182,212,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(37,99,235,0.1)_0%,_transparent_60%)]" />

        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-2xl font-bold">BannerAI</span>
          </div>

          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Crie banners de alta conversão com IA
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Gere 5 variações profissionais de banners em segundos. Textos persuasivos criados por inteligência artificial.
          </p>

          <div className="space-y-4">
            {[
              { icon: '⚡', text: 'Gera 5 banners simultaneamente' },
              { icon: '🧠', text: 'Textos criados por IA especializada em vendas' },
              { icon: '📱', text: 'Formato Instagram Story (vertical)' },
              { icon: '⬇️', text: 'Download em PNG de alta qualidade' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <p className="text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <p className="text-cyan-300 text-sm font-medium">5 créditos gratis para novos usuarios</p>
            <p className="text-slate-400 text-xs mt-1">Comece a criar banners agora sem precisar de cartão de crédito.</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xl font-bold">BannerAI</span>
          </div>

          <h3 className="text-white text-2xl font-bold mb-2">
            {mode === 'login' ? 'Entrar na sua conta' : 'Criar conta gratis'}
          </h3>
          <p className="text-slate-400 mb-8">
            {mode === 'login' ? 'Bem-vindo de volta!' : 'Ganhe 5 créditos gratis ao se cadastrar.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-slate-400 text-sm block mb-1.5">Nome</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-slate-400 text-sm block mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-sm block mb-1.5">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/50 border border-red-800/50 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                mode === 'login' ? 'Entrar' : 'Criar conta'
              )}
            </button>
          </form>

          <p className="text-slate-500 text-sm text-center mt-6">
            {mode === 'login' ? (
              <>Não tem conta?{' '}
                <button onClick={() => { setMode('signup'); setError(''); }} className="text-cyan-400 hover:text-cyan-300 font-medium">
                  Criar gratis
                </button>
              </>
            ) : (
              <>Já tem conta?{' '}
                <button onClick={() => { setMode('login'); setError(''); }} className="text-cyan-400 hover:text-cyan-300 font-medium">
                  Entrar
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
