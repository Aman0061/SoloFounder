import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { courseModules } from '../data/courseData';

const CurriculumAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-4">
      {courseModules.map((mod, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-purple-500 bg-neutral-950'
                : 'border-neutral-800 bg-neutral-900 hover:bg-neutral-800'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    isOpen ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                <div>
                  <h3
                    className={`font-bold text-lg ${
                      isOpen ? 'text-white' : 'text-gray-300'
                    }`}
                  >
                    {mod.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{mod.duration}</p>
                </div>
              </div>
              <ChevronDown
                className={`transform transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-purple-400' : 'text-gray-600'
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 pt-0 border-t border-gray-800/50 ml-14">
                <ul className="space-y-3">
                  {mod.content.map((lesson, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5"></div>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CurriculumAccordion;