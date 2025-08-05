import { useState, useEffect } from "react";

function FormularioPaciente() {
  // Estados para os campos do formulário
  const [nome, setNome] = useState(''); // Nome do paciente
  const [data, setData] = useState(''); // Data de nascimento
  const [telefone, setTelefone] = useState(''); // Telefone
  const [email, setEmail] = useState(''); // Email

  // Estado para armazenar a lista de pacientes
  const [pacientes, setPacientes] = useState([]);

  // Controle de edição
  const [editando, setEditando] = useState(false); // Se está editando
  const [idEditando, setIdEditando] = useState(null); // ID do paciente em edição

  // Controle de carregamento inicial
  const [carregado, setCarregado] = useState(false);

  // Mensagens de erro nos inputs
  const [erros, setErros] = useState({});

  // Controle de ordenação e busca
  const [ordenarPor, setOrdenarPor] = useState("nome");
  const [busca, setBusca] = useState('');

  // Validação dos campos do formulário
  const validarCampos = () => {
    const novosErros = {};
    if (!nome.trim()) novosErros.nome = "O nome é obrigatório.";
    if (!data.trim()) novosErros.data = "A data de nascimento é obrigatória.";
    if (!telefone.trim()) novosErros.telefone = "O telefone é obrigatório.";
    if (!email.trim()) novosErros.email = "O e-mail é obrigatório.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Função para cadastrar ou atualizar paciente
  const cadastrarPaciente = (e) => {
    e.preventDefault(); // Evita recarregamento da página
    if (!validarCampos()) return;

    if (editando && idEditando !== null) {
      // Atualiza paciente existente
      const atualizados = pacientes.map(p =>
        p.id === idEditando ? { ...p, nome, data, telefone, email } : p
      );
      setPacientes(atualizados);
      setEditando(false);
      setIdEditando(null);
    } else {
      // Cria novo paciente
      const novoPaciente = {
        id: Date.now(),
        nome,
        data,
        telefone,
        email
      };
      setPacientes([...pacientes, novoPaciente]);
    }

    // Limpa os campos após envio
    setNome('');
    setData('');
    setTelefone('');
    setEmail('');
    setErros({});
  };

  // Remove paciente pelo ID
  const removerPaciente = (id) => {
    if (window.confirm("Tem certeza que deseja remover este paciente?")) {
      const novaLista = pacientes.filter(p => p.id !== id);
      setPacientes(novaLista);
    }
  };

  // Edita paciente (preenche o formulário com os dados)
  const editarPaciente = (paciente) => {
    setNome(paciente.nome);
    setData(paciente.data);
    setTelefone(paciente.telefone);
    setEmail(paciente.email);
    setEditando(true);
    setIdEditando(paciente.id);
  };

  // Carrega pacientes do localStorage no início
  useEffect(() => {
    const salvos = localStorage.getItem("pacientes");
    if (salvos) {
      setPacientes(JSON.parse(salvos));
    }
    setCarregado(true);
  }, []);

  // Salva automaticamente no localStorage sempre que pacientes mudarem
  useEffect(() => {
    if (carregado) {
      localStorage.setItem("pacientes", JSON.stringify(pacientes));
    }
  }, [pacientes, carregado]);

  // Ordena pacientes por nome ou data
  const pacientesOrdenados = [...pacientes].sort((a, b) => {
    return ordenarPor === "nome"
      ? a.nome.localeCompare(b.nome)
      : new Date(a.data) - new Date(b.data);
  });

  // Filtra pacientes pelo nome
  const pacientesFiltrados = pacientesOrdenados.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex justify-center px-4 min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-10">
      <div className="flex flex-col gap-3 bg-white shadow-md p-10 w-[600px] mx-auto rounded-xl">
        <h1 className="font-semibold text-2xl text-blue-600 mb-6 text-center">
          <strong>Cadastro de Pacientes 📋</strong>
        </h1>

        {/* Formulário de cadastro */}
        <form onSubmit={cadastrarPaciente} className="flex flex-col gap-3">
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          {erros.nome && <p className="text-red-500 text-sm italic">{erros.nome}</p>}

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            type="text"
            placeholder="Data de nascimento"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          {erros.data && <p className="text-red-500 text-sm italic">{erros.data}</p>}

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            type="txt"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          {erros.telefone && <p className="text-red-500 text-sm italic">{erros.telefone}</p>}

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {erros.email && <p className="text-red-500 text-sm italic">{erros.email}</p>}

          {/* Botão de cadastrar ou editar */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
          >
            {editando ? "Salvar edição" : "Cadastrar paciente"}
          </button>
        </form>

        {/* Filtro e ordenação */}
        <div className="flex flex-col gap-3 mt-4">
          <label htmlFor="ordenar" className="mr-2 font-medium">Ordenar por:</label>
          <select
            id="ordenar"
            value={ordenarPor}
            onChange={(e) => setOrdenarPor(e.target.value)}
            className="text-gray-500 w-full border border-gray-300 rounded-lg px-2 py-1"
          >
            <option value="nome">Nome</option>
            <option value="data">Data de nascimento</option>
          </select>

          <input
            type="text"
            placeholder="Buscar por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-2 py-1"
          />
        </div>

        {/* Lista de pacientes */}
        <h2 className="text-lg font-semibold mb-4 mt-6">Pacientes cadastrados:</h2>
        {pacientesFiltrados.map(paciente => (
          <div key={paciente.id} className="bg-gray-50 border border-gray-200 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <p><strong>Nome:</strong> {paciente.nome}</p>
            <p><strong>Data:</strong> {paciente.data}</p>
            <p><strong>Telefone:</strong> {paciente.telefone}</p>
            <p><strong>Email:</strong> {paciente.email}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => removerPaciente(paciente.id)}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Remover
              </button>
              <button
                onClick={() => editarPaciente(paciente)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded"
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

export default FormularioPaciente;
