window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recrutamentoForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Limpa todos os erros antes de validar
        document.querySelectorAll('.error').forEach(span => span.textContent = '');

        // Captura os valores
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const curso = document.getElementById('curso').value.trim();
        const vinculoValue = document.querySelector('input[name="vinculo"]:checked')?.value;
        const motivacao = document.getElementById('motivacao').value.trim();

        let hasError = false;

        // Validações básicas
        if (!nome) {
            document.getElementById('nomeError').textContent = 'Nome é obrigatório';
            hasError = true;
        }
        if (!email) {
            document.getElementById('emailError').textContent = 'E-mail é obrigatório';
            hasError = true;
        } else if (!validateEmail(email)) {
            document.getElementById('emailError').textContent = 'E-mail inválido';
            hasError = true;
        }
        if (!telefone) {
            document.getElementById('telefoneError').textContent = 'Telefone é obrigatório';
            hasError = true;
        }
        if (!curso) {
            document.getElementById('cursoError').textContent = 'Curso é obrigatório';
            hasError = true;
        }
        if (!vinculoValue) {
            document.getElementById('vinculoError').textContent = 'Vínculo é obrigatório';
            hasError = true;
        }
        if (!motivacao) {
            document.getElementById('motivacaoError').textContent = 'Motivação é obrigatória';
            hasError = true;
        }

        // Se houver erro, cancela o envio
        if (hasError) {
            return;
        }

        // Continua se estiver tudo certo
        const vinculo = vinculoValue === 'Sim' ? true : false;

        const formData = {
            nome,
            email,
            telefone,
            curso,
            vinculo,
            motivacao,
        };

        fetch("http://localhost:8080/juntese", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || "Erro ao enviar formulário, tente novamente");
                    });
                }
            })
            .then((data) => {
                alert("Formulário enviado com sucesso!");
                window.location.href = "/";
            })
            .catch((error) => {
                alert(error.message);
                console.error("Erro:", error);
            });
    });

    // Função simples para validar e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
