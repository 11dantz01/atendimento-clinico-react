import { Component, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormularioPaciente from './components/PacienteForm';
import FormularioMedico from './components/MedicoForm';
import ConsultasMarcadas from './components/ConsultaForm'
import DashboardResumo from './components/DashboardResumo'
import TelaInicial from "./components/TelaInicial";
import prancheta from './components/fotos/prancheta.jpg';
import './App.css';


function App() {
  const [menuAberto, setMenuAberto] = useState(true);

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Menu Lateral */}
         <aside
          className={`${
            menuAberto ? 'w-60 opacity-100' : 'w-0 opacity-0'
          } bg-blue-600 text-white flex flex-col p-4 space-y-4 overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">📋 Painel</h1>
          <Link className="hover:bg-blue-700 p-2 rounded" to="/">Início</Link>
          <Link className="hover:bg-blue-700 p-2 rounded" to="/pacientes">Pacientes</Link>
          <Link className="hover:bg-blue-700 p-2 rounded" to="/medicos">Médicos</Link>
          <Link className="hover:bg-blue-700 p-2 rounded" to="/consultas">Consultas</Link>
          <Link className="hover:bg-blue-700 p-2 rounded" to="/painel">Painel</Link>
        </aside>
        

        {/* Conteúdo principal */}
        <main className="flex-1 p-6 relative bg-gray-50 overflow-hidden">
        {/* Botão de toggle do menu */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="absolute top-4 left-4 text-2xl bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-600 z-50"
        >
          ☰
        </button>

        {/* Imagem central discreta */}
        <img
          src={prancheta}
          alt="Logo fundo"
          className="absolute opacity-10 w-800 h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        />

        {/* Conteúdo acima da imagem */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<TelaInicial />} />
            <Route path="/pacientes" element={<FormularioPaciente />} />
            <Route path="/medicos" element={<FormularioMedico />} />
            <Route path="/consultas" element={<ConsultasMarcadas />} />
            <Route path="/painel" element={<DashboardResumo />}  />
          </Routes>
        </div>
      </main>
            </div>
          </Router>
        );
      }

export default App;
