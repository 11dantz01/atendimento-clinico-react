function TelaInicial() {
  // Componente principal da tela inicial que exibe uma mensagem de boas-vindas e atalhos para as seções
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Bem-vindo ao Sistema de Gestão</h1> {/* Título principal */}
      <p className="text-lg text-gray-600 mb-10 max-w-xl">
        Aqui você pode gerenciar <strong>pacientes</strong>, <strong>médicos</strong> e <strong>consultas</strong> com facilidade e rapidez.
      </p> {/* Descrição resumida do sistema */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cards de atalhos para navegação */}
        <CardAtalho titulo="👤 Pacientes" descricao="Cadastre e edite pacientes." link="/pacientes" />
        <CardAtalho titulo="🩺 Médicos" descricao="Gerencie os profissionais." link="/medicos" />
        <CardAtalho titulo="📅 Consultas" descricao="Agende e visualize consultas." link="/consultas" />
        <CardAtalho titulo="📊 Painel" descricao="Veja os dados resumidos." link="/painel" />
      </div>
    </div>
  );
}

function CardAtalho({ titulo, descricao, link }) {
  // Componente para criar um card clicável com título, descrição e link para navegação
  return (
    <a href={link} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition cursor-pointer border border-gray-200">
      <h2 className="text-xl font-semibold text-blue-600 mb-2">{titulo}</h2> {/* Título do card */}
      <p className="text-gray-500">{descricao}</p> {/* Descrição do card */}
    </a>
  );
}

export default TelaInicial;
