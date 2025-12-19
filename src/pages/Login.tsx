import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
// 1. Импортируем useNavigate и Link
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; 
import toast, { Toaster } from 'react-hot-toast';

const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 2. Инициализируем хук
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      if (data.session) {
        toast.success('Успешный вход!', { 
            style: { background: '#333', color: '#fff', border: '1px solid #a3e635' } 
        });
        
        // 3. РЕДИРЕКТ НА ГЛАВНУЮ ЧЕРЕЗ 1 СЕКУНДУ
        setTimeout(() => {
            navigate('/');
        }, 1000);
      }
    } catch (err: any) {
      setError('Неверный логин или пароль');
      toast.error('Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-white font-sans selection:bg-lime-400 selection:text-black">
      <Toaster position="top-center" />

      {/* Кнопка НАЗАД (чтобы не застрять) */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-50 p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors text-gray-400 hover:text-white"
      >
        <X size={24} />
      </Link>
      
      {/* ... ЛЕВАЯ КОЛОНКА (Оставляем как было) ... */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center p-12 overflow-hidden bg-neutral-900 border-r border-white/5">
         <div className="absolute inset-0 z-0">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/40 via-neutral-950 to-neutral-950"></div>
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        </div>
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="relative z-10 max-w-lg text-center">
             <motion.div variants={fadeInVariant} className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
                <span className="font-bold text-2xl text-white">SF</span>
            </motion.div>
            <motion.h1 variants={fadeInVariant} className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                С возвращением, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-lime-400">Solo Founder</span>
            </motion.h1>
        </motion.div>
      </div>

      {/* ПРАВАЯ КОЛОНКА */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Вход в аккаунт</h2>
                <p className="text-gray-400 text-sm">Нет аккаунта? <a href="/register" className="text-purple-400 hover:text-purple-300 font-bold hover:underline">Регистрация</a></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-purple-500 text-white" />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Пароль</label>
                        <a href="#" className="text-xs text-purple-400 hover:text-purple-300">Забыли пароль?</a>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pl-12 pr-12 py-3.5 outline-none focus:border-purple-500 text-white" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    </div>
                </div>

                {error && <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</div>}

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold py-4 rounded-xl shadow-lg mt-6">
                    {loading ? 'Входим...' : 'Войти'}
                </motion.button>
            </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;