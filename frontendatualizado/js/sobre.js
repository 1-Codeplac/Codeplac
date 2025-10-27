document.addEventListener('DOMContentLoaded', function () {
    const scrollButton = document.getElementById('scrollDownButton');

    if (scrollButton) {
        scrollButton.addEventListener('click', function () {

            // Obtém a posição Y atual da tela
            const currentPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

            // Define a distância (85% da tela atual)
            const scrollDistance = window.innerHeight * 0.85;

            // Calcula a nova posição de destino
            const newPosition = currentPosition + scrollDistance;

            // Executa a rolagem
            window.scrollTo({
                top: newPosition, // Rola para a nova posição absoluta
                behavior: 'smooth'
            });
        });
    } else {
        console.error("Erro: Elemento com ID 'scrollDownButton' não encontrado.");
    }
});