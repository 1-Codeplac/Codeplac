import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/admin.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import { getAllUsers, modifyUserFunction } from "../../services/userService";
import { getAllEvents } from "../../services/eventService";

export default function Admin() {
  // Estados para controlar a visibilidade de cada formulário
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [changedFunction, setChangedFunctions] = useState({})
  const [loading, setLoading] = useState(false)
  const savedUser = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, eventsData] = await Promise.allSettled([
          getAllUsers(savedUser.token),
          getAllEvents()
        ])
        
        setUsers(usersData.value)
        setEvents(eventsData.value)
      } catch (error) {
        alert("Algo deu errado!")
        navigate("/")
      }
    }

    fetchData()
  }, [navigate, savedUser.token])

  const handleSaveNewUserFunction = async (user) => {
    const newUserFunction = changedFunction[user.cpf]

    if(!newUserFunction || newUserFunction === user.tipoUsuario) {
      alert("Não há mudanças!")
      return
    }

    try {
      setLoading(true)

      const data = await modifyUserFunction(user.cpf, savedUser.token, newUserFunction)

      setUsers((prev) => 
        prev.map((user) => 
          user.cpf === data.cpf 
            ? {...user, tipoUsuario: data.tipoUsuario} 
            : user
        )
      )
    } catch (error) {
      alert("Erro ao alterar a função do usuário!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-page">
      <Header />

      <div className="painel-wrapper">
        {/* SEÇÃO 1: GERENCIAMENTO DE ADMINISTRADORES */}
        <section className="painel-section">
          <h2 className="painel-title">GERENCIAMENTO DE ADMINISTRADORES</h2>
          <hr className="painel-divider" />

          <div className="table-responsive">
            <table className="painel-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Status</th>
                  <th>Função</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.cpf}>
                    <td>{user.nome}</td>
                    <td>{user.cpf}</td>
                    <td>
                      <span
                        className={`badge-status ${user.tipoUsuario.toLowerCase()}`}
                      >
                        {user.tipoUsuario}
                      </span>
                    </td>
                    <td>
                      <select
                        className="select-funcao"
                        value={changedFunction[user.cpf] || user.tipoUsuario}
                        onChange={(e) => setChangedFunctions((prev) => ({ ...prev, [user.cpf]: e.target.value }))}
                      >
                        <option value="PARTICIPANT">Participante</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="btn-salvar" 
                        onClick={() => handleSaveNewUserFunction(user)} 
                        disabled={loading}
                      >
                        Salvar
                      </button>
                      <button className="btn-remover">Remover</button>
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
            {showAddUserForm ? "Cancelar" : "Adicionar Usuário"}
          </button>

          {showAddUserForm && (
            <div className="add-user-form animation-fade-in">
              <div className="input-box full-width">
                <label>Nome do Usuário</label>
                <input type="text" placeholder="Nome do usuário" />
              </div>
              <div className="add-user-grid">
                <div className="input-box">
                  <label>CPF do Usuário</label>
                  <input type="text" placeholder="CPF do Usuário" />
                </div>
                <div className="input-box">
                  <label>Função do Usuário</label>
                  <select>
                    <option>Selecione a Função</option>
                    <option>Membro</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>
              <button className="btn-outline-cyan">Salvar Usuário</button>
            </div>
          )}
        </section>

        {/* SEÇÃO 2: ADMINISTRAÇÃO DE EVENTOS */}
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
                <input type="text" placeholder="Insira o texto aqui..." />
              </div>

              <div className="event-description-grid mb-3">
                <div className="input-box textarea-box">
                  <label>Descrição do Evento</label>
                  <textarea placeholder="Insira o texto aqui..."></textarea>
                </div>
                <div className="input-box date-box">
                  <label>Data do Evento</label>
                  <input type="date" />
                </div>
              </div>

              <div className="input-box full-width mb-3">
                <label>Local do Evento</label>
                <input type="text" placeholder="Insira o texto aqui..." />
              </div>

              <div className="tags-group">
                <label>Tipo do Evento</label>
                <div className="tags-buttons">
                  <button className="tag-btn active">Competição</button>
                  <button className="tag-btn">Palestra</button>
                </div>
              </div>

              <div className="tags-group">
                <label>Período do Evento</label>
                <div className="tags-buttons">
                  <button className="tag-btn active">Matutino</button>
                  <button className="tag-btn">Vespertino</button>
                  <button className="tag-btn">Noturno</button>
                </div>
              </div>

              <button className="btn-outline-cyan mt-3">
                Adicionar Evento
              </button>
            </div>
          )}
        </section>

        {/* SEÇÃO 3: GERENCIAMENTO DA GALERIA */}
        <section className="painel-section">
          <h2 className="painel-title">GERENCIAMENTO DA GALERIA</h2>
          <hr className="painel-divider" />
          <p className="painel-subtitle">
            Aqui você tem controle de quais imagens representarão a
            comunidade...
          </p>

          <button
            className="btn-outline-cyan mt-2 mb-3"
            onClick={() => setShowGalleryForm(!showGalleryForm)}
          >
            {showGalleryForm ? "Fechar Galeria" : "Anexar Novas Imagens"}
          </button>

          {showGalleryForm && (
            <div className="upload-container animation-fade-in">
              <div className="upload-header">Escolher arquivos</div>
              <div className="upload-body">
                <div className="upload-icon">☁️</div>
                <p>Arraste um arquivo ou Clique aqui</p>
                <button className="btn-outline-cyan mt-2">
                  Escolher Arquivo
                </button>
              </div>
            </div>
          )}

          <div className="mt-4">
            <button className="btn-outline-cyan">Gerenciar Imagens</button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
