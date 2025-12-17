import React, { useState } from 'react';
// Импортируем Variants для типизации
import { motion, type Variants } from 'framer-motion';
import { Send, MessageSquare, User, Mail, ArrowUpRight } from 'lucide-react';

// Явно указываем тип : Variants
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 2000);
  };

  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-lime-400/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* ЛЕВАЯ КОЛОНКА */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants} // Применяем варианты контейнера здесь
            className="space-y-6"
          >
            <motion.div variants={textVariants} className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-purple-300 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              Поддержка 24/7
            </motion.div>
            
            <motion.h2 variants={textVariants} className="text-4xl md:text-5xl font-extrabold leading-tight">
              Остались вопросы?<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-lime-400">
                Давайте обсудим.
              </span>
            </motion.h2>
            
            <motion.p variants={textVariants} className="text-xl text-gray-400 max-w-md leading-relaxed">
              Заполните форму, и ментор или карьерный консультант свяжется с вами в течение часа, чтобы помочь с выбором.
            </motion.p>

            <motion.div variants={textVariants} className="pt-4">
               <a href="#" className="inline-flex items-center gap-2 text-lime-400 font-bold hover:underline decoration-2 underline-offset-4 transition-all group">
                  Написать сразу в Telegram 
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </a>
            </motion.div>
          </motion.div>

          {/* ПРАВАЯ КОЛОНКА (ФОРМА) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_0_40px_rgba(147,51,234,0.1)] relative"
          >
            <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Имя</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-black/40 border border-neutral-800 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder:text-gray-600"
                      placeholder="Ваше имя"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email / TG</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-black/40 border border-neutral-700 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder:text-gray-600"
                      placeholder="@контакт"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Ваш вопрос</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                  <textarea 
                    rows={4}
                    required
                    className="w-full bg-black/40 border border-neutral-800 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white resize-none placeholder:text-gray-600"
                    placeholder="Опишите свой вопрос..."
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg group ${
                  status === 'success' 
                  ? 'bg-lime-400 text-black' 
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30'
                }`}
              >
                {status === 'idle' && (
                  <>
                    Отправить <Send size={20} className="-rotate-12 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                  </>
                )}
                {status === 'sending' && (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                {status === 'success' && <>Отправлено!</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;