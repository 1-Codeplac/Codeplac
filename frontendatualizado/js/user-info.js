window.addEventListener("DOMContentLoaded", getUserData);

function getUserData() {
    const userMatricula = localStorage.getItem("matricula");
    const userToken = localStorage.getItem("token");

    fetch(`https://codeplac-c7hy.onrender.com/users/${userMatricula}`, {
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
                throw new Error("Falha na busca de informações do usuário.");
            }
        })
        .then((data) => {
            renderUserData(data);
        })
        .catch((error) => {
            alert(error.message);
        });
}

function renderUserData({ nome, sobrenome, matricula, email, telefone, cpf }) {
    document.getElementById("userName").textContent = `${nome} ${sobrenome}`;
    document.getElementById("userRegistry").textContent = `Matrícula: ${matricula}`;
    document.getElementById("userEmail").textContent = `E-mail: ${email}`;
    document.getElementById("userPhone").textContent = `Telefone: ${telefone}`;
    document.getElementById("userCpf").textContent = `CPF: ${cpf}`;
}


document.getElementById('edit-button').addEventListener('click', function () {

    const modal = new bootstrap.Modal(document.getElementById('eventModal'));
    modal.show();


    const selectItems = document.querySelector('.select-items');
    const selectSelected = document.querySelector('.select-selected');

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
});


function toggleFormFields(selectedValue) {
    const newInfoInput = document.getElementById('newInfo');
    newInfoInput.value = ""; 

    switch (selectedValue) {
        case 'email':
            newInfoInput.setAttribute('placeholder', 'Digite seu e-mail');
            break;
        case 'nome':
            newInfoInput.setAttribute('placeholder', 'Digite seu nome');
            break;
        case 'sobrenome':
            newInfoInput.setAttribute('placeholder', 'Digite seu sobrenome');
            break;
        case 'telefone':
            newInfoInput.setAttribute('placeholder', 'Digite seu telefone');
            break;
        case 'senha':
            newInfoInput.setAttribute('placeholder', 'Digite sua nova senha');
            break;
        default:
            newInfoInput.setAttribute('placeholder', 'Digite a nova informação');
    }
}


document.addEventListener("click", function (event) {
    const selectItems = document.querySelector('.select-items');
    const selectSelected = document.querySelector('.select-selected');

    if (!selectSelected.contains(event.target) && !selectItems.contains(event.target)) {
        selectItems.classList.add('select-hide'); 
    }
});

document.getElementById('save-button').addEventListener('click', function () {
    const userMatricula = localStorage.getItem("matricula");
    const userToken = localStorage.getItem("token");
    const selectedField = document.querySelector('.select-selected').getAttribute('data-value');
    const newInfo = document.getElementById('newInfo').value;
    const currentPassword = document.getElementById('passwordInput').value;

    if (!newInfo || !currentPassword) {
        alert("Preencha todos os campos!");
        return;
    }

    const requestBody = {
        [selectedField]: newInfo,
        senha: currentPassword,
    };
	
	fetch(`https://codeplac-c7hy.onrender.com/modify/${userMatricula}?field=${selectedField}&password=${currentPassword}`, {
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
                throw new Error("Falha ao atualizar as informações. Verifique a senha e tente novamente.");
            }
        })
        .then((data) => {
            alert("Informação atualizada com sucesso!");
            renderUserData(data); 
            const modal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
            modal.hide(); 
        })
        .catch((error) => {
            alert(error.message);
        });
});
