import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/inscricao.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import sapoImg from "../../assets/img/sapobone.png";
import { registerEquipe } from "../../services/equipeService";

function Inscricao() {
  const [formData, setFormData] = useState({
    nome_equipe: "",
    nome_lider: "",
    membro2: "",
    membro3: "",
    membro4: "",
    membro5: "",
    membro6: ""
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const {name, value} = e.target

    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const optionalFields = ["membro5", "membro6"]
    const hasEmptyField = Object.entries(formData)
      .filter(([key]) => !optionalFields.includes(key))
      .some(([_, value]) => !value.trim())

    if(hasEmptyField) {
      alert("Preencha todos os campos obrigatórios!")
      return
    }

    try {
      setLoading(true)
      
      await registerEquipe(formData)
      alert("Equipe registrada com sucesso!")

      navigate("/")
    } catch (error) {
      alert("Erro na inscrição da equipe!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="enroll-page-wrapper">
      <div className="enroll-container">
        <Header />

        {/* Efeitos de Fundo */}
        <div className="enroll-bg-effects">
          <Circle size={500} variant="cyan" className="enroll-circle-l" />
          <Circle size={400} variant="cyan" className="enroll-circle-r" />
        </div>

        <main className="enroll-main-content">
          <section className="enroll-card-box">
            <div className="enroll-flex-layout">
              {/* Lado Esquerdo: Mascote */}
              <div className="enroll-mascot-side">
                <img
                  src={sapoImg}
                  alt="Mascote"
                  className="enroll-mascot-img"
                />
              </div>

              {/* Lado Direito: Formulário de Inscrição */}
              <div className="enroll-form-side">
                <h1 className="enroll-main-title">INSCREVA SUA EQUIPE</h1>
                <div className="enroll-title-line"></div>

                <p className="enroll-text-info">
                  PREENCHA OS DADOS AO LADO PARA SE INSCREVER NO EVENTO E <br />
                  CRIAR SUA EQUIPE. É PERMITIDO ENTRE 4 A 6 PESSOAS POR EQUIPE.
                </p>

                <form className="enroll-form-element" onSubmit={handleSubmit}>
                  <div className="enroll-input-group">
                    <label className="enroll-label">NOME DA EQUIPE</label>
                    <input 
                      type="text" 
                      name="nome_equipe"
                      className="enroll-input" 
                      value={formData.nome_equipe}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Membros em grid ou lista */}
                  <div className="enroll-members-grid">
                    <div className="enroll-input-group">
                      <label className="enroll-label">LÍDER DA EQUIPE</label>
                      <input 
                        type="text" 
                        name="nome_lider"
                        className="enroll-input" 
                        value={formData.nome_lider}
                        onChange={handleInputChange}
                      />
                    </div>
                  
                    <div className="enroll-input-group">
                      <label className="enroll-label">MEMBRO 2</label>
                      <input 
                        type="text" 
                        name="membro2"
                        className="enroll-input" 
                        value={formData.membro2}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="enroll-input-group">
                      <label className="enroll-label">MEMBRO 3</label>
                      <input 
                        type="text" 
                        name="membro3"
                        className="enroll-input" 
                        value={formData.membro3}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="enroll-input-group">
                      <label className="enroll-label">MEMBRO 4</label>
                      <input 
                        type="text" 
                        name="membro4"
                        className="enroll-input" 
                        value={formData.membro4}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="enroll-input-group">
                      <label className="enroll-label">
                        MEMBRO 5 (OPCIONAL)
                      </label>
                      <input 
                        type="text" 
                        name="membro5"
                        className="enroll-input" 
                        value={formData.membro5}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="enroll-input-group">
                      <label className="enroll-label">
                        MEMBRO 6 (OPCIONAL)
                      </label>
                      <input 
                        type="text" 
                        name="membro6"
                        className="enroll-input" 
                        value={formData.membro6}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="enroll-btn-submit" disabled={loading}>
                    FAZER INSCRIÇÃO
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Inscricao;
