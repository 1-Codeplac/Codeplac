// --- Lógica do Cronômetro ---

// Define a data final do cronômetro: 26 de Outubro de 2025, 00:00:00
const endDate = new Date("October 26, 2025 00:00:00").getTime();

// Pega os elementos do DOM
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Função para formatar números (adiciona um zero à esquerda se for menor que 10)
function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

// Função principal de contagem regressiva
function countdown() {
    const now = new Date().getTime();
    const distance = endDate - now;

    // Cálculo do tempo em dias, horas, minutos e segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Atualiza o DOM
    if (distance > 0) {
        daysEl.innerHTML = formatTime(days);
        hoursEl.innerHTML = formatTime(hours);
        minutesEl.innerHTML = formatTime(minutes);
        secondsEl.innerHTML = formatTime(seconds);
    } else {
        // Se a data já passou
        daysEl.innerHTML = '00';
        hoursEl.innerHTML = '00';
        minutesEl.innerHTML = '00';
        secondsEl.innerHTML = '00';
        clearInterval(interval); // Para o cronômetro
        // Você pode adicionar um código aqui para mostrar uma mensagem de "Evento Iniciado!"
    }
}

// Chama a função countdown() a cada 1 segundo (1000ms)
const interval = setInterval(countdown, 1000);

// Executa uma vez ao carregar para evitar atraso inicial
countdown();


// --- Lógica da Seta de Rolagem ---
const scrollArrow = document.getElementById('scrollArrow');

window.addEventListener('scroll', () => {
    // Esconde a seta se o usuário já rolou 100px para baixo
    if (window.scrollY > 100) {
        scrollArrow.classList.add('hidden');
    } else {
        scrollArrow.classList.remove('hidden');
    }
});

// Suaviza a rolagem ao clicar na seta
document.getElementById('scrollArrow').addEventListener('click', function(e) {
    e.preventDefault(); // Impede o comportamento padrão do link (salto seco)
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth' // Rolagem suave
        });
    }
});