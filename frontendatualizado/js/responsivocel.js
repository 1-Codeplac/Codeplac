const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const menu = document.querySelector('.ul');

// Ao clicar no ícone de abrir o menu
menuIcon.addEventListener('click', function() {
  // Mostra o menu e oculta o ícone de abrir
  menu.classList.add('open'); 
  closeIcon.style.display = 'block'; 
  menuIcon.style.display = 'none';  
});

// Ao clicar no ícone de fechar o menu
closeIcon.addEventListener('click', function() {
  // Esconde o menu e o ícone de fechar
  menu.classList.remove('open'); 
  closeIcon.style.display = 'none'; 
  menuIcon.style.display = 'block'; 
});

// Seleciona todos os dropdowns
document.querySelectorAll('.dropdown > a').forEach(dropdown => {
  dropdown.addEventListener('click', function (e) {
      e.preventDefault(); 
      const submenu = this.nextElementSibling; 

      // Alterna a visibilidade do submenu
      if (submenu.style.display === 'flex') {
          submenu.style.display = 'none';
      } else {
          // Fecha todos os outros dropdowns antes de abrir o atual
          document.querySelectorAll('.dropdown-menu').forEach(menu => {
              menu.style.display = 'none';
          });

          submenu.style.display = 'flex'; 
      }
  });
});

// Fecha o dropdown se clicar fora dele
document.addEventListener('click', function (e) {
  if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.style.display = 'none';
      });
  }
});
