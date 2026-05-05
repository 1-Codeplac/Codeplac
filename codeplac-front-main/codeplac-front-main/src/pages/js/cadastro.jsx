import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/login.css"; // Reaproveitamos o CSS base
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import sapoImg from "../../assets/img/sapobone.png";

import "../css/cadastro.css"; // CSS específico para a página de cadastro

// API
import { registerUser } from "../../services/authService";

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    email: "",
    telefone: "",
    senha: ""
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(Object.values(formData).some((value) => !value.trim())) {
      alert("Preencha todos os campos!")
      return
    }

    try {
      setLoading(true)

      await registerUser(formData)

      navigate("/login")
    } catch (error) {
      alert("Falha ao cadastrar o usuário!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="PageWrapper">
      <div className="App login-container">
        <Header />

        {/* Efeitos de Fundo */}
        <div className="login-background-effects">
          <Circle size={500} variant="cyan" className="login-circle-left" />
          <Circle size={400} variant="cyan" className="login-circle-right" />
        </div>

        <main className="login-main">
          <section className="login-card cadastro-card">
            <div className="login-content">
              {/* Lado Esquerdo: Mascote com a borda retangular da imagem */}
              <div className="login-mascot-container">
                <img
                  src={sapoImg}
                  alt="Mascote CodeplaC"
                  className="mascot-img"
                />
              </div>

              {/* Lado Direito: Formulário de Cadastro */}
              <div className="login-form-container">
                <h1 className="login-title">CRIE SUA CONTA</h1>
                <div className="title-underline"></div>

                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="login-input-row">
                    <div className="login-input-group">
                      <label>NOME</label>
                      <input 
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="login-input-group">
                      <label>SOBRENOME</label>
                      <input 
                        type="text"
                        name="sobrenome"
                        value={formData.sobrenome}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="login-input-group">
                    <label>CPF</label>
                    <input 
                      type="text"
                      name="cpf"
                      placeholder="000.000.000-00" 
                      value={formData.cpf}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="login-input-group">
                    <label>E-MAIL</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="login-input-group">
                    <label>TELEFONE</label>
                    <input 
                      type="tel" 
                      name="telefone"
                      placeholder="(00) 00000-0000" 
                      value={formData.telefone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="login-input-group">
                    <label>SENHA</label>
                    <input 
                      type="password" 
                      name="senha"
                      value={formData.senha}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" className="btn-login btn-cadastrar" disabled={loading}>
                    CADASTRAR
                  </button>
                </form>

                <div className="create-account">
                  <span>JÁ TEM UMA CONTA? </span>
                  <a href="/login">FAÇA LOGIN</a>
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

export default Cadastro;
