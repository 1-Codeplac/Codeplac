// A URL do seu backend deve ser o endpoint onde o serviço Spring Boot está rodando.
// Eu usei o URL que estava no seu log do Render.
const API_BASE_URL = "https://codeplac-vh95.onrender.com"; 

function cadastrar() {
    // Coleta os valores dos campos
    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const email = document.getElementById("email").value.trim();
    const cpfComMascara = document.getElementById("cpf").value.trim();
    const telefoneComMascara = document.getElementById("telefone").value.trim();
    const senha = document.getElementById("senha").value.trim();

    // Remove as máscaras para envio ao backend
    const cpf = cpfComMascara.replace(/\D/g, "");
    const telefone = telefoneComMascara.replace(/\D/g, "");

    // Validação dos campos
    if (
        !nome ||
        !sobrenome ||
        !email ||
        cpf.length !== 11 || // Garante que o CPF tem 11 dígitos (sem máscara)
        !telefone ||
        !senha
    ) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    const dadosCadastro = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        telefone: telefone, // Telefone sem máscara
        senha: senha,
        tipoUsuario: "PARTICIPANT",
        cpf: cpf // CPF sem máscara, 11 dígitos
    };

    // Envio ao servidor
    console.log("Dados de cadastro:", JSON.stringify(dadosCadastro));
    console.log(`Enviando requisição para: ${API_BASE_URL}/users/register`);

    fetch(`${API_BASE_URL}/users/register`, { // URL CORRIGIDA
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCadastro),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }

            // CORREÇÃO: Trata a resposta 500 que retorna HTML (o SyntaxError)
            if (response.status === 500) {
                // Se for 500, o servidor quebrou. Não tentamos ler JSON.
                throw new Error("Erro interno do servidor (Status 500). Verifique os logs do backend!");
            }

            // Tenta ler o corpo do erro como JSON para erros 4xx (400, 409, etc.)
            return response.json().then((err) => {
                console.error("Erro do servidor:", err);
                throw new Error(
                    err.message || err.error || "Falha no cadastro. Verifique os dados."
                );
            });
        })
        .then(() => {
            alert("Cadastro realizado com sucesso! Faça login.");
            window.location.href = "https://www.codeplac.com.br/login"; // Redirecionar para login
        })
        .catch((error) => {
            console.error("Erro na requisição:", error);
            alert(error.message);
        });
}

// Evento de clique no botão "Cadastrar"
document
    .getElementById("cadastrarButton")
    .addEventListener("click", function (event) {
        event.preventDefault();
        cadastrar();
    });

// Enviar ao pressionar "Enter"
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        cadastrar();
    }
});

// Função genérica para aplicar máscara no input
function aplicarMascara(event, pattern) {
    let valor = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    let resultado = "";

    // Padrão do CPF (000.000.000-00)
    if (pattern === "000.000.000-00") {
        if (valor.length > 3) resultado += valor.substring(0, 3) + ".";
        else resultado += valor.substring(0, 3);

        if (valor.length > 6) resultado += valor.substring(3, 6) + ".";
        else resultado += valor.substring(3, 6);

        if (valor.length > 9) resultado += valor.substring(6, 9) + "-";
        else resultado += valor.substring(6, 9);

        resultado += valor.substring(9, 11);
    }

    event.target.value = resultado.substring(0, pattern.length);
}

// Validação de CPF
document.getElementById("cpf").addEventListener("input", function (event) {
    aplicarMascara(event, "000.000.000-00");
    const cpf = event.target.value;
    const cpfSemMascara = cpf.replace(/\D/g, "");
    const erroCpf = document.getElementById("erroCpf");

    // Verifica se tem 11 dígitos numéricos
    if (cpfSemMascara.length !== 11) {
        event.target.classList.add("error");
        erroCpf.style.display = "block";
    } else {
        event.target.classList.remove("error");
        erroCpf.style.display = "none";
    }
});

// Validação de telefone
document.getElementById("telefone").addEventListener("input", function (event) {
    let telefone = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    // Lógica da máscara de telefone aprimorada
    let resultado = "";
    if (telefone.length > 0) resultado += "(" + telefone.substring(0, 2);
    if (telefone.length > 2) resultado += ") " + telefone.substring(2, 7);
    if (telefone.length > 7) resultado += "-" + telefone.substring(7, 11);

    // Limita o tamanho máximo da string para 15 caracteres (padrão (xx) xxxxx-xxxx)
    event.target.value = resultado.substring(0, 15);

    const erroTelefone = document.getElementById("erroTelefone");
    const telefonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/; // Valida 10 ou 11 dígitos

    if (!telefonePattern.test(event.target.value) && event.target.value.length >= 14) {
        event.target.classList.add("error");
        erroTelefone.style.display = "block"; // Exibe a mensagem de erro
    } else {
        event.target.classList.remove("error");
        erroTelefone.style.display = "none"; // Esconde a mensagem de erro
    }
});

// Validação de email
document.getElementById("email").addEventListener("input", function (event) {
    const email = event.target.value;
    const erroEmail = document.getElementById("erroEmail");
    const emailPattern = /^[\w\.\-]+@[a-zA-Z\d\.\-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        event.target.classList.add("error");
        erroEmail.style.display = "block";
    } else {
        event.target.classList.remove("error");
        erroEmail.style.display = "none";
    }
});