import React, { useEffect, useState } from 'react';
import { X, User, Phone, Send, ArrowRight, ShieldCheck } from 'lucide-react';

type LeadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
};

type FormData = {
  name: string;
  phone: string;
  contact: string;
};

const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  selectedPlan = 'Mentorship Plan',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    contact: '',
  });

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-0 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div
        className={`relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-[0_0_50px_rgba(147,51,234,0.15)] transform transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 blur-sm"></div>

        <div className="flex justify-between items-start p-6 pb-2">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Secure Your Spot</h2>
            <p className="text-sm text-gray-400">
              You selected: <span className="text-purple-400 font-bold">{selectedPlan}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent my-2"></div>

        <div className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wider">
              Phone Number
            </label>
            <div className="relative group">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors"
                size={18}
              />
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wider">
              Telegram or Email
            </label>
            <div className="relative group">
              <Send
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="@username or email@domain.com"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="p-6 pt-2">
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/30 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
            Confirm & Join
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
            <ShieldCheck size={14} className="text-lime-400" />
            <span>We will contact you within 15 minutes.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadModal;