import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  CheckCircle
} from 'lucide-react';
// 1. Импортируем Framer Motion
import { motion, type Variants } from 'framer-motion';

// 2. Определяем варианты анимации (как на лендинге)
const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
    }

    console.log("Form Submitted Successfully:", formData);
    alert("Registration Successful!");
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-white font-sans selection:bg-lime-400 selection:text-black">
      
      {/* Left Column - Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center p-12 overflow-hidden bg-neutral-900 border-r border-white/5">
        
        {/* Background Elements (Static or subtle CSS animation) */}
        <div className="absolute inset-0 z-0">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/40 via-neutral-950 to-neutral-950"></div>
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        {/* Content with Animation */}
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="relative z-10 max-w-lg text-center"
        >
            <motion.div variants={fadeInVariant} className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
                <span className="font-bold text-2xl text-white">SF</span>
            </motion.div>
            
            <motion.h1 variants={fadeInVariant} className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
                Start your journey in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-lime-400">
                    Solo Founding
                </span>
            </motion.h1>
            
            <motion.p variants={fadeInVariant} className="text-lg text-gray-400 mb-8 leading-relaxed">
                Build your own MVP without a team using AI tools. Join a community of builders reshaping the future.
            </motion.p>

            {/* Feature List Animated */}
            <div className="grid grid-cols-2 gap-4 text-left">
                {['No Code Required', 'AI-Powered Tools', 'Community Support', 'Lifetime Access'].map((item, i) => (
                    <motion.div 
                        key={i}
                        variants={fadeInVariant}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                        className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5 backdrop-blur-sm transition-colors cursor-default"
                    >
                        <CheckCircle size={18} className="text-lime-400" />
                        <span className="text-sm font-medium text-gray-300">{item}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
      </div>

      {/* Right Column - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md space-y-8"
        >
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                <p className="text-gray-400 text-sm">
                    Already have an account? <a href="#" className="text-purple-400 hover:text-purple-300 font-bold hover:underline transition-colors">Log in</a>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-1.5"
                >
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                        <input 
                            type="text" 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Ivan Ivanov"
                            required
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-600 text-white"
                        />
                    </div>
                </motion.div>

                {/* Email */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-1.5"
                >
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-600 text-white"
                        />
                    </div>
                </motion.div>

                {/* Password */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-1.5"
                >
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pl-12 pr-12 py-3.5 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-600 text-white"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </motion.div>

                {/* Confirm Password */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-1.5"
                >
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Confirm Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className={`w-full bg-neutral-800 border rounded-xl pl-12 pr-12 py-3.5 outline-none focus:ring-1 transition-all placeholder:text-gray-600 text-white ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-neutral-700 focus:border-purple-500 focus:ring-purple-500/50'}`}
                        />
                    </div>
                </motion.div>

                {/* Error Message */}
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                    >
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </motion.div>
                )}

                {/* Submit Button */}
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all flex items-center justify-center gap-2 group mt-6"
                >
                    Register
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </form>

            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.9 }}
                className="text-center text-xs text-gray-600 mt-6"
            >
                By registering, you agree to our <a href="#" className="underline hover:text-gray-400">Terms</a> and <a href="#" className="underline hover:text-gray-400">Privacy Policy</a>.
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;