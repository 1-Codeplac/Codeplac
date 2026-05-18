import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/api"; // Ajuste o caminho se necessário para achar o seu api.js
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import sapoImg from "../../assets/img/sapobone.png";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Pega o token enviado na URL pelo Java
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      alert("Preencha todos os campos!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      setLoading(true);

      // Envia a nova senha para o endpoint correto do seu Back-end no Render
      const response = await fetch(
        `${baseUrl}/auth/reset-password?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: newPassword }),
        },
      );

      if (response.ok) {
        alert("Senha redefinida com sucesso!");
        navigate("/login"); // Redireciona para o login
      } else {
        alert("Token inválido ou expirado. Solicite uma nova recuperação.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="PageWrapper">
      <div className="App login-container">
        <Header />
        <main
          style={{
            padding: "100px 20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="login-box"
            style={{
              display: "flex",
              background: "#001224",
              padding: "40px",
              borderRadius: "12px",
              maxWidth: "800px",
              width: "100%",
            }}
          >
            <div
              className="login-image-container"
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={sapoImg} alt="Sapo" style={{ maxWidth: "80% " }} />
            </div>

            <div
              className="login-form-container"
              style={{ flex: 1, paddingLeft: "40px", color: "#fff" }}
            >
              <h1 className="login-title">DIGITE A NOVA SENHA</h1>
              <div className="title-underline"></div>

              <form
                className="login-form"
                onSubmit={handleSubmit}
                style={{ marginTop: "20px" }}
              >
                <div
                  className="login-input-group"
                  style={{ marginBottom: "15px" }}
                >
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    NOVA SENHA
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Digite a nova senha"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #00eaff",
                      background: "transparent",
                      color: "#fff",
                    }}
                  />
                </div>

                <div
                  className="login-input-group"
                  style={{ marginBottom: "20px" }}
                >
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    CONFIRMAR SENHA
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme a nova senha"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #00eaff",
                      background: "transparent",
                      color: "#fff",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-login"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#00eaff",
                    color: "#000",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {loading ? "ALTERANDO..." : "REDEFINIR SENHA"}
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default ResetPassword;
