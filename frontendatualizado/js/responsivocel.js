document.addEventListener('DOMContentLoaded', () => {
    // --- Seletores Principais ---
    // ATENÇÃO: Usando o seletor '.ul' que você tem no seu HTML
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const menu = document.querySelector('.ul'); 
    
    // --- Funções de Ajuda ---
    const isMobile = () => window.innerWidth <= 768;

    /**
     * Alterna o estado do menu Full-Screen.
     * @param {boolean} open - true para abrir, false para fechar.
     */
    const toggleMenu = (open) => {
        if (!menu || !menuIcon || !closeIcon) return; // Segurança

        if (open) {
            menu.classList.add('open'); 
            closeIcon.style.display = 'block'; 
            menuIcon.style.display = 'none';  
            
            // Ativa o CSS que desativa o scroll do fundo e rebaixa o z-index do conteúdo
            document.body.classList.add('menu-open');
        } else {
            menu.classList.remove('open'); 
            closeIcon.style.display = 'none'; 
            menuIcon.style.display = 'block'; 
            
            // Remove a classe que reativa o scroll
            document.body.classList.remove('menu-open');
            
            // Limpa todos os dropdowns internos ao fechar o menu principal
            document.querySelectorAll('.dropdown-menu').forEach(submenu => {
                submenu.classList.remove('dropdown-menu-mobile-open');
                submenu.closest('.dropdown').classList.remove('open');
            });
        }
    };


    // --- 1. Lógica de Abertura/Fechamento dos Ícones ---
    if (menuIcon && closeIcon) {
        menuIcon.addEventListener('click', () => toggleMenu(true));
        closeIcon.addEventListener('click', () => toggleMenu(false));
    }


    // --- 2. Lógica do Dropdown (Mobile-Only) ---
    document.querySelectorAll('.dropdown').forEach(dropdownItem => {
        const dropdownLink = dropdownItem.querySelector('.dropdown-link');
        const submenu = dropdownItem.querySelector('.dropdown-menu');

        if (dropdownLink && submenu) {
            
            dropdownLink.addEventListener('click', function (e) {
                
                // A Lógica de toggle SÓ RODA SE FOR MOBILE
                if (isMobile()) {
                    // Impede a navegação padrão (necessário se o href for # ou vazio)
                    e.preventDefault(); 
                    
                    const isOpen = submenu.classList.contains('dropdown-menu-mobile-open');
        
                    // 1. Fecha todos os outros dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(menuElement => {
                        if (menuElement !== submenu) { // Ignora o submenu atual
                            menuElement.classList.remove('dropdown-menu-mobile-open');
                            menuElement.closest('.dropdown').classList.remove('open');
                        }
                    });
        
                    // 2. Abre/Fecha o dropdown atual usando classes
                    if (!isOpen) {
                        submenu.classList.add('dropdown-menu-mobile-open');
                        dropdownItem.classList.add('open');
                    } else {
                        submenu.classList.remove('dropdown-menu-mobile-open');
                        dropdownItem.classList.remove('open');
                    }
                }
            });
        }
    });

    // --- 3. Lógica para Fechar o Menu ao Clicar em um Link Interno ---
    if (menu) {
        // Seleciona todos os links DENTRO do menu
        menu.querySelectorAll('a').forEach(link => {
            
            // O link é de navegação se NÃO for o pai de um dropdown (classe dropdown-link)
            if (!link.classList.contains('dropdown-link')) {
                link.addEventListener('click', () => {
                    if (isMobile()) {
                        // Fecha o menu full-screen ao clicar em um link de navegação
                        toggleMenu(false); 
                    }
                });
            }
        });
    }

});