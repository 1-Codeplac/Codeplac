import React from "react";
import "../css/privacidade.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";

export default function Privacidade() {
  return (
    <div className="politica-page">
      <Header />

      <main className="politica-container">
        <section className="politica-card-principal">
          <h1 className="politica-titulo-neon">
            Política de Privacidade da CodeplaC
          </h1>
          <hr className="politica-divisor" />

          <div className="politica-texto-puro">
            <p>
              A privacidade e a segurança das informações dos nossos usuários
              são de extrema importância para nós. Esta Política de Privacidade
              tem como objetivo esclarecer de maneira transparente como
              coletamos, utilizamos, armazenamos, e protegemos as informações
              pessoais fornecidas durante a navegação e uso da plataforma
              CodeplaC. Garantimos que todas as práticas aqui descritas estão em
              conformidade com as legislações aplicáveis de proteção de dados.
            </p>

            <h2>1. Coleta de Informações</h2>
            <p>
              Coletamos diferentes tipos de informações para melhorar a
              experiência dos usuários na plataforma. As informações pessoais
              que coletamos podem incluir, mas não estão limitadas a: Nome
              completo, Endereço de e-mail, Dados relacionados à participação
              nas competições e eventos, como histórico de competições,
              pontuações e desempenho. Informações técnicas, como endereço IP,
              tipo de navegador, e dados de acesso. Essas informações podem ser
              fornecidas diretamente pelo usuário ao criar uma conta ou
              participar de eventos, ou coletadas automaticamente durante o uso
              da plataforma, por meio de cookies e outras tecnologias de
              rastreamento.
            </p>

            <h2>2. Uso de Informações</h2>
            <p>
              As informações coletadas têm diversos propósitos, todos voltados
              para otimizar a experiência dos nossos usuários. Os principais
              usos incluem: Facilitar a inscrição e participação em competições
              de programação. Comunicar-se com os usuários, fornecendo
              informações importantes, atualizações ou avisos relacionados à
              plataforma e às competições. Personalizar a experiência do usuário
              na plataforma, recomendando eventos ou funcionalidades com base no
              seu histórico e preferências. Melhorar o desempenho e a
              funcionalidade da plataforma por meio de análises e avaliações
              internas. Eventualmente, também poderemos utilizar as informações
              para a criação de relatórios estatísticos e estudos de caso,
              sempre garantindo a anonimização dos dados, de forma que nenhuma
              informação pessoal seja identificável.
            </p>

            <h2>3. Compartilhamento de Informações</h2>
            <p>
              Respeitamos a privacidade dos nossos usuários e não compartilhamos
              informações pessoais com terceiros, a menos que seja estritamente
              necessário para o funcionamento da plataforma ou quando houver
              consentimento explícito do usuário. As únicas situações em que o
              compartilhamento poderá ocorrer sem o consentimento prévio são:
              Quando exigido por lei ou por uma solicitação legal válida. Para
              proteger a segurança e integridade da plataforma, caso seja
              necessário prevenir fraudes, ataques cibernéticos ou outras
              ameaças. Com parceiros e fornecedores de serviços que necessitem
              dessas informações para realizar operações em nome da CodeplaC,
              sempre assegurando que tais parceiros sigam políticas de
              privacidade e segurança compatíveis.
            </p>

            <h2>4. Segurança</h2>
            <p>
              Implementamos rigorosas medidas de segurança físicas, eletrônicas
              e administrativas para proteger as informações pessoais dos nossos
              usuários contra acesso não autorizado, perda, destruição ou
              alteração. Entre essas medidas estão: Utilização de criptografia
              para proteger as informações durante a transmissão e
              armazenamento. Controle restrito de acesso a dados pessoais,
              garantindo que apenas funcionários autorizados tenham permissão
              para acessar essas informações. Monitoramento constante de
              atividades suspeitas na plataforma, com o objetivo de prevenir
              incidentes de segurança. Apesar de nossos esforços, é importante
              que os usuários também adotem práticas seguras, como o uso de
              senhas fortes e a não divulgação de suas credenciais de acesso a
              terceiros.
            </p>

            <h2>5. Direitos dos Usuários</h2>
            <p>
              A CodeplaC garante a todos os usuários o pleno controle sobre suas
              informações pessoais. Isso inclui o direito de: Acessar: Solicitar
              uma cópia das informações pessoais que armazenamos. Retificar:
              Solicitar a correção de qualquer dado pessoal incorreto ou
              desatualizado. Excluir: Solicitar a remoção completa dos dados
              pessoais do sistema, salvo em situações onde a retenção dos dados
              seja necessária para cumprimento de obrigações legais. Para
              exercer qualquer um desses direitos, os usuários podem entrar em
              contato com nossa equipe de suporte através do e-mail
              codeplacgroup@gmail.com, que responderá dentro de um prazo
              razoável.
            </p>

            <h2>6. Alterações na Política</h2>
            <p>
              Esta Política de Privacidade pode ser revisada e atualizada
              periodicamente para refletir mudanças em nossas práticas, bem como
              alterações nas legislações aplicáveis. Qualquer alteração será
              comunicada aos usuários por meio da plataforma e será
              disponibilizada nesta página. Recomendamos que os usuários revisem
              esta Política regularmente para se manterem informados.
            </p>

            <div className="politica-contato">
              <p>
                Se houver qualquer dúvida, sugestão ou solicitação relacionada a
                esta Política de Privacidade ou ao uso de suas informações
                pessoais, a nossa equipe de suporte está à disposição para
                ajudar. Entre em contato conosco pelo e-mail
                codeplacgroup@gmail.com.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
