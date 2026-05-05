import React, { useState, useEffect } from "react";
import "../css/admin.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";

export default function Admin() {
  // --- ESTADOS DE EXIBIÇÃO DE FORMULÁRIOS ORIGINAIS ---
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [showRankingForm, setShowRankingForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);

  // --- NOVOS ESTADOS PARA AS REGRAS DE NEGÓCIO ---
  const [searchTerm, setSearchTerm] = useState("");
  const [managingGroup, setManagingGroup] = useState(null); // Armazena o grupo sendo visualizado
  const [banConfig, setBanConfig] = useState({
    show: false,
    userId: null,
    duration: "7_dias",
  });
  const [newAdminCpf, setNewAdminCpf] = useState("");

  // --- MOCK DE DADOS (Simulando o Banco de Dados) ---
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [rankings, setRankings] = useState([]);

  // Estados extras que precisei colocar pro seu backend de eventos/galeria não chorar:
  const [events, setEvents] = useState([]);
  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [galleryFile, setGalleryFile] = useState(null);

  const API_BASE = "http://localhost:8080";

  // ========================================================================
  // UTILITÁRIO DE FETCH (Magia Negra dos Cookies Seguros)
  // ========================================================================
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const fetchAuth = async (endpoint, options = {}) => {
    const token = getCookie("token"); // Troque pelo nome do seu cookie se não for HttpOnly

    const headers = {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = headers["Content-Type"] || "application/json";
    }

    return fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      credentials: "include", // O segredo pra mandar os cookies automaticamente
    });
  };

  useEffect(() => {
    carregarTudo();
  }, []);

  const carregarTudo = async () => {
    try {
      const resUsers = await fetchAuth("/users/list");
      if (resUsers.ok) setUsers(await resUsers.json());

      const resGroups = await fetchAuth("/registration/list");
      if (resGroups.ok) setGroups(await resGroups.json());

      const resRankings = await fetchAuth("/ranking/list");
      if (resRankings.ok) setRankings(await resRankings.json());

      const resEvents = await fetch("/event/list");
      if (resEvents.ok) setEvents(await resEvents.json());
    } catch (err) {
      console.error("Rede foi de arrasta pra cima.", err);
    }
  };

  // --- LÓGICA DE FILTRAGEM ---
  const filteredUsers = users.filter(
    (user) =>
      (user.nome?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.cpf || "").includes(searchTerm),
  );

  const regularUsers = filteredUsers.filter(
    (user) => !user.roles?.includes("ROLE_ADMIN"),
  );
  const adminUsers = filteredUsers.filter((user) =>
    user.roles?.includes("ROLE_ADMIN"),
  );

  // --- FUNÇÕES DE USUÁRIOS E BANIMENTO ---
  const confirmarBanimento = async () => {
    // Usando userId como CPF pra bater com a sua rota do Spring
    try {
      const res = await fetchAuth(`/users/destroy/${banConfig.userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("O usuário foi deletado da existência.");
        setUsers(users.filter((u) => u.cpf !== banConfig.userId));
      }
    } catch (err) {
      console.error(err);
    }
    setBanConfig({ show: false, userId: null, duration: "7_dias" });
  };

  const desbanirUsuario = (id) => {
    alert(
      "Como o backend exclui de verdade, não dá pra desbanir do nada. Elu vai ter que criar outra conta.",
    );
  };

  const verPerfil = (nome) => {
    alert(`Abrindo perfil completo de: ${nome}`);
  };

  // --- FUNÇÕES DE ADMINS ---
  const handleRemoverAdmin = async (id, nome) => {
    if (
      window.confirm(
        `Tem certeza que deseja remover os privilégios de Admin de ${nome}?`,
      )
    ) {
      // Ajuste se a sua rota for diferente
      const res = await fetchAuth(`/users/modify/${id}?role=ROLE_PARTICIPANT`, {
        method: "PUT",
      });
      if (res.ok) carregarTudo();
    }
  };

  const handleAdicionarAdmin = async () => {
    const res = await fetchAuth(
      `/users/modify/${newAdminCpf}?role=ROLE_ADMIN`,
      { method: "PUT" },
    );
    if (res.ok) {
      alert("Usuário promovido a Admin com sucesso!");
      setNewAdminCpf("");
      setShowAddUserForm(false);
      carregarTudo();
    } else {
      alert("CPF não encontrado no sistema.");
    }
  };

  // --- FUNÇÕES DE EQUIPE (GRUPOS) ---
  const removerMembroEquipe = async (grupoId, membroId) => {
    if (window.confirm("Remover este membro da equipe?")) {
      // Exemplo de como conectar no back. Adapte pra sua rota real de inscrição
      const res = await fetchAuth(`/registration/destroy/${grupoId}`, {
        method: "DELETE",
      });
      if (res.ok) carregarTudo();
    }
  };

  const tornarLider = (grupoId, novoLiderId) => {
    if (
      window.confirm(
        "Transferir a liderança para este membro? O líder atual passará a ser membro comum.",
      )
    ) {
      alert(
        "Conecte isso a uma rota PUT de modificação de inscrição no Spring Boot.",
      );
    }
  };

  // Funções Extras (Eventos e Galeria)
  const handleCriarEvento = async () => {
    const res = await fetchAuth("/event/create", {
      method: "POST",
      body: JSON.stringify(eventFormData),
    });
    if (res.ok) {
      alert("Evento Criado!");
      carregarTudo();
      setShowEventForm(false);
    }
  };

  const handleUploadGaleria = async () => {
    if (!galleryFile) return;
    const formData = new FormData();
    formData.append("file", galleryFile);
    const res = await fetchAuth("/api/gallery/upload", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      alert("Upload Feito!");
      setShowGalleryForm(false);
    }
  };

  return (
    <div className="admin-page">
      <Header />

      <div className="painel-wrapper">
        {/* BARRA DE PESQUISA GERAL */}
        <section
          className="painel-section search-section"
          style={{ marginBottom: "20px" }}
        >
          <div className="input-box full-width">
            <label>Buscar Usuário (Por Nome ou CPF)</label>
            <input
              type="text"
              placeholder="Digite para filtrar as tabelas de usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 1: USUÁRIOS (Ver perfil e Banir)                               */}
        {/* ==================================================================== */}
        <section className="painel-section">
          <h2 className="painel-title">USUÁRIOS: VISUALIZAR E PUNIR</h2>
          <hr className="painel-divider" />

          <div className="table-responsive">
            <table className="painel-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {regularUsers.map((user) => (
                  <tr key={user.cpf}>
                    <td>{user.nome || "Sem nome"}</td>
                    <td>{user.cpf}</td>
                    <td>
                      <span className="badge-status ativo">Ativo no BD</span>
                    </td>
                    <td className="actions-cell">
                      <button
                        className="btn-salvar"
                        onClick={() => verPerfil(user.nome)}
                      >
                        Ver Perfil
                      </button>
                      <button
                        className="btn-remover"
                        onClick={() =>
                          setBanConfig({
                            show: true,
                            userId: user.cpf,
                            duration: "7_dias",
                          })
                        }
                      >
                        Deletar/Banir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal INLINE de Banimento */}
          {banConfig.show && (
            <div
              className="add-user-form animation-fade-in"
              style={{ border: "1px solid red", marginTop: "15px" }}
            >
              <h4 style={{ color: "#FF3E3E", marginBottom: "10px" }}>
                Configurar Banimento
              </h4>
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "14px",
                  color: "#ccc",
                }}
              >
                Isso vai excluir a conta direto do banco.
              </p>
              <div className="input-box full-width mb-3">
                <label>
                  Tempo de Suspensão (No backend atual, apaga direto)
                </label>
                <select
                  value={banConfig.duration}
                  onChange={(e) =>
                    setBanConfig({ ...banConfig, duration: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#111",
                    color: "#fff",
                    border: "1px solid #333",
                  }}
                >
                  <option value="1_dia">1 Dia</option>
                  <option value="7_dias">7 Dias (1 Semana)</option>
                  <option value="30_dias">30 Dias</option>
                  <option value="Permanente">Permanente (Delete HTTP)</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button className="btn-remover" onClick={confirmarBanimento}>
                  Confirmar Punição
                </button>
                <button
                  className="btn-salvar"
                  onClick={() =>
                    setBanConfig({
                      show: false,
                      userId: null,
                      duration: "7_dias",
                    })
                  }
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 2: ADMINISTRADORES (Adicionar e Remover)                       */}
        {/* ==================================================================== */}
        <section className="painel-section">
          <h2 className="painel-title"> ADMINISTRADORES</h2>
          <hr className="painel-divider" />

          <div className="table-responsive">
            <table className="painel-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((user) => (
                  <tr key={user.cpf}>
                    <td>{user.nome || "Admin Oculto"}</td>
                    <td>{user.cpf}</td>
                    <td className="actions-cell">
                      <button
                        className="btn-remover"
                        onClick={() => handleRemoverAdmin(user.cpf, user.nome)}
                      >
                        Tirar Admin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="btn-outline-cyan mt-3"
            onClick={() => setShowAddUserForm(!showAddUserForm)}
          >
            {showAddUserForm ? "Cancelar" : "+ Adicionar Novo Admin"}
          </button>

          {showAddUserForm && (
            <div
              className="add-user-form animation-fade-in"
              style={{ marginTop: "15px" }}
            >
              <div className="input-box full-width mb-3">
                <label>Promover usuário existente (Digite o CPF)</label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={newAdminCpf}
                  onChange={(e) => setNewAdminCpf(e.target.value)}
                />
              </div>
              <button
                className="btn-outline-cyan"
                onClick={handleAdicionarAdmin}
              >
                Promover a Admin
              </button>
            </div>
          )}
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 3: GERENCIAR GRUPOS E EQUIPES                                  */}
        {/* ==================================================================== */}
        <section className="painel-section">
          <h2 className="painel-title">GERENCIAR GRUPOS E EQUIPES</h2>
          <hr className="painel-divider" />

          {/* Se NÃO estiver visualizando um grupo, mostra a lista de grupos */}
          {!managingGroup ? (
            <>
              <div className="table-responsive">
                <table className="painel-table">
                  <thead>
                    <tr>
                      <th>Nome do Grupo</th>
                      <th>Total de Membros</th>
                      <th>Líder Atual</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((grupo) => {
                      const lider = grupo.membros?.find(
                        (m) => m.role === "Líder",
                      );
                      return (
                        <tr key={grupo.id || grupo.nomeEquipe}>
                          <td>{grupo.nomeEquipe || "Sem nome"}</td>
                          <td>{grupo.membros?.length || 0}</td>
                          <td style={{ color: "#00EAFF" }}>
                            {lider ? lider.nome : "Sem líder"}
                          </td>
                          <td className="actions-cell">
                            <button
                              className="btn-salvar"
                              onClick={() => setManagingGroup(grupo)}
                            >
                              Ver Equipe
                            </button>
                            <button className="btn-remover">Dissolver</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <button
                className="btn-outline-cyan mt-2"
                onClick={() => setShowGroupForm(!showGroupForm)}
              >
                {showGroupForm ? "Fechar" : "Criar Novo Grupo"}
              </button>

              {showGroupForm && (
                <div className="add-user-form animation-fade-in">
                  <div className="input-box full-width mb-3">
                    <label>Nome do Grupo</label>
                    <input type="text" />
                  </div>
                  <button className="btn-outline-cyan">
                    Confirmar Criação
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="group-details animation-fade-in">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <h3 style={{ color: "#00EAFF", margin: 0 }}>
                  Gerenciando: {managingGroup.nomeEquipe || "Equipe"}
                </h3>
                <button
                  className="btn-outline-cyan"
                  onClick={() => setManagingGroup(null)}
                >
                  Voltar para Lista
                </button>
              </div>

              <div className="table-responsive">
                <table className="painel-table">
                  <thead>
                    <tr>
                      <th>Membro</th>
                      <th>Cargo na Equipe</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managingGroup.membros?.map((membro) => (
                      <tr key={membro.id || membro.cpf}>
                        <td>{membro.nome || membro.cpf}</td>
                        <td
                          style={{
                            fontWeight:
                              membro.role === "Líder" ? "bold" : "normal",
                            color: membro.role === "Líder" ? "#00EAFF" : "#fff",
                          }}
                        >
                          {membro.role || "Membro"}
                        </td>
                        <td className="actions-cell">
                          {membro.role !== "Líder" && (
                            <button
                              className="btn-salvar"
                              onClick={() =>
                                tornarLider(managingGroup.id, membro.id)
                              }
                            >
                              Tornar Líder
                            </button>
                          )}
                          <button
                            className="btn-remover"
                            onClick={() =>
                              removerMembroEquipe(managingGroup.id, membro.id)
                            }
                          >
                            Excluir Membro
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Botão de Adicionar Membro na Equipe */}
              <div
                className="mt-3"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "15px",
                  borderRadius: "8px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    color: "#aaa",
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}
                >
                  Adicionar membro por CPF:
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #333",
                      background: "#111",
                      color: "#fff",
                      flex: 1,
                    }}
                  />
                  <button className="btn-outline-cyan">
                    Adicionar à Equipe
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="painel-section">
          <h2 className="painel-title">GERENCIAR RANKINGS</h2>
          <hr className="painel-divider" />

          <div className="table-responsive">
            <table className="painel-table">
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Equipe</th>
                  <th>Pontuação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((rk, idx) => (
                  <tr key={rk.id || idx}>
                    <td>{idx + 1}º Lugar</td>
                    <td>{rk.equipeNome || "Desconhecida"}</td>
                    <td>{rk.pontos} pts</td>
                    <td className="actions-cell">
                      <button className="btn-salvar">Editar</button>
                      <button className="btn-remover">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="btn-outline-cyan mt-2"
            onClick={() => setShowRankingForm(!showRankingForm)}
          >
            {showRankingForm ? "Fechar" : "Adicionar Equipe ao Ranking"}
          </button>

          {showRankingForm && (
            <div className="add-user-form animation-fade-in">
              <div className="add-user-grid">
                <div className="input-box">
                  <label>Definir Posição</label>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: "#111",
                      color: "#fff",
                      border: "1px solid #333",
                    }}
                  >
                    <option value="">Selecione a posição...</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}º Lugar
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-box">
                  <label>Selecionar Equipe (do Banco)</label>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: "#111",
                      color: "#fff",
                      border: "1px solid #333",
                    }}
                  >
                    <option value="">Selecione uma equipe...</option>
                    {groups.map((grupo) => (
                      <option key={grupo.id} value={grupo.nomeEquipe}>
                        {grupo.nomeEquipe}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-box">
                  <label>Pontuação</label>
                  <input type="number" placeholder="Ex: 1500" />
                </div>
              </div>
              <button className="btn-outline-cyan mt-3">
                Salvar no Ranking
              </button>
            </div>
          )}
        </section>

        {/* ADMINISTRAÇÃO DE EVENTOS */}
        <section className="painel-section">
          <h2 className="painel-title">ADMINISTRAÇÃO DE EVENTOS</h2>
          <hr className="painel-divider" />
          <p className="painel-subtitle">
            Aqui, você tem o poder de planejar e executar as competições...
          </p>

          <button
            className="btn-outline-cyan mt-2 mb-3"
            onClick={() => setShowEventForm(!showEventForm)}
          >
            {showEventForm ? "Fechar Formulário" : "Criar um Novo Evento"}
          </button>

          {showEventForm && (
            <div className="event-form-container animation-fade-in">
              <div className="input-box full-width mb-3">
                <label>Título do Evento</label>
                <input
                  type="text"
                  value={eventFormData.title}
                  onChange={(e) =>
                    setEventFormData({
                      ...eventFormData,
                      title: e.target.value,
                    })
                  }
                  placeholder="Insira o texto aqui..."
                />
              </div>
              <div className="event-description-grid mb-3">
                <div className="input-box textarea-box">
                  <label>Descrição do Evento</label>
                  <textarea
                    value={eventFormData.description}
                    onChange={(e) =>
                      setEventFormData({
                        ...eventFormData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Insira o texto aqui..."
                  ></textarea>
                </div>
                <div className="input-box date-box">
                  <label>Data do Evento</label>
                  <input
                    type="date"
                    value={eventFormData.date}
                    onChange={(e) =>
                      setEventFormData({
                        ...eventFormData,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <button
                className="btn-outline-cyan mt-3"
                onClick={handleCriarEvento}
              >
                Adicionar Evento
              </button>
            </div>
          )}
        </section>

        {/* GERENCIAMENTO DA GALERIA */}
        <section className="painel-section">
          <h2 className="painel-title">GERENCIAMENTO DA GALERIA</h2>
          <hr className="painel-divider" />
          <button
            className="btn-outline-cyan mt-2 mb-3"
            onClick={() => setShowGalleryForm(!showGalleryForm)}
          >
            {showGalleryForm ? "Fechar Galeria" : "Anexar Novas Imagens"}
          </button>

          {showGalleryForm && (
            <div className="upload-container animation-fade-in">
              <div className="upload-body">
                <div className="upload-icon">☁️</div>
                <p>Selecione um arquivo de imagem para enviar</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setGalleryFile(e.target.files[0])}
                  style={{ display: "block", margin: "10px auto" }}
                />
                <button
                  className="btn-outline-cyan mt-2"
                  onClick={handleUploadGaleria}
                >
                  Fazer Upload
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}
