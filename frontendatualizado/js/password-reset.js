const API_BASE_URL = "https://codeplac-vh95.onrender.com/auth/login";

// ---------------------------------------------
// 1. Lógica para Solicitar o Link (página password.html)
// ---------------------------------------------
function handleForgotPasswordRequest() {
    const cpfInput = document.getElementById("cpfInput");
    const sendLinkButton = document.getElementById("sendLinkButton");

    if (!cpfInput || !sendLinkButton) return; // Sai se não estiver na página de solicitação

    sendLinkButton.addEventListener("click", async function(event) {
        event.preventDefault();

        // Remove caracteres não numéricos do CPF
        const cpf = cpfInput.value.trim().replace(/\D/g, "");

        if (cpf.length !== 11) {
            alert("Por favor, insira um CPF válido com 11 dígitos.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cpf: cpf }),
            });

            // O backend retorna 200/204.
            if (response.ok || response.status === 204) {
                alert("Sucesso! Se o CPF estiver cadastrado, um link de recuperação foi enviado para seu e-mail.");
                window.location.href = "login.html";
            } else {
                // Captura erro do backend (ex: CPF não encontrado, se o backend retornar 404)
                const errorData = await response.json().catch(() => ({ message: "Erro desconhecido." }));
                alert(`Erro na solicitação: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Erro de Rede:", error);
            alert("Erro de conexão. Tente novamente mais tarde.");
        }
    });
}

// ---------------------------------------------
// 2. Lógica para Redefinir a Senha (página reset-password.html)
// ---------------------------------------------
function handlePasswordReset() {
    const newPasswordInput = document.getElementById("newPassword");
    const submitResetButton = document.getElementById("submitResetButton");

    if (!newPasswordInput || !submitResetButton) return; // Sai se não estiver na página de redefinição

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); // Captura o token da URL

    if (!token) {
        alert("Token de recuperação não encontrado. O link pode estar incompleto.");
        return;
    }

    submitResetButton.addEventListener("click", async function(event) {
        event.preventDefault();

        const newPassword = newPasswordInput.value;

        if (newPassword.length < 8) {
            alert("A nova senha deve ter pelo menos 8 caracteres.");
            return;
        }

        try {
            // Envia a nova senha no corpo e o token como parâmetro
            const response = await fetch(`${API_BASE_URL}/auth/reset-password?token=${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword: newPassword }),
            });

            if (response.ok || response.status === 200) {
                alert("Senha redefinida com sucesso! Você já pode fazer login com a nova senha.");
                window.location.href = "login.html";
            } else {
                // Captura erro do backend (token inválido/expirado, etc.)
                const errorData = await response.json().catch(() => ({ message: "Erro desconhecido." }));
                alert(`Falha na redefinição de senha: ${errorData.message || 'Token inválido ou expirado.'}`);
            }
        } catch (error) {
            console.error("Erro de Rede:", error);
            alert("Erro de conexão. Tente novamente mais tarde.");
        }
    });
}

// Execução da lógica principal
document.addEventListener("DOMContentLoaded", function() {
    handleForgotPasswordRequest();
    handlePasswordReset();
});