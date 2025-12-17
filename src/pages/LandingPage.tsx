import React, { useState, Suspense, lazy } from 'react';
import {
  CheckCircle,
  Play,
  TrendingUp,
  ArrowRight,
  Linkedin,
  Twitter,
  Instagram,
} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

// --- КРИТИЧЕСКИЕ КОМПОНЕНТЫ (Грузим сразу) ---
import LeadModal from '../components/LeadModal';
import Header from '../components/Header';

// --- ЛЕНИВЫЕ КОМПОНЕНТЫ (Грузим только когда нужны) ---
// Это ускоряет первую загрузку страницы на мобильных
const CurriculumAccordion = lazy(() => import('../components/CurriculumAccordion'));
const MentorSection = lazy(() => import('../components/MentorSection'));
const FAQ = lazy(() => import('../components/FAQ'));
const Comparison = lazy(() => import('../components/Comparison'));
const ContactForm = lazy(() => import('../components/ContactForm'));

// --- 1. Минималистичные иконки брендов (SVG) ---
const MinimalTechIcons = {
  Cursor: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  ),
  SQL: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Gemini: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3L14.5 8.5L20 11L14.5 13.5L12 19L9.5 13.5L4 11L9.5 8.5L12 3Z" />
    </svg>
  ),
  Vercel: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3L22 21H2L12 3Z" />
    </svg>
  ),
  Telegram: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Figma: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M12 5a3 3 0 1 0-3 3h3V5z"></path>
      <path d="M12 5a3 3 0 1 1 3 3h-3V5z"></path>
      <path d="M9 12a3 3 0 1 0 3 3V12H9z"></path>
    </svg>
  )
};

