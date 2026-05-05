import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Adicionando ícones do olhinho
import "../css/senha.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import sapoImg from "../../assets/img/sapobone.png";

function Senha() {
  const urlfinal = `${process.env.REACT_APP_URL}/auth/forgot-password`.replace(
    /([^:]\/)\/+/g,
    "$1",
  );
  const [formData, setFormData] = useState({
    cpf: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const camposVazios = Object.values(formData).some(
      (valor) => valor.trim() === "",
    );
    if (camposVazios) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(urlfinal, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro do Servidor:", errorText);
        try {
          const errorData = JSON.parse(errorText);
          alert(errorData.message || "Erro ao processar solicitação.");
        } catch {
          alert("Erro ao processar solicitação.");
        }
        return;
      }
      alert("Link de redefinição enviado para o seu e-mail!");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Estados de Controle da Tela
  const [fase, setFase] = useState("solicitar"); // "solicitar" (CPF) ou "redefinir" (Nova Senha)
  const [showPassword, setShowPassword] = useState(false);

  // Estados dos Inputs
  const [cpf, setCpf] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Efeito "Inteligente": Verifica se a URL tem um token ou parâmetro
  useEffect(() => {
    const token = searchParams.get("token");
    const editando = searchParams.get("editando");

    // Se tiver um token na URL ou se veio do botão do Header logado
    if (token || editando === "true") {
      setFase("redefinir");
    }
  }, [searchParams]);

  // --- FUNÇÕES DE AÇÃO ---

  const handleSolicitarLink = (e) => {
    e.preventDefault();
    /* AQUI VAI A CHAMADA PARA O BACKEND ENVIAR O E-MAIL /**/
    console.log("Solicitando link para o CPF:", cpf);
    alert("Se o CPF estiver correto, enviamos um link para o seu e-mail!");

    // 👇 APENAS PARA VOCÊ TESTAR: força a ida para a fase 2 sem precisar de backend agora
    setFase("redefinir");
  };

  const handleSalvarSenha = (e) => {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem. Digite novamente!");
      return;
    }

    /* AQUI VAI A CHAMADA PARA O BACKEND SALVAR A SENHA /**/
    console.log("Salvando nova senha...");
    alert("Senha alterada com sucesso!");
    navigate("/login"); // Manda o usuário de volta pro login
  };

  return (
    <div className="PageWrapper">
      <div className="App login-container">
        <Header />

        <div className="recovery-circle">
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

              {/* Lado Direito: Formulário Dinâmico */}
              <div className="login-form-container">
                <h1 className="login-title uppercase">
                  {fase === "solicitar"
                    ? "RECUPERE SUA CONTA"
                    : "CRIE UMA NOVA SENHA"}
                </h1>
                <div className="title-underline"></div>

                <p className="recovery-instruction">
                  {fase === "solicitar" ? (
                    <label>
                      INFORME SEU CPF PARA RECEBER UM LINK <br /> DE REDEFINIÇÃO
                      POR E-MAIL.
                    </label>
                  ) : (
                    <label>
                      DIGITE SUA NOVA SENHA ABAIXO.
                      <br />
                      LEMBRE-SE DE USAR UMA SENHA FORTE.
                    </label>
                  )}
                </p>

                {/* FORMULÁRIO 1: PEDIR O LINK */}
                {fase === "solicitar" && (
                  <form className="login-form" onSubmit={handleSolicitarLink}>
                    <div className="login-input-group">
                      <label>CPF</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="btn-login btn-send">
                      ENVIAR LINK
                    </button>
                  </form>
                )}

                {/* FORMULÁRIO 2: SALVAR NOVA SENHA */}
                {fase === "redefinir" && (
                  <form className="login-form" onSubmit={handleSalvarSenha}>
                    <div className="login-input-group password-group">
                      <label>NOVA SENHA</label>
                      <div
                        className="password-input-wrapper"
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Digite a nova senha"
                          value={novaSenha}
                          onChange={(e) => setNovaSenha(e.target.value)}
                          required
                          style={{ width: "100%", paddingRight: "40px" }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            right: "10px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#00EAFF",
                          }}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="login-input-group">
                      <label>CONFIRME A NOVA SENHA</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Repita a nova senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn-login btn-send">
                      SALVAR SENHA
                    </button>
                  </form>
                )}

                {/* Botão de voltar comum às duas fases */}
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
