import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      {/* Главная страница (Лендинг) */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Страница регистрации */}
      <Route path="/register" element={<RegisterPage />} />

      {/* Страница регистрации */}
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
};

export default App;