// --- 2. Варианты анимации ---
const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Course Registration');

  const openModal = (planName: string) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-lime-400 selection:text-black overflow-x-hidden">
      
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlan={selectedPlan} 
      />
      
      <Header onOpenModal={openModal} />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* OPTIMIZATION: hidden md:block - скрываем тяжелый блюр на мобилках */}
        <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-1/3 h-1/2 bg-lime-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="space-y-8"
          >
            <motion.div variants={fadeInVariant} className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Предзапись на первый поток
              </span>
            </motion.div>

            <motion.h1 variants={fadeInVariant} className="text-5xl md:text-7xl font-extrabold leading-[1.1]">
              Запусти свой IT<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Продукт с нуля
              </span>
            </motion.h1>

            <motion.p variants={fadeInVariant} className="text-xl text-gray-400 max-w-lg leading-relaxed">
              Освой навык запуска IT продукта с нуля без команды.{' '}
              <span className="text-white font-medium"> 90% обучения - практика</span> на
              реальных примерах и проектах.
            </motion.p>

            <motion.div variants={fadeInVariant} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button
                onClick={() => openModal('Free Trial')}
                className="group relative bg-lime-400 hover:bg-lime-300 text-neutral-950 px-8 py-4 rounded-xl font-extrabold text-lg transition-all hover:shadow-[0_0_20px_rgba(163,230,53,0.6)]"
              >
                Предзапись со скидкой
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute -top-3 -right-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-neutral-950 transform rotate-12">
                  -90% OFF
                </div>
              </button>
              <button className="flex items-center gap-3 px-6 py-4 rounded-xl border border-neutral-800 hover:border-purple-500 hover:bg-purple-500/10 transition-all font-medium">
                <Play className="fill-current text-purple-400" size={16} />
                Презентация
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -5 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center"
          >
            <div className="absolute inset-0 border border-neutral-800 rounded-full scale-75 opacity-20 animate-[spin_10s_linear_infinite]"></div>
            <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm bg-opacity-80 transition-transform duration-500 hover:rotate-0">
              <div className="absolute -right-6 -top-6 bg-lime-400 text-black p-4 rounded-xl shadow-lg transform rotate-12 z-20">
                <div className="font-extrabold text-2xl">4.9/5</div>
                <div className="text-xs font-bold uppercase">Course Rating</div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                      <TrendingUp size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Current Module</div>
                      <div className="font-bold">Data Visualization</div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg p-4 space-y-3">
                  <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    ></motion.div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- COMPARISON (OLD vs NEW) --- */}
      {/* LAZY LOAD: Оборачиваем в Suspense */}
      <Suspense fallback={<div className="h-96 w-full bg-neutral-900/50 animate-pulse rounded-3xl my-20"></div>}>
        <Comparison />
      </Suspense>

      {/* --- SKILLS SECTION --- */}
      <section id="about" className="py-20 bg-neutral-900 border-y border-neutral-800">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            // OPTIMIZATION: amount вместо margin для Safari
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInVariant}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Навыки, которые ты освоишь</h2>
            <p className="text-gray-400">Никакой сухой теории. Только боевой AI-стек.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Cursor AI', Icon: MinimalTechIcons.Cursor, hoverColor: 'group-hover:text-white' },
              { name: 'SQL', Icon: MinimalTechIcons.SQL, hoverColor: 'group-hover:text-blue-400' },
              { name: 'Gemini 3 Pro', Icon: MinimalTechIcons.Gemini, hoverColor: 'group-hover:text-indigo-400' },
              { name: 'Vercel', Icon: MinimalTechIcons.Vercel, hoverColor: 'group-hover:text-white' },
              { name: 'Telegram API', Icon: MinimalTechIcons.Telegram, hoverColor: 'group-hover:text-sky-400' },
              { name: 'Figma', Icon: MinimalTechIcons.Figma, hoverColor: 'group-hover:text-pink-400' },
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-neutral-950 border border-neutral-800/50 p-6 rounded-2xl flex flex-col items-center justify-center hover:border-neutral-700 hover:bg-neutral-900/50 transition-all group text-neutral-500 cursor-default"
              >
                <div className={`mb-4 transform group-hover:scale-110 transition-transform duration-300 ${skill.hoverColor}`}>
                  <skill.Icon className="w-8 h-8 md:w-9 md:h-9" strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-neutral-400 group-hover:text-white text-sm md:text-base text-center transition-colors">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROGRAM SECTION --- */}
      <section id="program" className="py-20 bg-neutral-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInVariant}
              className="lg:col-span-4 space-y-8"
            >
              <h2 className="text-4xl font-bold">Course <br /><span className="text-purple-400">Program</span></h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '8', label: 'Months' },
                  { val: '4', label: 'Projects', color: 'text-lime-400' },
                  { val: '105h', label: 'Theory' },
                  { val: '350h', label: 'Practice' },
                ].map((stat, i) => (
                  <div key={i} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    <div className={`text-3xl font-bold ${stat.color || 'text-white'} mb-1`}>{stat.val}</div>
                    <div className="text-xs text-gray-500 uppercase font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="lg:col-span-8">
              {/* LAZY LOAD: Аккордеон грузится только при скролле */}
              <Suspense fallback={<div className="h-64 bg-neutral-900 animate-pulse rounded-xl border border-neutral-800"></div>}>
                <CurriculumAccordion />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* --- MENTOR SECTION --- */}
      <Suspense fallback={<div className="py-20"></div>}>
        <MentorSection />
      </Suspense>

      {/* --- RATES SECTION --- */}
      <section id="rates" className="py-20 bg-neutral-900 border-t border-neutral-800">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInVariant}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Invest in Your Future</h2>
            <p className="text-gray-400">Choose the plan that suits your learning pace.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-neutral-950 p-8 rounded-3xl border border-neutral-800 flex flex-col hover:border-gray-600 transition-colors"
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-400 mb-2">Self-Paced</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">$49</span>
                  <span className="text-gray-600">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Access to all video lectures', '4 Portfolio Projects', 'Community Access'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                    <CheckCircle size={16} className="text-gray-600 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => openModal('Basic Plan')} className="w-full py-4 rounded-xl border border-gray-700 font-bold hover:bg-white hover:text-black transition-all">
                Choose Basic
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2 }}
              className="bg-neutral-950 p-8 rounded-3xl border-2 border-purple-600 relative flex flex-col transform md:-translate-y-4 shadow-[0_0_30px_rgba(147,51,234,0.15)]"
            >
              <div className="absolute top-0 right-0 bg-lime-400 text-black text-xs font-extrabold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase">
                Best Value
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-2">Mentorship + Career</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$89</span>
                  <span className="text-gray-600 line-through text-xl">$240</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Everything in Basic', 'Personal Mentor (Senior BA)', 'Job Guarantee'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white text-sm font-medium">
                    <CheckCircle size={16} className="text-lime-400 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => openModal('Mentorship Plan')} className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all">
                Start Pro Journey
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FAQ & CONTACT --- */}
      <Suspense fallback={null}>
        <FAQ />
        <ContactForm />
      </Suspense>

      {/* --- FOOTER --- */}
      <footer id="contacts" className="bg-black py-12 border-t border-neutral-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-xs">SF</span>
              </div>
              <span className="text-xl font-bold">Solo <span className="text-purple-400">Founder</span></span>
            </div>
            <div className="flex gap-6">
              <Linkedin className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          <div className="border-t border-neutral-900 pt-8 text-center text-xs text-gray-600 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 Solo Founder Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;