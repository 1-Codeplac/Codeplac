import React from "react";
import "../css/termos.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";

export default function Termos() {
  return (
    <div className="termos-page">
      <Header />

      <main className="termos-container">
        <section className="termos-card-principal">
          <h1 className="termos-titulo-neon">Termos de Uso da CodeplaC</h1>
          <p className="termos-data">Última atualização: 22/09/2024</p>
          <hr className="termos-divisor" />

          <div className="termos-texto-puro">
            <p>
              Estes Termos de Uso (“Termos”) regem o acesso e uso da plataforma
              CodeplaC, incluindo todos os serviços, recursos e conteúdos
              disponibilizados. Ao acessar ou usar a plataforma, você concorda
              em cumprir estes Termos. Se você não concorda com algum dos
              termos, não deverá utilizar a plataforma.
            </p>

            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar a CodeplaC, você declara que tem pelo menos 12 anos.
              Você concorda em cumprir todas as leis e regulamentos aplicáveis
              ao uso da plataforma.
            </p>

            <h2>2. Modificações dos Termos</h2>
            <p>
              A CodeplaC reserva-se o direito de modificar estes Termos a
              qualquer momento. As mudanças entrarão em vigor assim que
              publicadas na plataforma. Recomendamos que você revise
              periodicamente os Termos para se manter informado sobre quaisquer
              alterações.
            </p>

            <h2>3. Uso da Plataforma</h2>
            <p>
              <strong>3.1 Registro de Usuário:</strong> Para utilizar
              determinados recursos da plataforma, você pode precisar criar uma
              conta. Você concorda em fornecer informações precisas e
              atualizadas durante o registro e a mantê-las atualizadas.
            </p>
            <p>
              <strong>3.2 Responsabilidade da Conta:</strong> Você é responsável
              por manter a confidencialidade das informações da sua conta,
              incluindo sua senha, e por todas as atividades que ocorrem sob sua
              conta.
            </p>
            <p>
              <strong>3.3 Proibições:</strong> Você concorda em não utilizar a
              plataforma para:
              <br />• Realizar atividades ilegais ou fraudulentas.
              <br />• Transmitir qualquer conteúdo que seja ilegal, ofensivo,
              ameaçador ou difamatório.
              <br />• Interferir na segurança ou funcionamento da plataforma.
              <br />• Utilizar robôs, spiders ou ferramentas automáticas para
              acessar a plataforma de forma não autorizada.
            </p>

            <h2>4. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo, marcas registradas, logos e materiais da CodeplaC
              são de propriedade exclusiva da CodeplaC ou de seus licenciadores.
              Você concorda em não reproduzir, distribuir, modificar ou criar
              trabalhos derivados de qualquer conteúdo da plataforma sem
              autorização prévia por escrito.
            </p>

            <h2>5. Limitação de Responsabilidade</h2>
            <p>
              A CodeplaC não se responsabiliza por quaisquer danos diretos,
              indiretos, incidentais, consequenciais ou punitivos resultantes do
              uso ou incapacidade de uso da plataforma, mesmo que a CodeplaC
              tenha sido avisada da possibilidade de tais danos.
            </p>

            <h2>6. Indenização</h2>
            <p>
              Você concorda em indenizar, defender e isentar a CodeplaC, seus
              diretores, funcionários e agentes de qualquer reclamação, dano,
              perda ou despesa (incluindo honorários advocatícios) decorrentes
              de sua violação destes Termos ou de qualquer atividade relacionada
              ao uso da plataforma.
            </p>

            <h2>7. Links para Terceiros</h2>
            <p>
              A plataforma pode conter links para sites de terceiros. A CodeplaC
              não é responsável pelo conteúdo ou práticas de privacidade desses
              sites. O acesso a esses sites é por sua conta e risco.
            </p>

            <h2>8. Encerramento</h2>
            <p>
              A CodeplaC reserva-se o direito de suspender ou encerrar sua conta
              e acesso à plataforma, a qualquer momento, sem aviso prévio, se
              houver violação destes Termos ou por qualquer outra razão que a
              CodeplaC considere adequada.
            </p>

            <h2>9. Legislação Aplicável</h2>
            <p>
              Estes Termos serão regidos e interpretados de acordo com as leis
              do Brasil, independentemente de suas disposições sobre conflitos
              de leis.
            </p>

            <h2>10. Contato</h2>
            <p>
              Para perguntas sobre estes Termos, entre em contato conosco pelo
              e-mail codeplacgroup@gmail.com.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
