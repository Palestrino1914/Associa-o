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
  if (document.querySelector('.swiper')) {
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
      
      // Teclado e mousewheel
      keyboard: {
        enabled: true,               // Navegar com setas do teclado
      },
      
      // Pré-carregamento de slides
      preloadImages: true,
      lazy: true,
      
      // Acessibilidade
      a11y: {
        enabled: true,
        prevSlideMessage: 'Slide anterior',
        nextSlideMessage: 'Próximo slide',
        firstSlideMessage: 'Este é o primeiro slide',
        lastSlideMessage: 'Este é o último slide',
      },
    });
  }

  // ========================================
  // ANIMAÇÃO SUAVE AO ROLAR PARA SEÇÕES
  // ========================================
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ========================================
  // ANIMAÇÃO AO ENTRAR NA VIEWPORT
  // ========================================
  const animateOnScroll = () => {
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
  document.querySelectorAll('.section-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Verificar ao rolar a página
  window.addEventListener('scroll', animateOnScroll);
  
  // Verificar ao carregar a página
  setTimeout(animateOnScroll, 300);
});
