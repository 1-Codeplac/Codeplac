import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/recrutamento.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import { recruitUser } from "../../services/recrutamentoService";

function Recrutamento() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    curso: "",
    vinculo: 1,
    motivacao: ""
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
  
    setFormData((prev) => ({ ...prev, [name]: name === "vinculo" ? Number(value) : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(loading) {
      return
    }

    if(Object.values(formData).some((value) => typeof value === "string" ? !value.trim() : value === null)) {
      alert("Preencha todos os campos!")
      return
    }

    try {
      setLoading(true)

      await recruitUser(formData)

      alert("Formulário enviado com sucesso!")
      navigate("/")
    } catch (error) {
      alert("Erro no recrutamento do usuário!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="recruitment-page-wrapper">
      <div className="recruitment-container">
        <Header />

        {/* Efeitos de Fundo Neon */}
        <div className="recruitment-bg-effects">
          <Circle size={500} variant="cyan" className="recruitment-circle-l" />
          <Circle
            size={400}
            variant="purple"
            className="recruitment-circle-r"
          />
        </div>

        <main className="recruitment-main-content">
          <section className="recruitment-card-box">
            <h2 className="recruitment-main-title">
              Formulário de Recrutamento
            </h2>
            <p className="recruitment-subtitle">
              JUNTE-SE AO CODEPLAC!
              <br />
              ABERTO PARA ALUNOS E NÃO-ALUNOS DO UNICEPLAC
            </p>

            <div className="recruitment-form-container">
              <form className="recruitment-form-element" onSubmit={handleSubmit}>
                <div className="recruitment-input-group">
                  <label>Nome:</label>
                  <input 
                    type="text" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="recruitment-input-group">
                  <label>E-mail:</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="recruitment-input-group">
                  <label>Telefone:</label>
                  <input 
                    type="tel" 
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="recruitment-input-group">
                  <label>Curso:</label>
                  <input 
                    type="text" 
                    name="curso"
                    value={formData.curso}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="recruitment-radio-section">
                  <p>Você é aluno do Uniceplac?</p>
                  <div className="recruitment-radio-group">
                    <label>
                      <input 
                        type="radio" 
                        name="vinculo" 
                        value="1" 
                        onChange={handleInputChange} 
                        checked={formData.vinculo === 1}
                      /> 
                      Sim
                    </label>
                    <label>
                      <input 
                        type="radio"
                        name="vinculo"
                        value="0"
                        onChange={handleInputChange}
                        checked={formData.vinculo === 0}
                      /> 
                      Não
                    </label>
                  </div>
                </div>

                <div className="recruitment-input-group">
                  <label>Motivação:</label>
                  <textarea 
                    rows="5"
                    name="motivacao"
                    value={formData.motivacao}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <button type="submit" className="recruitment-btn-submit" disabled={loading}>
                  ENVIAR
                </button>
              </form>

              <div className="recruitment-footer-links">
                <a href="/">VOLTAR PARA A PÁGINA PRINCIPAL</a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Recrutamento;
