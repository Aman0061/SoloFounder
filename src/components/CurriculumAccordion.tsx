import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, Target, Cpu, Rocket, DollarSign, BarChart } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: "Модуль 1: Идея и Валидация с AI",
    icon: <Target className="w-5 h-5" />,
    duration: "1-2 урока + самостоятельный анализ",
    description: "Находим «Голубой океан» и тестируем спрос без вложений.",
    topics: [
      "Генерация идей: как найти проблему, за которую платят",
      "AI-Crash Test: создаем виртуального критика для твоей идеи",
      "Формирование УТП (Уникального Торгового Предложения)",
      "Анализ конкурентов за 10 минут с помощью нейросетей"
    ]
  },
  {
    id: 2,
    title: "Модуль 2: ЦА и Юнит-экономика",
    icon: <DollarSign className="w-5 h-5" />,
    duration: "1 урок",
    description: "Считаем деньги и понимаем, кто наш клиент.",
    topics: [
      "Синтетические пользователи: интервью с AI-персонами",
      "Unit-экономика: сколько нужно продаж, чтобы уволиться из найма",
      "Модель монетизации: подписка, разовая покупка или freemium?",
      "Расчет стоимости MVP и точки безубыточности"
    ]
  },
  {
    id: 3,
    title: "Модуль 3: Разработка MVP (Cursor + React)",
    icon: <Code className="w-5 h-5" />,
    duration: "3-4 урока",
    description: "Самый «мясной» модуль. Пишем код руками AI.",
    topics: [
      "Настройка среды: VS Code, Cursor AI, Node.js",
      "Промпт-инжиниринг: как заставить AI писать чистый код",
      "Верстка интерфейса (UI) без дизайнера: v0.dev + Tailwind",
      "База данных и бэкенд: Supabase и интеграция API"
    ]
  },
  {
    id: 4,
    title: "Модуль 4: Деплой и Автоматизация",
    icon: <Cpu className="w-5 h-5" />,
    duration: "2 урока",
    description: "Выпускаем продукт в интернет и настраиваем процессы.",
    topics: [
      "Публикация на Vercel: от локального сервера до HTTPS ссылки",
      "Подключение домена и настройка DNS",
      "Интеграция платежей (Stripe/Crypto/Prodamus)",
      "Автоматизация уведомлений в Telegram (Telegram Bot API)"
    ]
  },
  {
    id: 5,
    title: "Модуль 5: Маркетинг и Трафик",
    icon: <Rocket className="w-5 h-5" />,
    duration: "2 урока",
    description: "Как привлечь клиентов бесплатно или дешево.",
    topics: [
      "AI Content Machine: 20 сценариев для Reels/Shorts за 5 минут",
      "SEO-статьи руками нейросетей, которые читают люди",
      "Запуск на Product Hunt: чек-лист для международного трафика",
      "Построение простой воронки продаж"
    ]
  },
  {
    id: 6,
    title: "Модуль 6: Запуск, Аналитика и Масштаб",
    icon: <BarChart className="w-5 h-5" />,
    duration: "Навсегда",
    description: "Первые деньги, работа над ошибками и рост.",
    topics: [
      "Метрики успеха: CAC, LTV, Churn rate",
      "Анализ первых продаж: что улучшить в продукте?",
      "Пивот или Масштаб: как принимать решения на основе данных",
      "План развития продукта на год вперед"
    ]
  }
];

const CurriculumAccordion: React.FC = () => {
  // Открываем первый модуль по умолчанию
  const [activeId, setActiveId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <motion.div
          key={module.id}
          initial={false}
          animate={{
            borderColor: activeId === module.id ? "rgba(168, 85, 247, 0.5)" : "rgba(38, 38, 38, 1)"
          }}
          className={`border bg-neutral-950 rounded-2xl overflow-hidden transition-colors duration-300 ${
            activeId === module.id ? "bg-neutral-900/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]" : "border-neutral-800"
          }`}
        >
          <button
            onClick={() => toggle(module.id)}
            className="w-full flex items-center justify-between p-6 text-left group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                activeId === module.id ? "bg-purple-600 text-white" : "bg-neutral-900 text-gray-400 group-hover:text-white"
              }`}>
                {module.icon}
              </div>
              <div>
                <h3 className={`font-bold text-lg ${activeId === module.id ? "text-white" : "text-gray-300"}`}>
                  {module.title}
                </h3>
                <p className="text-sm text-gray-500">{module.duration}</p>
              </div>
            </div>
            <ChevronDown 
              className={`text-gray-500 transition-transform duration-300 ${activeId === module.id ? "rotate-180 text-purple-400" : ""}`} 
            />
          </button>

          <AnimatePresence initial={false}>
            {activeId === module.id && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="pl-[56px]">
                    <p className="text-gray-400 mb-4 border-l-2 border-purple-500/30 pl-3 italic">
                      {module.description}
                    </p>
                    <ul className="space-y-3">
                      {module.topics.map((topic, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default CurriculumAccordion;