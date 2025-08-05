import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function DashboardResumo() {
  const [pacientes, setPacientes] = useState([]); // Estado para armazenar a lista de pacientes do localStorage
  const [medicos, setMedicos] = useState([]); // Estado para armazenar a lista de médicos do localStorage
  const [consultas, setConsultas] = useState([]); // Estado para armazenar a lista de consultas do localStorage

  useEffect(() => {
    // Carrega os dados de pacientes, médicos e consultas do localStorage e atualiza os estados
    const pacientesLS = JSON.parse(localStorage.getItem("pacientes")) || [];
    const medicosLS = JSON.parse(localStorage.getItem("medicos")) || [];
    const consultasLS = JSON.parse(localStorage.getItem("consultas")) || [];

    setPacientes(pacientesLS); // Atualiza estado pacientes
    setMedicos(medicosLS); // Atualiza estado médicos
    setConsultas(consultasLS); // Atualiza estado consultas
  }, []); // Executa apenas uma vez após o componente montar

  return (
    <div className="justify-center px-4 min-h-screen bg-gradient-to-r from-blue-50 to-red-100 py-10">
      <div className="w-[1000px] mx-auto p-6 bg-white rounded shadow mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">📊 Resumo Geral</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-blue-100 rounded">
            <h2 className="text-xl font-semibold">Pacientes</h2>
            <p className="text-3xl">{pacientes.length}</p> {/* Exibe o total de pacientes cadastrados */}
          </div>
          <div className="p-4 bg-green-100 rounded">
            <h2 className="text-xl font-semibold">Médicos</h2>
            <p className="text-3xl">{medicos.length}</p> {/* Exibe o total de médicos cadastrados */}
          </div>
          <div className="p-4 bg-purple-100 rounded">
            <h2 className="text-xl font-semibold">Consultas</h2>
            <p className="text-3xl">{consultas.length}</p> {/* Exibe o total de consultas cadastradas */}
          </div>
        </div>

        <h2 className="text-xl font-bold mt-10 mb-4 text-center">📈 Gráfico de Cadastros</h2>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { categoria: "Pacientes", total: pacientes.length }, // Dados do gráfico para pacientes
              { categoria: "Médicos", total: medicos.length }, // Dados do gráfico para médicos
              { categoria: "Consultas", total: consultas.length }, // Dados do gráfico para consultas
            ]}>
              <CartesianGrid strokeDasharray="3 3" /> {/* Grade do gráfico */}
              <XAxis dataKey="categoria" /> {/* Eixo X com as categorias */}
              <YAxis allowDecimals={false} /> {/* Eixo Y sem números decimais */}
              <Tooltip /> {/* Tooltip ao passar o mouse */}
              <Bar dataKey="total" fill="#4F46E5" /> {/* Barras do gráfico */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DashboardResumo;
