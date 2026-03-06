// ========================================
// main.js - JavaScript principal do site AEESP
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
  const initSwiper = () => {
    if (typeof window.Swiper === 'undefined') {
      console.error('❌ Swiper.js não carregado! Verifique as URLs no HTML.');
      return;
    }
    
    if (!document.querySelector('.swiper')) {
      console.warn('⚠️ Elemento .swiper não encontrado no DOM.');
      return;
    }
    
    try {
      const swiper = new Swiper('.swiper', {
        loop: true,
        speed: 800,
        autoplay: {
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        effect: 'fade',
        fadeEffect: { crossFade: true },
        keyboard: { enabled: true },
        a11y: {
          enabled: true,
          prevSlideMessage: 'Slide anterior',
          nextSlideMessage: 'Próximo slide',
        },
      });
      
      console.log('✅ Swiper inicializado com sucesso!');
      return swiper;
      
    } catch (error) {
      console.error('❌ Erro ao inicializar Swiper:', error);
      document.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.style.display = 'block';
        slide.style.opacity = '0.8';
      });
    }
  };

  // ========================================
  // CONTROLE DE SOM E REPLAY DO VÍDEO DO BANNER
  // ========================================
  const initBannerVideoControls = () => {
    const video = document.getElementById('bannerVideo');
    const soundBtn = document.getElementById('toggleSoundBtn');
    const replayBtn = document.getElementById('replayBtn');
    
    if (!video || !soundBtn || !replayBtn) {
      console.log('ℹ️ Controles de vídeo não disponíveis');
      return;
    }
    
    const mutedIcon = soundBtn.querySelector('.sound-icon.muted');
    const unmutedIcon = soundBtn.querySelector('.sound-icon.unmuted');
    
    let isSoundEnabled = false;
    
    soundBtn.classList.add('pulse');
    setTimeout(() => soundBtn.classList.remove('pulse'), 5000);
    
    const updateSoundIcons = () => {
      if (isSoundEnabled) {
        if (mutedIcon) mutedIcon.style.display = 'none';
        if (unmutedIcon) unmutedIcon.style.display = 'inline';
        soundBtn.classList.remove('pulse');
      } else {
        if (mutedIcon) mutedIcon.style.display = 'inline';
        if (unmutedIcon) unmutedIcon.style.display = 'none';
        soundBtn.classList.add('pulse');
      }
    };
    
    const toggleReplayButton = (show) => {
      if (show) {
        replayBtn.classList.add('visible');
      } else {
        replayBtn.classList.remove('visible');
      }
    };
    
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isSoundEnabled = !isSoundEnabled;
      video.muted = !isSoundEnabled;
      updateSoundIcons();
    });
    
    replayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.currentTime = 0;
      video.muted = !isSoundEnabled;
      video.play().catch(err => {
        console.warn('Autoplay após replay pode exigir interação:', err);
      });
      toggleReplayButton(false);
    });
    
    video.addEventListener('ended', () => {
      toggleReplayButton(true);
      video.muted = !isSoundEnabled;
      updateSoundIcons();
    });
    
    video.addEventListener('play', () => {
      toggleReplayButton(false);
    });
    
    updateSoundIcons();
  };

  // ========================================
  // CARREGAR VÍDEO DO YOUTUBE AO CLICAR (SEÇÃO TVR)
  // ========================================
  const initYoutubeVideoLoader = () => {
    const videoPreview = document.querySelector('.video-preview');
    if (!videoPreview) return;
    
    videoPreview.addEventListener('click', function(e) {
      if (this.classList.contains('video-loaded')) return;
      
      const videoUrl = "https://www.youtube.com/embed/BQ5VcODlDIQ?autoplay=1&rel=0";
      const iframe = document.createElement('iframe');
      
      iframe.src = videoUrl;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.borderRadius = '12px';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      
      this.innerHTML = '';
      this.appendChild(iframe);
      this.classList.add('video-loaded');
      
      console.log('✅ Vídeo do YouTube carregado!');
    });
  };

  // ========================================
  // LIGHTBOX PARA GALERIA DE FOTOS
  // ========================================
  const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');
    
    const openLightbox = (src, caption) => {
      lightboxImg.src = src;
      lightboxCaption.textContent = caption || '';
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };
    
    const closeLightbox = () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
      lightboxImg.src = '';
    };
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const src = this.getAttribute('data-src');
        const caption = this.querySelector('p')?.textContent || '';
        openLightbox(src, caption);
      });
    });
    
    closeBtn?.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
      }
    });
  };

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

  const cards = document.querySelectorAll('.section-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', animateCards);
  setTimeout(animateCards, 300);

  // ========================================
  // FORMULÁRIO DE DOAÇÃO PIX
  // ========================================
  const initPixForm = () => {
    const pixForm = document.querySelector('.pix-form');
    if (!pixForm) return;
    
    const valorInput = pixForm.querySelector('#valor-doacao');
    const sugestoes = pixForm.querySelectorAll('.sugestoes button');
    const btnCopy = pixForm.querySelector('.btn-copy-pix');
    const messageBox = pixForm.querySelector('.pix-message');
    
    const CHAVE_PIX = '64.661.923/0001-77';
    
    sugestoes.forEach(btn => {
      btn.addEventListener('click', function() {
        const valor = this.getAttribute('data-valor');
        if (valorInput) valorInput.value = valor;
      });
    });
    
    if (btnCopy) {
      btnCopy.addEventListener('click', async () => {
        const valor = valorInput?.value || '0,00';
        const textoCopiar = `AEESP - Doação R$ ${valor}\nChave CNPJ: ${CHAVE_PIX}`;
        
        try {
          await navigator.clipboard.writeText(textoCopiar);
          showMessage('✅ Chave PIX copiada! Cole no seu app bancário.', 'success');
        } catch (err) {
          const textarea = document.createElement('textarea');
          textarea.value = textoCopiar;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showMessage('✅ Chave PIX copiada! Cole no seu app bancário.', 'success');
        }
      });
    }
    
    function showMessage(text, type) {
      if (!messageBox) return;
      messageBox.textContent = text;
      messageBox.className = `pix-message ${type}`;
      messageBox.style.display = 'block';
      
      setTimeout(() => {
        messageBox.style.display = 'none';
      }, 4000);
    }
  };

  // ========================================
  // INICIALIZAR TODOS OS COMPONENTES
  // ========================================
  console.log('🚀 AEESP - Inicializando componentes do site...');
  
  initSwiper();
  initBannerVideoControls();
  initYoutubeVideoLoader();
  initLightbox();
  initPixForm();
  // ✅ initInscricaoForm() REMOVIDO (inscrições encerradas)
  
  console.log('✅ Todos os componentes inicializados!');
});
