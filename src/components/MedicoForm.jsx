import { useState, useEffect } from "react";

function FormularioMedico() {
  // Estados para armazenar os valores dos campos de entrada
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [crm, setCrm] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  // Estado que armazena todos os médicos cadastrados
  const [medicos, setMedicos] = useState([]);

  // Estado que controla se está em modo de edição
  const [editando, setEditando] = useState(false);

  // Armazena o ID do médico que está sendo editado
  const [idEditando, setIdEditando] = useState(null);

  // Controla se os dados do localStorage já foram carregados
  const [carregado, setCarregado] = useState(false);

  // Armazena erros de validação dos campos
  const [erros, setErros] = useState({});

  // Define o campo de ordenação
  const [ordenarPor, setOrdenarPor] = useState("nome");

  // Armazena o valor de busca digitado
  const [busca, setBusca] = useState('');

  // Valida se os campos obrigatórios foram preenchidos
  const validarCampos = () => {
    const novosErros = {};

    if (!nome.trim()) novosErros.nome = "O nome é obrigatório.";
    if (!especialidade.trim()) novosErros.especialidade = "A especialidade é obrigatória.";
    if (!crm.trim()) novosErros.crm = "O CRM é obrigatório.";
    if (!telefone.trim()) novosErros.telefone = "O telefone é obrigatório.";
    if (!email.trim()) novosErros.email = "O e-mail é obrigatório.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Lida com o envio do formulário (tanto cadastrar quanto salvar edição)
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede recarregamento da página

    if (!validarCampos()) return;

    if (editando && idEditando !== null) {
      // Atualiza o médico existente
      const medicosAtualizados = medicos.map((m) =>
        m.id === idEditando ? { ...m, nome, especialidade, crm, telefone, email } : m
      );
      setMedicos(medicosAtualizados);
    } else {
      // Cria um novo médico
      const novoMedico = {
        id: Date.now(),
        nome,
        especialidade,
        crm,
        telefone,
        email
      };
      setMedicos([...medicos, novoMedico]);
    }

    // Limpa os campos e estados
    setNome('');
    setEspecialidade('');
    setCrm('');
    setTelefone('');
    setEmail('');
    setEditando(false);
    setIdEditando(null);
    setErros({});
  };

  // Remove médico pelo ID
  const removerMedico = (id) => {
    const confirmar = window.confirm("Tem certeza que deseja remover este Médico?");
    if (!confirmar) return;
    const novaLista = medicos.filter((m) => m.id !== id);
    setMedicos(novaLista);
  };

  // Preenche os campos com dados do médico para edição
  const editarMedico = (medico) => {
    setNome(medico.nome);
    setEspecialidade(medico.especialidade);
    setCrm(medico.crm);
    setTelefone(medico.telefone);
    setEmail(medico.email);
    setEditando(true);
    setIdEditando(medico.id);
  };

  // Carrega dados do localStorage ao iniciar
  useEffect(() => {
    const medicosSalvos = localStorage.getItem("medicos");
    if (medicosSalvos) {
      setMedicos(JSON.parse(medicosSalvos));
    }
    setCarregado(true);
  }, []);

  // Atualiza o localStorage sempre que a lista de médicos mudar
  useEffect(() => {
    if (carregado) {
      localStorage.setItem("medicos", JSON.stringify(medicos));
    }
  }, [medicos, carregado]);

  // Ordena os médicos com base no campo selecionado
  const medicosOrdenados = [...medicos].sort((a, b) => {
    if (ordenarPor === "nome") {
      return a.nome.localeCompare(b.nome);
    } else if (ordenarPor === "especialidade") {
      return a.especialidade.localeCompare(b.especialidade);
    }
    return 0;
  });

  // Filtra médicos com base na busca
  const medicosFiltrados = medicosOrdenados.filter((m) =>
    m.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex justify-center px-4 min-h-screen bg-gradient-to-r from-blue-50 to-green-100 py-10">
      <div className="flex flex-col gap-3 bg-white shadow-md p-10 w-[600px] mx-auto rounded-xl">
        <h1 className="font-semibold text-2xl text-green-600 mb-6 text-center">
          <strong>Cadastro de Médicos 📋</strong>
        </h1>

        {/* Formulário de cadastro/edição */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {erros.nome && <p className="text-red-500 text-sm italic">{erros.nome}</p>}

          <input
            type="text"
            placeholder="Especialidade"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {erros.especialidade && <p className="text-red-500 text-sm italic">{erros.especialidade}</p>}

          <input
            type="text"
            placeholder="CRM"
            value={crm}
            onChange={(e) => setCrm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {erros.crm && <p className="text-red-500 text-sm italic">{erros.crm}</p>}

          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {erros.telefone && <p className="text-red-500 text-sm italic">{erros.telefone}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {erros.email && <p className="text-red-500 text-sm italic">{erros.email}</p>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
          >
            {editando ? "Salvar edição" : "Cadastrar médico"}
          </button>
        </form>

        {/* Campo de ordenação e busca */}
        <div className="flex flex-col gap-3 mt-4 " >
          <label className="font-medium">Ordenar por:</label>
          <select
            value={ordenarPor}
            onChange={(e) => setOrdenarPor(e.target.value)}
            className="text-gray-500 w-full border border-gray-300 rounded-lg px-2 py-1"
          >
            <option value="nome">Nome</option>
            <option value="especialidade">Especialidade</option>
          </select>

          <input
            type="text"
            placeholder="Buscar por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-2 py-1"
          />
        </div>

        {/* Lista de médicos */}
        <h2 className="text-lg font-semibold mt-4 mb-2">Médicos cadastrados:</h2>
        {medicosFiltrados.map((medico) => (
          <div key={medico.id} className="bg-gray-50 border p-4 rounded-lg shadow-md">
            <p><strong>Nome:</strong> {medico.nome}</p>
            <p><strong>Especialidade:</strong> {medico.especialidade}</p>
            <p><strong>CRM:</strong> {medico.crm}</p>
            <p><strong>Telefone:</strong> {medico.telefone}</p>
            <p><strong>Email:</strong> {medico.email}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => removerMedico(medico.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Remover
              </button>
              <button
                onClick={() => editarMedico(medico)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormularioMedico;
