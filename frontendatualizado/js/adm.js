function showEventForm() {
    const eventForm = document.getElementById('event-form');
    eventForm.style.display = eventForm.style.display === 'none' ? 'block' : 'none';
}

function createNewEvent() {
    const eventTitle = document.getElementById('event-title')
    const eventDate = document.getElementById('event-date')
    const eventDescription = document.getElementById('event-description')
    const eventLocal = document.getElementById('event-local')
    const eventType = document.querySelector('input[name="event-type"]:checked')
    const eventPeriod = document.querySelector('input[name="event-period"]:checked')

    const newEventData = {
        nome: eventTitle.value,
        dataEvento: eventDate.value,
        descricao: eventDescription.value,
        lugar: eventLocal.value,
        tipoEvento: eventType.id.toUpperCase(),
        periodo: eventPeriod.id.toUpperCase()
    }

    const userToken = localStorage.getItem('token')

    fetch('https://codeplac-c7hy.onrender.com/event/create', {
        method:'POST', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(newEventData)
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Erro ao criar evento!')
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log(error.message)
    })
}

function saveUser(button) {
    const row = button.closest('tr'); 
    const select = row.querySelector('.role-select');
    const statusSpan = row.querySelector('.status');

    if (select.value === 'Admin') {
        statusSpan.classList.remove('member');
        statusSpan.classList.add('admin');
        statusSpan.textContent = 'Admin';
    } else {
        statusSpan.classList.remove('admin');
        statusSpan.classList.add('member');
        statusSpan.textContent = 'Membro';
    }
    
    alert('Alterações salvas com sucesso!');
}


function removeUser(button) {
    const row = button.closest('tr'); 
    row.remove(); 
    alert('Usuário removido com sucesso!');
}

function manageImages() {
    const galleryContainer = document.querySelector('.gallery-container');

    alert('Funcionalidade de gerenciamento de imagens ainda não implementada.');
}

