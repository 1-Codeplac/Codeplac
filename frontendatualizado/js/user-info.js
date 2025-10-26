// user-info.js CORRIGIDO
const API_BASE_URL = "https://codeplac-vh95.onrender.com"; // Definindo a URL base

window.addEventListener("DOMContentLoaded", getUserData);

function getUserData() {
    //  ALTERADO: Pega o CPF do localStorage no lugar da matrícula
    const userIdentifier = localStorage.getItem("cpf");
    const userToken = localStorage.getItem("token");

    // Verifica se o CPF foi encontrado antes de fazer a requisição
    if (!userIdentifier) {
        console.error("CPF do usuário não encontrado. Certifique-se de que o usuário está logado.");
        // Opcional: Redirecionar para a página de login
        // window.location.href = "https://www.codeplac.com.br/login";
        return;
    }

    //  CORRIGIDO: Adicionado o endpoint '/users/' e usando o CPF
    fetch(`${API_BASE_URL}/users/${userIdentifier}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                // Tenta ler o erro do servidor se for um erro comum (4xx)
                return response.text().then(text => {
                    console.error(`Falha ao buscar dados (Status ${response.status}):`, text);
                    throw new Error("Falha na busca de informações do usuário. Acesso negado ou usuário não encontrado.");
                });
            }
        })
        .then((data) => {
            renderUserData(data);
        })
        .catch((error) => {
            console.error("Erro na requisição GET:", error);
            alert(error.message);
        });
}

function renderUserData({ nome, sobrenome, matricula, email, telefone, cpf }) {
    // Estes IDs foram verificados e estão corretos no HTML
    document.getElementById("userName").textContent = `${nome} ${sobrenome}`;
    document.getElementById("userRegistry").textContent = matricula ? `Matrícula: ${matricula}` : "Matrícula: N/A"; 
    document.getElementById("userEmail").textContent = `E-mail: ${email}`;
    document.getElementById("userPhone").textContent = `Telefone: ${telefone}`;
    document.getElementById("userCpf").textContent = `CPF: ${cpf}`;
}

// ---------------------------------------------------------------------------------

document.getElementById('edit-button').addEventListener('click', function () {
    const modal = new bootstrap.Modal(document.getElementById('eventModal'));
    modal.show();
    // Lógica do dropdown (select)
    const selectItems = document.querySelector('.select-items');
    const selectSelected = document.querySelector('.select-selected');

    if (selectSelected && selectItems) {
        selectSelected.addEventListener('click', function () {
            selectItems.classList.toggle('select-hide');
        });

        selectItems.querySelectorAll('div').forEach(function (item) {
            item.addEventListener('click', function () {
                const selectedValue = item.getAttribute('data-value');
                selectSelected.textContent = item.textContent;
                selectSelected.setAttribute('data-value', selectedValue);
                selectItems.classList.add('select-hide');
                toggleFormFields(selectedValue);
            });
        });
    }
});

function toggleFormFields(selectedValue) {
    const newInfoInput = document.getElementById('newInfo');
    if (!newInfoInput) return; // Segurança caso o input não exista
    
    newInfoInput.value = "";

    switch (selectedValue) {
        case 'email':
            newInfoInput.setAttribute('placeholder', 'Digite seu novo e-mail');
            break;
        case 'nome':
            newInfoInput.setAttribute('placeholder', 'Digite seu novo nome');
            break;
        case 'sobrenome':
            newInfoInput.setAttribute('placeholder', 'Digite seu novo sobrenome');
            break;
        case 'telefone':
            newInfoInput.setAttribute('placeholder', 'Digite seu novo telefone');
            break;
        case 'senha':
            newInfoInput.setAttribute('placeholder', 'Digite sua nova senha');
            break;
        default:
            newInfoInput.setAttribute('placeholder', 'Selecione e digite a nova informação');
    }
}

document.addEventListener("click", function (event) {
    const selectItems = document.querySelector('.select-items');
    const selectSelected = document.querySelector('.select-selected');

    if (selectSelected && selectItems && !selectSelected.contains(event.target) && !selectItems.contains(event.target)) {
        selectItems.classList.add('select-hide');
    }
});

// ---------------------------------------------------------------------------------

document.getElementById('save-button').addEventListener('click', function () {
    const userIdentifier = localStorage.getItem("cpf");
    const userToken = localStorage.getItem("token");
    const selectElement = document.querySelector('.select-selected');

    if (!selectElement) {
        alert("Erro: Elemento de seleção não encontrado.");
        return;
    }

    const selectedField = selectElement.getAttribute('data-value');
    const newInfo = document.getElementById('newInfo').value;

    // CORREÇÃO APLICADA: Usando o ID 'password' do HTML
    const currentPassword = document.getElementById('password').value;

    if (!newInfo || !currentPassword || !selectedField || selectedField === 'Selecione uma opção') {
        alert("Preencha todos os campos e selecione o campo a ser alterado!");
        return;
    }

    // Se o campo selecionado for 'cpf', removemos a máscara antes de enviar
    const infoToSend = (selectedField === 'cpf') ? newInfo.replace(/\D/g, "") : newInfo;

    const requestBody = {
        [selectedField]: infoToSend, // Usa o valor sem máscara se for CPF
        senha: currentPassword,
    };

    // CORRIGIDO: Usando a nova URL base e o CPF
    fetch(`${API_BASE_URL}/modify/${userIdentifier}?field=${selectedField}&password=${currentPassword}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(requestBody),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().catch(() => response.text()).then(errorData => {
                    const errorMessage = (typeof errorData === 'object' && errorData.message) ? errorData.message : 
                                        (typeof errorData === 'string' ? errorData :
                                        "Falha ao atualizar as informações. Verifique a senha e tente novamente.");
                    throw new Error(errorMessage);
                });
            }
        })
        .then((data) => {
            alert("Informação atualizada com sucesso! A página será recarregada.");
            // Recarrega os dados do usuário para refletir a mudança
            getUserData();
            // Fecha o modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
            if (modal) {
                modal.hide();
            }
        })
        .catch((error) => {
            console.error("Erro na requisição PUT:", error);
            alert(error.message);
        });
});