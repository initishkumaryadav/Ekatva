import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useSound } from '../contexts/SoundContext';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Lock, Mail, ArrowLeft, Loader2, Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { playClick, playSuccess, playError, screenShake } = useSound();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      playSuccess();
      if (user.role === 'admin') navigate('/admin');
      else navigate('/dashboard');
    } catch (err) {
      playError();
      screenShake();
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4" data-testid="login-page">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,240,255,0.03)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(189,0,255,0.03)_0%,transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <button
          onClick={() => navigate('/')}
          data-testid="login-back-btn"
          className="flex items-center gap-2 text-white/40 hover:text-white/70 font-body text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to site
        </button>

        <div className="p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/20 flex items-center justify-center">
              <Shield size={22} className="text-cyan-400" />
            </div>
            <div>
              <h1 className="font-heading text-xl text-white tracking-wide">Command Center</h1>
              <p className="font-mono text-[10px] text-white/30 tracking-wider">COORDINATOR ACCESS</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label className="font-body text-sm text-white/50 mb-2 block">Email</Label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <Input
                  data-testid="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ekatva.in"
                  className="pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/20 focus:border-cyan-400/40 h-12"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="font-body text-sm text-white/50 mb-2 block">Password</Label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <Input
                  data-testid="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/20 focus:border-cyan-400/40 h-12"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm font-body"
                data-testid="login-error"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              data-testid="login-submit-btn"
              className="w-full py-3 rounded-xl font-body text-sm text-white bg-gradient-to-r from-cyan-500/80 to-purple-600/80 hover:from-cyan-500 hover:to-purple-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? 'Authenticating...' : 'Enter Command Center'}
            </button>
          </form>

          <p className="font-mono text-[10px] text-white/15 text-center mt-6 tracking-wider">
            ADMIN: admin@ekatva.in / admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
