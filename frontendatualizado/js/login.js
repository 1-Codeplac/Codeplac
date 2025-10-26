function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // 1. Remove a máscara do CPF (assumindo que o username é o CPF)
    const cpfSemMascara = username.replace(/\D/g, "");

    fetch("https://codeplac-vh95.onrender.com/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // Envia o CPF limpo para o backend
            cpf: cpfSemMascara,
            password: password,
        }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                // Tenta ler a mensagem de erro do servidor para dar um feedback melhor
                return response.json().catch(() => response.text()).then(errorData => {
                    const errorMessage = (typeof errorData === 'object' && errorData.message) ? errorData.message : 
                                        "Falha no login. Verifique suas credenciais.";
                    throw new Error(errorMessage);
                });
            }
        })
        .then((data) => {
            // 2. CORREÇÃO CRUCIAL: Salva o CPF limpo para ser usado como identificador
            localStorage.setItem("cpf", cpfSemMascara);

            // Mantém o token
            localStorage.setItem("token", data.token);

            //  Nota: A linha abaixo foi removida ou ignorada, pois não usará mais 'matricula'
            // localStorage.setItem("matricula", data.matricula);

            location.replace("https://www.codeplac.com.br");
        })
        .catch((error) => {
            console.error("Erro no processo de login:", error);
            alert(error.message);
        });
}

document
    .getElementById("loginButton")
    .addEventListener("click", function (event) {
        event.preventDefault();
        login();
    });

document.addEventListener("DOMContentLoaded", function () {
    const selected = document.querySelector(".select-selected");
    const items = document.querySelector(".select-items");

    selected.addEventListener("click", function () {
        items.classList.toggle("select-hide");
    });

    items.querySelectorAll("div").forEach((item) => {
        item.addEventListener("click", function () {
            selected.textContent = this.textContent; // Altera o texto do selecionado
            selected.setAttribute("data-value", this.getAttribute("data-value")); // Salva o valor selecionado
            items.classList.add("select-hide"); // Fecha as opções

            toggleFormFields(); // Chama a função para mostrar/ocultar os campos
        });
    });

    document.addEventListener("click", function (event) {
        if (!selected.contains(event.target) && !items.contains(event.target)) {
            items.classList.add("select-hide"); // Fecha o dropdown se clicar fora
        }
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        login();
    }
});

function toggleFormFields() {
    console.log("toggleFormFields chamado!");

}