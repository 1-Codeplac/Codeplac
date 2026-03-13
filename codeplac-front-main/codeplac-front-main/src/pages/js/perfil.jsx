import React, { useState } from "react";
import { User, Edit3, Save, Camera, History, FileText } from "lucide-react";
import "../css/perfil.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";

function Perfil() {
  // Estados para controlar os dados do usuário
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nome: "Usuário",
    email: "usuario@gmail.com",
    cpf: "xxx.xxx.xxx-xx",
    telefone: "(xx) xxxxx-xxxx",
    avatar: null,
  });

  // Função para lidar com a troca de textos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Função para o upload de imagem
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">
        <Header />

        <div className="profile-bg-effects">
          <Circle
            size={400}
            variant="purple"
            className="profile-circle-top-l"
          />
          <Circle size={450} variant="cyan" className="profile-circle-mid-r" />
        </div>

        <main className="profile-main-content">
          <section className="profile-card-box">
            <div className="profile-user-header">
              {/* Avatar com Upload */}
              <div className="profile-avatar-container">
                <div className="profile-avatar-placeholder">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="Avatar"
                      className="profile-avatar-img"
                    />
                  ) : (
                    <User size={60} color="#00EAFF" />
                  )}
                  {isEditing && (
                    <label className="profile-upload-label">
                      <Camera size={20} />
                      <input
                        type="file"
                        hidden
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="profile-user-info">
                <div className="profile-info-top">
                  {isEditing ? (
                    <input
                      type="text"
                      name="nome"
                      value={userData.nome}
                      onChange={handleChange}
                      className="profile-input-name"
                    />
                  ) : (
                    <h1 className="profile-username">{userData.nome}</h1>
                  )}

                  <button
                    className={`profile-btn-edit ${isEditing ? "save" : ""}`}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <Save size={14} /> SALVAR
                      </>
                    ) : (
                      <>
                        <Edit3 size={14} /> EDIT
                      </>
                    )}
                  </button>
                </div>

                <div className="profile-details-grid">
                  <div className="profile-detail-item">
                    <strong>E-MAIL:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                      />
                    ) : (
                      <span>{userData.email}</span>
                    )}
                  </div>
                  <div className="profile-detail-item">
                    <strong>CPF:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="cpf"
                        value={userData.cpf}
                        onChange={handleChange}
                      />
                    ) : (
                      <span>{userData.cpf}</span>
                    )}
                  </div>
                  <div className="profile-detail-item">
                    <strong>TELEFONE:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="telefone"
                        value={userData.telefone}
                        onChange={handleChange}
                      />
                    ) : (
                      <span>{userData.telefone}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-divider"></div>

            <div className="profile-events-grid">
              <div className="profile-event-card">
                <div className="profile-event-title">
                  <History size={20} color="#00EAFF" />
                  <h3>HISTÓRICO DE EVENTOS</h3>
                </div>
                <div className="profile-event-content">
                  <p>Sucesso na Era da Inteligência Artificial</p>
                </div>
              </div>

              <div className="profile-event-card">
                <div className="profile-event-title">
                  <FileText size={20} color="#00EAFF" />
                  <h3>INSCRIÇÕES ATUAIS</h3>
                </div>
                <div className="profile-event-content">
                  <p>Sucesso na Era da Inteligência Artificial</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Perfil;
