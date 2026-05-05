import React, { useState, useEffect } from "react";
import { Users, UserPlus, Trash2, Crown, Mail } from "lucide-react";
import "../css/lider.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";

function Lider() {
  // Mock de dados da equipe (simulando o que virá do backend)
  const [equipe, setEquipe] = useState([]);
  const [novoEmail, setNovoEmail] = useState("");
  const API_BASE = "http://localhost:8080";

  // Efeito para carregar os membros assim que a página abre
  useEffect(() => {
    carregarEquipe();
  }, []);

  const carregarEquipe = async () => {
    try {
      const response = await fetch(`${API_BASE}/registration/list`, {
        method: "GET",
        credentials: "include", // Essencial para cookies seguros
      });

      if (response.ok) {
        const data = await response.json();
        // Aqui você filtraria os membros que pertencem ao seu grupo/evento específico
        setEquipe(
          data.map((reg) => ({
            id: reg.id,
            nome: reg.user?.nome || "Usuário",
            email: reg.user?.email || "E-mail não informado",
            role: reg.id === 1 ? "lider" : "membro", // Lógica simples de exemplo para definir o líder
          })),
        );
      }
    } catch (error) {
      console.error("Erro ao carregar a equipe:", error);
    }
  };

  // Função para remover um membro
  const handleRemoverMembro = async (id, nome) => {
    const confirmar = window.confirm(
      `Tem certeza que deseja remover ${nome} da equipe?`,
    );
    if (confirmar) {
      /* CHAMA A API PARA REMOVER O MEMBRO /**/
      try {
        const response = await fetch(`${API_BASE}/registration/destroy/${id}`, {
          method: "DELETE",
          credentials: "include", // Garante que o líder tem permissão via cookie[cite: 1, 2]
        });

        if (response.ok) {
          setEquipe(equipe.filter((membro) => membro.id !== id));
          console.log(`Membro ${id} removido.`);
          alert(`${nome} foi removido da equipe.`);
        } else {
          alert("Erro ao remover membro. Você tem certeza que é o líder?");
        }
      } catch (error) {
        console.error("Erro na conexão:", error);
      }
    }
  };

  // Função para convidar/adicionar novo membro
  const handleConvidarMembro = async (e) => {
    e.preventDefault();
    if (!novoEmail) return;

    /* CHAMA A API PARA ENVIAR CONVITE OU ADICIONAR DIRETO /**/
    try {
      const response = await fetch(`${API_BASE}/registration/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: novoEmail }), // O backend deve buscar o usuário por este e-mail
      });

      if (response.ok) {
        alert(`Membro adicionado com sucesso: ${novoEmail}`);
        setNovoEmail(""); // Limpa o campo
        carregarEquipe(); // Recarrega a lista atualizada
      } else {
        alert("Não foi possível adicionar o membro. Verifique o e-mail.");
      }
    } catch (error) {
      console.error("Erro ao convidar:", error);
    }
  };

  return (
    <div className="PageWrapper">
      <div className="lider-container">
        <Header />

        {/* Efeitos de Fundo Neon */}
        <div className="lider-bg-effects">
          <Circle size={450} variant="purple" className="lider-circle-left" />
          <Circle size={400} variant="cyan" className="lider-circle-right" />
        </div>

        <main className="lider-main">
          <section className="lider-card">
            {/* Cabeçalho do Painel */}
            <div className="lider-header-title">
              <div className="title-icon-wrapper">
                <Users size={32} color="#00EAFF" />
                <h1 className="uppercase">PAINEL DA EQUIPE</h1>
              </div>
              <p>
                Gerencie os membros da sua equipe, adicione novos ou remova
                participantes.
              </p>
              <div className="title-underline"></div>
            </div>

            {/* Área de Convite */}
            <div className="lider-invite-section">
              <h3>
                <UserPlus size={18} /> CONVIDAR NOVO MEMBRO
              </h3>
              <form className="invite-form" onSubmit={handleConvidarMembro}>
                <div className="invite-input-group">
                  <Mail size={18} className="input-icon" color="#999" />
                  <input
                    type="email"
                    placeholder="E-mail do novo integrante..."
                    value={novoEmail}
                    onChange={(e) => setNovoEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-invite">
                  ADICIONAR
                </button>
              </form>
            </div>

            <div className="lider-divider"></div>

            {/* Lista da Equipe */}
            <div className="lider-team-list">
              <h3>MEMBROS ATUAIS ({equipe.length})</h3>

              <div className="team-grid">
                {equipe.length > 0 ? (
                  equipe.map((membro) => (
                    <div
                      key={membro.id}
                      className={`team-member-row ${membro.role === "lider" ? "is-leader" : ""}`}
                    >
                      <div className="member-info">
                        <div className="member-avatar">
                          {membro.role === "lider" ? (
                            <Crown size={20} color="#05eeff" />
                          ) : (
                            <Users size={20} color="#00EAFF" />
                          )}
                        </div>
                        <div className="member-details">
                          <span className="member-name">{membro.nome}</span>
                          <span className="member-email">{membro.email}</span>
                        </div>
                      </div>

                      <div className="member-actions">
                        {membro.role === "lider" ? (
                          <span className="leader-badge">LÍDER</span>
                        ) : (
                          <button
                            className="btn-remove-member"
                            onClick={() =>
                              handleRemoverMembro(membro.id, membro.nome)
                            }
                            title="Remover Membro"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p
                    style={{
                      textAlign: "center",
                      color: "#666",
                      padding: "20px",
                    }}
                  >
                    Nenhum membro na equipe ainda.
                  </p>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Lider;
