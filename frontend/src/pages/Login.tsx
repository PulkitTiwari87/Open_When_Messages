import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export default function Login() {
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
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-surface z-0 opacity-80"></div>
      <div className="relative z-10 w-full max-w-md bg-[#16130d] border border-[#C5A059]/20 p-10 rounded-sm shadow-2xl">
        <h1 className="font-display-editorial text-4xl text-[#C5A059] mb-8 text-center tracking-tighter">Enter the Vault</h1>
        
        {error && (
          <div className="mb-6 p-3 border border-red-900/50 bg-red-900/10 text-red-500/80 text-xs font-label-caps tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-label-caps text-xs text-[#eae1d6]/60 mb-2 tracking-[0.2em]">User ID</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#231f18] border border-[#39342d] text-[#eae1d6] px-4 py-3 focus:outline-none focus:border-[#C5A059]/50 transition-colors font-body-sm" 
              placeholder="Enter ID..." 
              required
            />
          </div>
          <div>
            <label className="block font-label-caps text-xs text-[#eae1d6]/60 mb-2 tracking-[0.2em]">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#231f18] border border-[#39342d] text-[#eae1d6] px-4 py-3 focus:outline-none focus:border-[#C5A059]/50 transition-colors font-body-sm" 
              placeholder="Enter password..." 
              required
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#C5A059] text-[#110e08] font-label-caps text-xs tracking-[0.2em] mt-4 hover:bg-[#eae1d6] transition-colors duration-500 disabled:opacity-50"
          >
            {isLoading ? 'AUTHENTICATING...' : 'UNLOCK'}
          </button>
        </form>
      </div>
    </motion.main>
  );
}
