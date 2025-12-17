import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, Clock, DollarSign, Users, Zap } from 'lucide-react';

const Comparison = () => {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Фоновое свечение для акцента на правой части */}
      <div className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Меняем правила игры</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Раньше для запуска IT-продукта нужны были миллионы. Сегодня — только идея и правильный AI-стек.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* OLD WAY */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-3xl relative opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-full mb-6">
              <XCircle size={14} /> КЛАССИЧЕСКИЙ ПУТЬ
            </div>
            
            <ul className="space-y-6">
              {[
                { icon: <Users />, text: "Команда из 3-5 человек (Frontend, Backend, Design, PM)", sub: "Зависимость от чужих сроков" },
                { icon: <Clock />, text: "6–12 месяцев до запуска MVP", sub: "Рынок может измениться" },
                { icon: <DollarSign />, text: "Бюджет от $15,000 до $50,000", sub: "Огромные риски потерять деньги" },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="text-gray-500 mt-1">{item.icon}</div>
                  <div>
                    <p className="text-gray-300 font-medium">{item.text}</p>
                    <p className="text-sm text-gray-600">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* NEW WAY (SOLO FOUNDER) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/20 to-neutral-900 border-2 border-purple-500/30 p-8 rounded-3xl relative shadow-[0_0_40px_rgba(147,51,234,0.1)]"
          >
            {/* Плашка "Рекомендуем" */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
              Эра Solo Founder
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-bold rounded-full mb-6">
              <CheckCircle2 size={14} /> ПУТЬ С КУРСОМ
            </div>
            
            <ul className="space-y-6">
              {[
                { icon: <Zap />, text: "Вы — единственный владелец и разработчик", sub: "Полный контроль через Cursor AI и Gemini" },
                { icon: <Clock />, text: "2–4 недели до первой версии продукта", sub: "Скорость — ваше главное преимущество" },
                { icon: <DollarSign />, text: "Расходы до $100 (подписки на AI)", sub: "Минимальный риск, максимальный профит" },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="text-purple-400 mt-1">{item.icon}</div>
                  <div>
                    <p className="text-white font-bold">{item.text}</p>
                    <p className="text-sm text-gray-400">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
               <p className="text-sm text-purple-200 text-center italic">
                "AI не заменит основателя, но один основатель с AI заменит целую IT-студию."
               </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Comparison;