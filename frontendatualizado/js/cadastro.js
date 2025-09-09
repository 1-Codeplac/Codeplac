function cadastrar() {
	// Coleta os valores dos campos
	const matricula = document.getElementById("matricula").value.trim();
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
		!matricula ||
		!nome ||
		!sobrenome ||
		!email ||
		!cpf ||
		!telefone ||
		!senha
	) {
		alert("Por favor, preencha todos os campos!");
		return;
	}

    const dadosCadastro = {
    matricula: String(matricula).padStart(7, "0"), // Garante que a matrícula seja uma string de 7 caracteres
    nome: nome,
    sobrenome: sobrenome,
    email: email,
    telefone: telefone, // Telefone sem máscara
    senha: senha,
    tipoUsuario: "PARTICIPANT",
    cpf: cpf // CPF sem máscara
};

	// Envio ao servidor
	console.log("Dados de cadastro:", JSON.stringify(dadosCadastro));
	console.log("Enviando requisição para o servidor...");

	fetch("https://codeplac-c7hy.onrender.com/users/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dadosCadastro),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				return response.json().then((err) => {
					throw new Error(
						err.message || "Falha no cadastro. Verifique os dados."
					);
				});
			}
		})
		.then(() => {
			window.location.href = "https://www.codeplac.com.br/";
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
	const partes = pattern.match(/(\d+)/g);
	let resultado = "";
	let index = 0;

	for (const parte of partes) {
		const tamanho = parte.length;
		resultado += valor.slice(index, index + tamanho);
		index += tamanho;
		if (index < valor.length) {
			resultado += pattern.charAt(resultado.length); // Adiciona o separador
		}
	}

	event.target.value = resultado;
}

// Validação de CPF
document.getElementById("cpf").addEventListener("input", function (event) {
	aplicarMascara(event, "000.000.000-00");
	const cpf = event.target.value;
	const erroCpf = document.getElementById("erroCpf");
	const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

	if (!cpfPattern.test(cpf)) {
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

	if (telefone.length > 10) {
		telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"); // Para números com 11 dígitos
	} else {
		telefone = telefone.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3"); // Para números com 10 dígitos
	}

	// Atualiza o campo com a máscara correta
	event.target.value = telefone;

	const erroTelefone = document.getElementById("erroTelefone");
	const telefonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/; // Valida 10 ou 11 dígitos
	if (!telefonePattern.test(telefone)) {
		event.target.classList.add("error");
		erroTelefone.style.display = "block"; // Exibe a mensagem de erro
	} else {
		event.target.classList.remove("error");
		erroTelefone.style.display = "none"; // Esconde a mensagem de erro
	}
});

// Validação de matrícula
document
	.getElementById("matricula")
	.addEventListener("input", function (event) {
		const matricula = event.target.value;
		const erroMatricula = document.getElementById("erroMatricula");
		if (!/^\d{7}$/.test(matricula)) {
			event.target.classList.add("error");
			erroMatricula.style.display = "block";
		} else {
			event.target.classList.remove("error");
			erroMatricula.style.display = "none";
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
