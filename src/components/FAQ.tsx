import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Нужен ли опыт в программировании?",
    answer: "Нет, курс рассчитан на новичков. Мы используем AI-инструменты (Cursor, Gemini), которые берут на себя написание кода. Вам нужно лишь понимать логику и архитектуру."
  },
  {
    question: "Сколько времени в день нужно уделять обучению?",
    answer: "Оптимально — 1.5–2 часа в день. Программа гибкая, все лекции доступны в записи, поэтому вы можете учиться в своем темпе."
  },
  {
    question: "Какие инструменты мне понадобятся?",
    answer: "Вам понадобится компьютер, доступ в интернет и подписки на AI-сервисы (мы расскажем, как их оформить и использовать эффективно)."
  },
  {
    question: "Будет ли сертификат после окончания?",
    answer: "Да, после защиты финального проекта вы получите цифровой сертификат, подтверждающий ваши навыки Solo Founder и владение AI-стеком."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: any) => {
  return (
    <div className="border-b border-neutral-800">
      <button
        onClick={onClick}
        className="w-full py-6 flex justify-between items-center text-left hover:text-purple-400 transition-colors"
      >
        <span className="text-lg font-medium pr-8">{question}</span>
        <div className="flex-shrink-0 bg-neutral-900 p-2 rounded-lg border border-neutral-800">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-neutral-950">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Остались вопросы?</h2>
          <p className="text-gray-400">Мы собрали ответы на самые популярные запросы наших студентов.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-4 md:p-8"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;