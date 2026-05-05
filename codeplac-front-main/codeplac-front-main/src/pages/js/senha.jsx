import React, { useState } from "react";
import "../css/senha.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import sapoImg from "../../assets/img/sapobone.png";
import { forgotPassword } from "../../services/authService";

function Senha() {
  const [cpf, setCpf] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  const handleCpfChange = (e) => {
    const digit = e.target.value

    setCpf(digit)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!cpf) {
      alert("Informe o seu CPF!")
      return
    }

    try {
      setEmailSent(true)

      await forgotPassword(cpf)

      alert("Email de recuperação enviado!")
    } catch (error) {
      alert("Erro na recuperação da senha. Tente novamente!")
      
      setEmailSent(false)
    }
  }

  return (
    <div className="PageWrapper">
      <div className="App login-container">
        <Header />

        {/* Efeitos de Fundo Neon */}
        <div className=".recovery-circle">
          <Circle size={500} variant="cyan" className="recovery-circle-left" />
          <Circle size={400} variant="cyan" className="recovery-circle-right" />
        </div>

        <main className="login-main">
          <section className="login-card recovery-card">
            <div className="login-content">
              {/* Lado Esquerdo: Mascote */}
              <div className="login-mascot-container">
                <img
                  src={sapoImg}
                  alt="Mascote CodeplaC"
                  className="mascot-img"
                />
              </div>

              {/* Lado Direito: Formulário de Recuperação */}
              <div className="login-form-container">
                <h1 className="login-title uppercase">RECUPERE SUA CONTA</h1>
                <div className="title-underline"></div>

                <p className="recovery-instruction">
                  INFORME SEU CPF PARA RECEBER UM LINK <br />
                  DE REDEFINIÇÃO POR E-MAIL.
                </p>

                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="login-input-group">
                    <label>CPF</label>
                    <input 
                      type="text" 
                      name="cpf"
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={handleCpfChange}
                    />
                  </div>

                  <button type="submit" className="btn-login btn-send" disabled={emailSent}>
                    {emailSent ? "ENVIADO" : "ENVIAR LINK"}
                  </button>
                </form>

                <div className="create-account">
                  <a href="/login" className="back-to-login">
                    VOLTAR PARA O LOGIN
                  </a>
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

export default Senha;
