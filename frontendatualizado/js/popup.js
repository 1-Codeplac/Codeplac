document.addEventListener('DOMContentLoaded', function () {
    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    const openModalBtn = document.getElementById('openModalBtn');

    const TEN_HOURS = 10 * 60 * 60 * 1000;
    const currentTime = Date.now();

    // Verifica se o usuário está logado
    const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('matricula');

    // Define uma chave diferente para cada tipo de usuário
    const storageKey = isLoggedIn ? 'lastModalLoggedTime' : 'lastModalAnonymousTime';
    const lastShown = localStorage.getItem(storageKey);

    // Se nunca mostrou ou já se passaram 10 horas, mostra o modal
    if (!lastShown || (currentTime - lastShown) > TEN_HOURS) {
        eventModal.show();
        localStorage.setItem(storageKey, currentTime);
    }

    // Caso haja botão manual para abrir o modal
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            eventModal.show();
            localStorage.setItem(storageKey, Date.now());
        });
    }
});
