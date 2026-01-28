// ========================================
// main.js - JavaScript principal do site
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  
  // ========================================
  // DESTACAR LINK ATIVO NO MENU DE NAVEGAÇÃO
  // ========================================
  const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentLocation || (currentLocation === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ========================================
  // INICIALIZAR SWIPER.JS - BANNER SLIDER
  // ========================================
  if (typeof Swiper !== 'undefined' && document.querySelector('.swiper')) {
    try {
      const swiper = new Swiper('.swiper', {
        // Configurações básicas
        loop: true,                    // Loop infinito
        speed: 800,                    // Velocidade da transição (ms)
        
        // Autoplay
        autoplay: {
          delay: 5000,                 // Tempo entre slides (5 segundos)
          disableOnInteraction: false, // Continua após interação do usuário
          pauseOnMouseEnter: true,     // Pausa ao passar o mouse
        },
        
        // Navegação
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        
        // Paginação
        pagination: {
          el: '.swiper-pagination',
          clickable: true,             // Permitir clique nas bolinhas
          dynamicBullets: true,        // Bolinhas dinâmicas
        },
        
        // Efeitos de transição
        effect: 'fade',                // Efeito de fade entre slides
        fadeEffect: {
          crossFade: true,             // Cross-fade suave
        },
        
        // Teclado
        keyboard: {
          enabled: true,               // Navegar com setas do teclado
        },
        
        // Acessibilidade
        a11y: {
          enabled: true,
          prevSlideMessage: 'Slide anterior',
          nextSlideMessage: 'Próximo slide',
        },
      });
    } catch (error) {
      console.error('Erro ao inicializar Swiper:', error);
    }
  }

  // ========================================
  // ANIMAÇÃO DOS CARDS AO ENTRAR NA VIEWPORT
  // ========================================
  const animateCards = () => {
    const cards = document.querySelectorAll('.section-card');
    
    cards.forEach(card => {
      const cardPosition = card.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (cardPosition < screenPosition) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  };

  // Aplicar animação inicial
  const cards = document.querySelectorAll('.section-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Verificar ao rolar a página
  window.addEventListener('scroll', animateCards);
  
  // Verificar ao carregar a página
  setTimeout(animateCards, 300);
});
