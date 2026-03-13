// IMPORTAÇÕES
import React from "react";
import "../css/cookies.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";

// COMPONENTE PRINCIPAL
export default function Cookies() {
  return (
    <div className="cookies-page">
      <Header />

      <main className="cookies-container">
        <section className="cookies-card-principal">
          <h1 className="cookies-titulo-neon">
            Política de Cookies da CodeplaC
          </h1>
          <p className="cookies-data">Última atualização: 22/09/2024</p>
          <hr className="cookies-divisor" />

          <div className="cookies-texto-puro">
            <p>
              A presente Política de Cookies explica o que são cookies, como os
              utilizamos, como terceiros podem utilizar os cookies no nosso
              serviço e suas opções de controle de cookies. Ao utilizar nosso
              site, você consente com o uso de cookies.
            </p>

            <h2>O que são Cookies?</h2>
            <p>
              Cookies são pequenos arquivos de texto que são usados para
              armazenar pequenas informações. Eles são armazenados no seu
              dispositivo quando o site é carregado no seu navegador. Esses
              cookies nos ajudam a fazer o site funcionar corretamente, torná-lo
              mais seguro, oferecer análises, e entender como o site se comporta
              e para analisar o que funciona e onde é necessário melhorar.
            </p>

            <h2>Como a CodeplaC utiliza Cookies?</h2>
            <p>
              Quando você utiliza nosso site, podemos colocar os seguintes tipos
              de cookies em seu dispositivo:
            </p>
            <ul className="cookies-lista">
              <li>
                <strong>Cookies Necessários:</strong> Esses cookies são
                essenciais para o funcionamento do nosso site.
              </li>
              <li>
                <strong>Cookies de Preferência:</strong> Esses cookies permitem
                que o site se lembre de suas preferências.
              </li>
              <li>
                <strong>Cookies de Análise:</strong> Esses cookies nos ajudam a
                entender como os visitantes interagem com nosso site.
              </li>
              <li>
                <strong>Cookies de Publicidade:</strong> Esses cookies são
                usados para exibir anúncios relevantes para você.
              </li>
            </ul>

            <h2>Cookies de Terceiros</h2>
            <p>
              Além dos nossos próprios cookies, também podemos usar vários
              cookies de terceiros para relatar estatísticas de uso do serviço e
              fornecer suporte de análise. Esses cookies são gerenciados por
              entidades externas.
            </p>

            <h2>Como você pode controlar Cookies?</h2>
            <p>
              Se preferir evitar o uso de cookies, você deve primeiro desativar
              o uso de cookies no seu navegador. Para saber mais sobre como
              gerenciar cookies nos navegadores mais populares, visite os links
              a seguir:
            </p>

            <div className="cookies-links-grid">
              <a
                href="https://support.google.com/accounts/answer/32050"
                target="_blank"
                rel="noreferrer"
              >
                Google Chrome
              </a>
              <a
                href="https://support.mozilla.org/pt-BR/kb/cookies-informacoes-sites-armazenam-no-computador#:~:text=Em%20alguns%20navegadores%2C%20cada%20cookie,idioma%20preferido%20ou%20seu%20local."
                target="_blank"
                rel="noreferrer"
              >
                Mozilla Firefox
              </a>
              <a
                href="https://support.microsoft.com/pt-br/microsoft-edge/microsoft-edge-dados-de-navega%C3%A7%C3%A3o-e-privacidade-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd"
                target="_blank"
                rel="noreferrer"
              >
                Microsoft Edge
              </a>
              <a
                href="https://support.apple.com/pt-br/105082"
                target="_blank"
                rel="noreferrer"
              >
                Safari
              </a>
              <a
                href="https://help.opera.com/en/latest/web-preferences/"
                target="_blank"
                rel="noreferrer"
              >
                OperaGx
              </a>
            </div>

            <h2>Alterações nesta Política de Cookies</h2>
            <p>
              Podemos atualizar nossa Política de Cookies ocasionalmente.
              Avisaremos você sobre quaisquer mudanças publicando a nova
              Política de Cookies nesta página.
            </p>

            <div className="cookies-contato">
              <h2>Contato</h2>
              <p>
                Se você tiver alguma dúvida sobre esta Política de Cookies,
                entre em contato conosco pelo e-mail{" "}
                <strong>codeplacgroup@gmail.com</strong>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
