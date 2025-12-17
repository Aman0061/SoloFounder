import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <Routes>
      {/* Главная страница (Лендинг) */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Страница регистрации */}
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default App;