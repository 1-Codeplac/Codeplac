document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado e analisado.");

    const form = document.getElementById("formJuizCodigo");

    if (!form) {
        console.error("Formulário 'formJuizCodigo' não encontrado!");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("Evento de envio do formulário 'Juiz Código' disparado.");

        // Limpa mensagens de erro anteriores
        document.querySelectorAll('.error').forEach(span => span.textContent = '');

        const nomeEquipe = document.getElementById('nomeEquipe')?.value.trim();
        const numeroCodigo = document.getElementById('numeroCodigo')?.value.trim();
        const nomeLider = document.getElementById('nomeLider')?.value.trim();
        const codigo = document.getElementById('codigo')?.value.trim();

        let hasError = false;

        const showError = (fieldId, message) => {
            let errorSpan = document.getElementById(fieldId + 'Error');
            if (!errorSpan) {
                errorSpan = document.createElement('span');
                errorSpan.id = fieldId + 'Error';
                errorSpan.className = 'error';
                const field = document.getElementById(fieldId);
                if (field && field.parentNode) {
                    field.parentNode.insertBefore(errorSpan, field.nextSibling);
                }
            }
            errorSpan.textContent = message;
        };

        if (!nomeEquipe) {
            showError('nomeEquipe', 'Nome da equipe é obrigatório');
            hasError = true;
        }
        if (!numeroCodigo) {
            showError('numeroCodigo', 'Número do código é obrigatório');
            hasError = true;
        } else if (isNaN(numeroCodigo) || parseInt(numeroCodigo) <= 0) {
            showError('numeroCodigo', 'Número do código deve ser um número válido');
            hasError = true;
        }
        if (!nomeLider) {
            showError('nomeLider', 'Nome do líder é obrigatório');
            hasError = true;
        }
        if (!codigo) {
            showError('codigo', 'O código é obrigatório');
            hasError = true;
        }

        if (hasError) {
            console.warn("Formulário contém erros. Envio cancelado.");
            return;
        }

        const dados = {
            nomeEquipe,
            numeroCodigo: parseInt(numeroCodigo),
            nomeLider,
            codigo
        };

        console.log("Dados formatados para envio:", dados);

        try {
            const response = await fetch("https://codeplac-vt5q.onrender.com/juizcodigo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
});


            console.log("Resposta recebida:", response.status);

            if (response.ok) {
                const result = await response.json();
                console.log("Sucesso:", result);
                alert("Código enviado com sucesso!");
                form.reset();
            } else {
                const erro = await response.json();
                console.error("Erro ao enviar código:", erro);
                alert(`Erro ao enviar: ${erro.message || 'Erro inesperado.'}`);
            }
        } catch (err) {
            console.error("Erro na requisição:", err);
            alert("Erro de conexão. Tente novamente mais tarde.");
        }
    });
});
