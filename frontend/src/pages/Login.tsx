import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export default function Login() {
  const [mode, setMode] = useState<'girlfriend' | 'admin'>('girlfriend');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('username', data.username);
        navigate(data.role === 'admin' ? '/admin' : '/');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch { setError('Connection failed'); }
    finally { setIsLoading(false); }
  };

  const switchTo = (m: 'girlfriend' | 'admin') => {
    setMode(m);
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <AnimatePresence mode="wait">
      {mode === 'girlfriend' ? (
        <motion.main
          key="girlfriend"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="bg-[#16130d] min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
        >
          {/* Grain overlay */}
          <div
            className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Light leaks */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D6B8A8]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D6B8A8]/3 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-center mb-12 relative"
          >
            <h1
              className="font-display-editorial text-[#eae1d6] tracking-tighter"
              style={{ fontSize: 'clamp(60px,12vw,140px)', lineHeight: 0.85 }}
            >
              Open When...
            </h1>
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-accent-script text-[#C5A059]/60 whitespace-nowrap -rotate-3 pointer-events-none"
              style={{ fontSize: 'clamp(20px,4vw,40px)' }}
            >
              for you, my love
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-body-lg text-[#eae1d6] text-center mb-12 max-w-sm"
          >
            A place built just for you.
          </motion.p>

          {/* Form — underline inputs */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            onSubmit={handleLogin}
            className="w-full max-w-sm space-y-8"
          >
            {error && (
              <p className="font-label-caps text-xs tracking-widest text-red-500/70 text-center">{error}</p>
            )}

            <div className="border-b border-[#C5A059]/30 pb-2">
              <label className="block font-label-caps text-[10px] tracking-[0.25em] text-[#eae1d6]/40 mb-2">YOUR NAME</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-transparent text-[#eae1d6] font-body-sm focus:outline-none placeholder-[#eae1d6]/20"
                placeholder="Enter your name..."
                required
              />
            </div>

            <div className="border-b border-[#C5A059]/30 pb-2">
              <label className="block font-label-caps text-[10px] tracking-[0.25em] text-[#eae1d6]/40 mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent text-[#eae1d6] font-body-sm focus:outline-none placeholder-[#eae1d6]/20"
                placeholder="Enter password..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 border border-[#C5A059] text-[#C5A059] font-label-caps text-xs tracking-[0.25em] hover:bg-[#C5A059]/10 transition-colors duration-500 disabled:opacity-40"
            >
              {isLoading ? 'OPENING...' : 'ENTER'}
            </button>
          </motion.form>

          {/* Hidden admin link */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            onClick={() => switchTo('admin')}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-label-caps text-[9px] tracking-[0.3em] text-[#eae1d6]/15 hover:text-[#C5A059]/50 transition-colors duration-700"
          >
            — ✦ ADMIN ACCESS ✦ —
          </motion.button>
        </motion.main>
      ) : (
        <motion.main
          key="admin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="bg-[#110e08] min-h-screen flex flex-col items-center justify-center px-6"
        >
          <div className="w-full max-w-sm">
            <h1 className="font-display-editorial text-[#C5A059] text-4xl tracking-tighter text-center mb-2">
              The Vault
            </h1>
            <p className="font-label-caps text-[10px] tracking-[0.3em] text-[#eae1d6]/30 text-center mb-10">
              ADMIN ACCESS ONLY
            </p>

            <form onSubmit={handleLogin} className="space-y-8 bg-[#16130d] border border-[#C5A059]/10 p-8">
              {error && (
                <p className="font-label-caps text-xs tracking-widest text-red-500/70 text-center">{error}</p>
              )}

              <div className="border-b border-[#C5A059]/20 pb-2">
                <label className="block font-label-caps text-[10px] tracking-[0.25em] text-[#eae1d6]/40 mb-2">ADMIN ID</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-transparent text-[#eae1d6] font-body-sm focus:outline-none"
                  required
                />
              </div>

              <div className="border-b border-[#C5A059]/20 pb-2">
                <label className="block font-label-caps text-[10px] tracking-[0.25em] text-[#eae1d6]/40 mb-2">PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-transparent text-[#eae1d6] font-body-sm focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#C5A059] text-[#110e08] font-label-caps text-xs tracking-[0.2em] hover:bg-[#eae1d6] transition-colors duration-500 disabled:opacity-40"
              >
                {isLoading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
              </button>
            </form>

            <button
              onClick={() => switchTo('girlfriend')}
              className="mt-6 font-label-caps text-[10px] tracking-[0.2em] text-[#eae1d6]/30 hover:text-[#eae1d6]/60 transition-colors w-full text-center"
            >
              ← BACK
            </button>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
