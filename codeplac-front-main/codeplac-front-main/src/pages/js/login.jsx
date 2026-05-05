import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import sapoImg from "../../assets/img/sapobone.png"; // Caminho da imagem do sapo
import { loginUser } from "../../services/authService";

function Login() {
  const [formData, setFormData] = useState({
    cpf: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.cpf || !formData.password) {
      alert("Preencha todos os campos!")
      return
    }

    try {
      setLoading(true)

      const data = await loginUser(formData)
      localStorage.setItem("user", JSON.stringify({ 
        cpf: data.cpf,
        token: data.token,
        role: data.role
      }))
      
      navigate("/")
    } catch (error) {
      alert("CPF ou senha inválidos!")
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
          <section className="login-card">
            <div className="login-content">
              {/* Lado Esquerdo: Mascote */}
              <div className="login-mascot-container">
                <img
                  src={sapoImg}
                  alt="Mascote CodeplaC"
                  className="mascot-img"
                />
              </div>

              {/* Lado Direito: Formulário */}
              <div className="login-form-container">
                <h1 className="login-title">ACESSE SUA CONTA</h1>
                <div className="title-underline"></div>

                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="login-input-group">
                    <label>SELECIONE O TIPO DE SUA CONTA</label>
                    <select name="tipo">
                      <option value="usuario">USUÁRIO</option>
                      <option value="adm">ADMINISTRADOR (ADM)</option>
                    </select>
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
                    <label>SENHA</label>
                    <input 
                      type="password"
                      name="password"
                      placeholder="********"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <a href="/senha" className="forgot-password">
                      ESQUECEU SUA SENHA?
                    </a>
                  </div>

                  <button type="submit" className="btn-login" disabled={loading}>
                    LOGIN
                  </button>
                </form>

                <div className="create-account">
                  <a href="/cadastro">CRIAR UMA CONTA</a>
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

export default Login;
