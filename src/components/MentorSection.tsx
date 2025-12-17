import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, ExternalLink } from 'lucide-react';


const MentorSection = () => {
  return (
    <section className="py-20 bg-neutral-900 relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(163,230,53,0.05)_0%,_transparent_50%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Фото ментора */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border border-neutral-800 relative group">
              {/* Замени src на реальное фото */}
              <img 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=75"
                alt="Mentor" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
              />
              
              {/* Плашка с опытом */}
              <div className="absolute bottom-6 left-6 bg-neutral-950/90 backdrop-blur border border-neutral-800 p-4 rounded-xl shadow-2xl">
                <div className="text-3xl font-bold text-white mb-1">10+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Years in Tech</div>
              </div>
            </div>
            
            {/* Декоративный элемент сзади */}
            <div className="absolute -z-10 top-12 -left-12 w-full h-full border-2 border-purple-500/20 rounded-3xl"></div>
          </motion.div>

          {/* Текстовый контент */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-full mb-4">
                MEET YOUR MENTOR
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Alex <span className="text-lime-400">Founder</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Ex-Senior Developer в Google. Запустил 5 AI-стартапов в одиночку за последний год.
                Два из них вышли на прибыль $10k/mo через 3 месяца.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Ex-Company', value: 'Google' },
                { label: 'Products Launched', value: '12+' },
                { label: 'Total Revenue', value: '$1.2M' },
                { label: 'Students', value: '5k+' },
              ].map((stat, i) => (
                <div key={i} className="border-l-2 border-neutral-800 pl-4">
                  <div className="font-bold text-white text-xl">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
               <button className="p-3 bg-neutral-800 rounded-full hover:bg-white hover:text-black transition-colors">
                  <Twitter size={20} />
               </button>
               <button className="p-3 bg-neutral-800 rounded-full hover:bg-[#0077b5] hover:text-white transition-colors">
                  <Linkedin size={20} />
               </button>
               <button className="p-3 bg-neutral-800 rounded-full hover:bg-white hover:text-black transition-colors">
                  <Github size={20} />
               </button>
               <button className="flex items-center gap-2 px-6 py-3 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-300 transition-all">
                  My Portfolio <ExternalLink size={16} />
               </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MentorSection;