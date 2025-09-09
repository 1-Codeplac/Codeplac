document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado e analisado.");

    const form = document.getElementById('registrationForm');
    const submitButton = document.getElementById('submitButton');

    if (!form || !submitButton) {
        console.error("Formulário ou botão de envio não encontrado!");
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log("Evento de envio do formulário disparado.");

        const dados = {
            nome_equipe: document.getElementById('teamName')?.value.trim(),
            nome_lider: document.getElementById('leaderMatricula')?.value.trim(),
            membro1: document.getElementById('leaderMatricula')?.value.trim(),
            membro2: document.getElementById('member2')?.value.trim(),
            membro3: document.getElementById('member3')?.value.trim(),
            membro4: document.getElementById('member4')?.value.trim(),
            membro5: document.getElementById('member5')?.value.trim() || null,
            membro6: document.getElementById('member6')?.value.trim() || null,
        };

        console.log("Dados formatados para envio:", dados);

        // Validação
        if (!dados.nome_equipe || !dados.nome_lider || !dados.membro2 || !dados.membro3 || !dados.membro4) {
            alert("Por favor, preencha todos os campos obrigatórios (mínimo 4 membros).");
            return;
        }

        try {
            const response = await fetch("https://codeplac-c7hy.onrender.com/equipes/inscricao", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            console.log("Resposta recebida:", response.status);

            if (response.ok) {
                const result = await response.json();
                console.log("Sucesso:", result);
                alert("Equipe cadastrada com sucesso!");
                form.reset();
            } else {
                const erro = await response.json();
                console.error("Erro ao cadastrar:", erro);
                alert(`Erro ao cadastrar: ${erro.message || 'Erro inesperado.'}`);
            }
        } catch (err) {
            console.error("Erro na requisição:", err);
            alert("Erro de conexão. Tente novamente mais tarde.");
        }
    });

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("Botão de envio clicado.");
        form.dispatchEvent(new Event('submit'));
    });
});
