import React, { useState, useEffect } from 'react';
import { Users, Menu, X, LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Импортируем supabase для проверки сессии
import { supabase } from '../lib/supabaseClient';
// Импортируем тип пользователя для TypeScript
import type { User } from '@supabase/supabase-js';

interface HeaderProps {
  onOpenModal?: (plan: string) => void;
}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Состояние пользователя
  const [user, setUser] = useState<User | null>(null);
  // Состояние для выпадающего меню профиля
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Проверяем авторизацию при загрузке
  useEffect(() => {
    // Получаем текущую сессию сразу
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Подписываемся на изменения (вход/выход) в реальном времени
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Логика скролла
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'О курсе', id: 'about' },
    { label: 'Программа', id: 'program' },
    { label: 'Тарифы', id: 'rates' },
    { label: 'Контакты', id: 'contacts' },
  ];

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleRegisterClick = () => {
    navigate('/register');
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  // Функция выхода
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/'); // Редирект на главную после выхода
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed w-full z-40"
    >
      <nav
        className={`w-full transition-all duration-500 ${
          scrolled
            ? 'bg-neutral-950/80 backdrop-blur-xl border-b border-white/10 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="font-bold text-white">SF</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Solo <span className="text-purple-400">Founder</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-400 hover:text-lime-400 text-sm font-medium transition-colors uppercase tracking-wider relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 transition-all group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>

          {/* Desktop Actions (AUTH LOGIC) */}
          <div className="hidden md:flex items-center gap-6 relative">
            {user ? (
              // --- ЕСЛИ ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН ---
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-full pl-2 pr-4 py-1.5 hover:border-purple-500/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                    {/* Первая буква почты или иконка */}
                    {user.email ? user.email[0].toUpperCase() : <UserIcon size={14}/>}
                  </div>
                  <span className="text-sm text-gray-300 max-w-[150px] truncate">
                    {user.email}
                  </span>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Выпадающее меню */}
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl overflow-hidden py-1 z-50"
                    >
                      <div className="px-4 py-3 border-b border-neutral-800">
                        <p className="text-xs text-gray-500">Вы вошли как</p>
                        <p className="text-sm text-white font-medium truncate">{user.email}</p>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors"
                      >
                        <LogOut size={16} />
                        Выйти из аккаунта
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // --- ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕ АВТОРИЗОВАН (СТАРЫЙ КОД) ---
              <>
                <button 
                  onClick={handleLoginClick}
                  className="flex items-center gap-2 text-sm font-medium hover:text-white text-gray-400 transition-colors"
                >
                  <Users size={16} />
                  Войти
                </button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(147, 51, 234, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRegisterClick}
                  className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-bold text-sm"
                >
                  Регистрация
                </motion.button>
              </>
            )}
          </div>

          {/* Кнопка бургера (Мобильная) */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Мобильное меню */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-neutral-900 border-b border-gray-800"
            >
              <div className="p-6 flex flex-col gap-4">
                {navLinks.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-lg font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="h-px bg-gray-800 my-2" />

                {user ? (
                   // Мобильная версия для авторизованного юзера
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                           {user.email ? user.email[0].toUpperCase() : <UserIcon size={18}/>}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-sm text-gray-500">Аккаунт</span>
                           <span className="text-white font-medium truncate max-w-[200px]">{user.email}</span>
                        </div>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="w-full bg-neutral-800 text-red-400 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                      >
                        <LogOut size={18} /> Выйти
                      </button>
                   </div>
                ) : (
                   // Мобильная версия для гостя
                   <div className="flex flex-col gap-3">
                      <button onClick={handleLoginClick} className="text-left text-gray-300 hover:text-white py-2">Войти</button>
                      <button
                        onClick={handleRegisterClick}
                        className="bg-purple-600 text-white py-3 rounded-lg font-bold"
                      >
                        Регистрация
                      </button>
                   </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;