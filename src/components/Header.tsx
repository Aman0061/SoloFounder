import React, { useState, useEffect } from 'react';
import { Users, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onOpenModal?: (plan: string) => void;
}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Массив ссылок для навигации: label - что видит юзер, id - куда скроллим
  const navLinks = [
    { label: 'О курсе', id: 'about' },
    { label: 'Программа', id: 'program' },
    { label: 'Тарифы', id: 'rates' },
    { label: 'Контакты', id: 'contacts' }, // Убедись, что у футера или формы есть id="contacts"
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

          {/* Desktop Navigation (Русский) */}
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm font-medium hover:text-white text-gray-400 transition-colors">
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
          </div>

          {/* Кнопка бургера */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Анимированное мобильное меню (Русский) */}
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
                <button className="text-left text-gray-300 hover:text-white">Войти</button>
                <button
                  onClick={handleRegisterClick}
                  className="bg-purple-600 text-white py-3 rounded-lg font-bold"
                >
                  Регистрация
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;