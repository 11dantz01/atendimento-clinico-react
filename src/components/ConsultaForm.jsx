import { useEffect, useState } from "react";

function ConsultasMarcadas() {
  const [pacientes, setPacientes] = useState([]); // Armazena a lista de pacientes carregada do localStorage
  const [medicos, setMedicos] = useState([]); // Armazena a lista de médicos carregada do localStorage
  const [consultas, setConsultas] = useState([]); // Armazena a lista de consultas agendadas carregada do localStorage

  useEffect(() => {
    const lerPacientes = localStorage.getItem('pacientes') // Lê pacientes do localStorage
    const lerMedicos = localStorage.getItem('medicos') // Lê médicos do localStorage
    const lerConsultas = localStorage.getItem('consultas') // Lê consultas do localStorage

    const pacientesConvertidos = JSON.parse(lerPacientes) // Converte JSON para array de pacientes
    const medicosConvertidos = JSON.parse(lerMedicos) // Converte JSON para array de médicos
    const consultasConvertidas = JSON.parse(lerConsultas) // Converte JSON para array de consultas

    if(pacientesConvertidos) setPacientes(pacientesConvertidos) // Atualiza estado pacientes
    if(medicosConvertidos) setMedicos(medicosConvertidos) // Atualiza estado médicos
    if(consultasConvertidas) setConsultas(consultasConvertidas) // Atualiza estado consultas

  }, []);

  const [pacienteSelecionado, setpacienteSelecionado] = useState(''); // Estado para o paciente selecionado no formulário
  const [medicoSelecionado, setmedicoSelecionado] = useState(''); // Estado para o médico selecionado no formulário
  const [dataHora, setdataHora] = useState(''); // Estado para a data e hora da consulta selecionadas no formulário

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita recarregar a página ao enviar o formulário
    
    const novaConsulta = {
      id: Date.now(), // ID único da consulta baseado em timestamp
      pacienteId: Number(pacienteSelecionado), // Converte para número o ID do paciente selecionado
      medicoId: Number(medicoSelecionado), // Converte para número o ID do médico selecionado
      dataHora // Data e hora selecionadas da consulta
    };

    const novasConsultas = [...consultas, novaConsulta]; // Cria nova lista de consultas adicionando a nova
    setConsultas(novasConsultas); // Atualiza estado com nova lista
    localStorage.setItem('consultas', JSON.stringify(novasConsultas)); // Salva no localStorage

    // Reseta os campos do formulário após salvar
    setpacienteSelecionado('');
    setmedicoSelecionado('');
    setdataHora('');
  }

  // Função para excluir uma consulta pelo ID
  const excluirConsulta = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta consulta?'); // Confirmação do usuário
    if (!confirmar) return; // Se cancelar, não faz nada

    const novasConsultas = consultas.filter((consulta) => consulta.id !== id); // Remove consulta pelo ID
    setConsultas(novasConsultas); // Atualiza estado
    localStorage.setItem('consultas', JSON.stringify(novasConsultas)); // Atualiza localStorage
  };

  return (
    <div className="flex justify-center px-4 min-h-screen bg-gradient-to-r from-blue-50 to-red-100 py-10">      
      <div className="gap-3 bg-white shadow-md p-10 w-[600px] mx-auto rounded-xl">

        <h1 className="font-semibold text-2xl mb-6 text-center text-red-600"><strong>Agendar Consulta 📋</strong></h1>

        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow flex flex-col gap-4">
          <select value={pacienteSelecionado} onChange={(e) => setpacienteSelecionado(e.target.value)}
            className="border border-gray-300 p-2 rounded text-gray-500">
            <option value="">Selecione um paciente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nome}
              </option>
            ))}
          </select>

          <select value={medicoSelecionado} onChange={(e) => setmedicoSelecionado(e.target.value)}
            className="border border-gray-300 p-2 rounded text-gray-500">
            <option value="">Selecione um médico</option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.nome}
              </option>
            ))}
          </select>

          <input
            className="border border-gray-300 p-2 rounded text-gray-500"
            value={dataHora}
            type="datetime-local"
            onChange={(e) => setdataHora(e.target.value)}
          />

          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition">
            Agendar Consulta
          </button>
        </form>

        <h2 className="text-xl font-bold mt-8 mb-4 text-center">Consultas Marcadas</h2>
        <ul className="space-y-4">
          {consultas.map((consulta) => {
            const paciente = pacientes.find((p) => p.id === consulta.pacienteId); // Busca paciente da consulta
            const medico = medicos.find((m) => m.id === consulta.medicoId); // Busca médico da consulta

            return (
              <li key={consulta.id} className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow gap-1 justify-between items-center">
                <p>Consulta do paciente: <strong>{(paciente?.nome || "Paciente desconhecido").slice(0, 36)}{(paciente?.nome && paciente.nome.length > 37) ? '...' : ''}</strong></p>
                <p>com Dr.(a) <strong>{(medico?.nome || "Médico desconhecido").slice(0, 38)}{(medico?.nome && medico.nome.length > 39) ? '...' : ''}</strong></p>
                <p>em {new Date(consulta.dataHora).toLocaleString()};</p>
                <button
                  onClick={() => excluirConsulta(consulta.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                >
                  Excluir
                </button>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  )
};

export default ConsultasMarcadas;
