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
  if (typeof Swiper !== 'undefined' && document.querySelector('.swiper')) {
    try {
      const swiper = new Swiper('.swiper', {
        loop: true,
        speed: 800,
        autoplay: {
          delay: 10000,
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
    } catch (error) {
      console.error('Erro ao inicializar Swiper:', error);
    }
  }

  // ========================================
  // CONTROLE DE SOM E REPLAY DO VÍDEO DO BANNER
  // ========================================
  const initBannerVideoControls = () => {
    const video = document.getElementById('bannerVideo');
    const soundBtn = document.getElementById('toggleSoundBtn');
    const replayBtn = document.getElementById('replayBtn');
    
    // Só executa se todos os elementos existirem
    if (!video || !soundBtn || !replayBtn) return;
    
    const mutedIcon = soundBtn.querySelector('.sound-icon.muted');
    const unmutedIcon = soundBtn.querySelector('.sound-icon.unmuted');
    
    // Estado do som (persiste entre replays)
    let isSoundEnabled = false;
    
    // Animação de pulso inicial no botão de som
    soundBtn.classList.add('pulse');
    setTimeout(() => soundBtn.classList.remove('pulse'), 5000);
    
    // Atualiza ícones conforme estado do som
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
    
    // Mostra/Oculta botão de replay
    const toggleReplayButton = (show) => {
      if (show) {
        replayBtn.classList.add('visible');
      } else {
        replayBtn.classList.remove('visible');
      }
    };
    
    // Toggle de som
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isSoundEnabled = !isSoundEnabled;
      video.muted = !isSoundEnabled;
      updateSoundIcons();
    });
    
    // Clique no replay: reinicia vídeo mantendo estado do som
    replayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.currentTime = 0;
      video.muted = !isSoundEnabled;
      video.play().catch(err => {
        console.warn('Autoplay após replay pode exigir interação:', err);
      });
      toggleReplayButton(false);
    });
    
    // Ao terminar o vídeo: mostra replay
    video.addEventListener('ended', () => {
      toggleReplayButton(true);
      video.muted = !isSoundEnabled;
      updateSoundIcons();
    });
    
    // Ao iniciar (após replay): esconde replay
    video.addEventListener('play', () => {
      toggleReplayButton(false);
    });
    
    // Inicializa ícones
    updateSoundIcons();
  };
  
  initBannerVideoControls();

  // ========================================
  // CARREGAR VÍDEO DO YOUTUBE AO CLICAR (SEÇÃO TVR)
  // ========================================
  const initYoutubeVideoLoader = () => {
    const videoPreview = document.querySelector('.video-preview');
    if (!videoPreview) return;
    
    videoPreview.addEventListener('click', function(e) {
      // Evita recarregar se já foi carregado
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
      
      // Substitui conteúdo pelo iframe
      this.innerHTML = '';
      this.appendChild(iframe);
      this.classList.add('video-loaded');
    });
  };
  
  initYoutubeVideoLoader();

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
      document.body.style.overflow = 'hidden'; // Evita scroll do fundo
    };
    
    const closeLightbox = () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
      lightboxImg.src = '';
    };
    
    // Abrir ao clicar nas miniaturas
    triggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const src = this.getAttribute('data-src');
        const caption = this.querySelector('p')?.textContent || '';
        openLightbox(src, caption);
      });
    });
    
    // Fechar com botão X
    closeBtn?.addEventListener('click', closeLightbox);
    
    // Fechar ao clicar no fundo
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    // Fechar com tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
      }
    });
  };
  
  initLightbox();

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

  // Aplicar estado inicial e observar scroll
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
    
    // Chave PIX da AEESP
    const CHAVE_PIX = '64.661.923/0001-77';
    
    // Preencher valor sugerido
    sugestoes.forEach(btn => {
      btn.addEventListener('click', function() {
        const valor = this.getAttribute('data-valor');
        if (valorInput) valorInput.value = valor;
      });
    });
    
    // Copiar chave PIX
    if (btnCopy) {
      btnCopy.addEventListener('click', async () => {
        const valor = valorInput?.value || '0,00';
        const textoCopiar = `AEESP - Doação R$ ${valor}\nChave CNPJ: ${CHAVE_PIX}`;
        
        try {
          await navigator.clipboard.writeText(textoCopiar);
          showMessage('✅ Chave PIX copiada! Cole no seu app bancário.', 'success');
        } catch (err) {
          // Fallback para navegadores antigos
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
    
    // Exibir mensagem
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
  
  initPixForm();

  // ========================================
  // FORMULÁRIO DE INSCRIÇÃO - TREINÃO 2026
  // ========================================
  const initInscricaoForm = () => {
    const form = document.querySelector('.inscricao-form');
    if (!form) return;
    
    const messageBox = form.querySelector('.inscricao-message');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nome = form.querySelector('#nome')?.value.trim();
      const email = form.querySelector('#email')?.value.trim();
      const telefone = form.querySelector('#telefone')?.value.trim();
      const modalidade = form.querySelector('#modalidade')?.value;
      const termos = form.querySelector('#termos')?.checked;
      
      // Validação básica
      if (!nome || !email || !telefone || !modalidade) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }
      
      if (!termos) {
        showMessage('É necessário aceitar os termos para se inscrever.', 'error');
        return;
      }
      
      // Validação de e-mail simples
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage('Por favor, informe um e-mail válido.', 'error');
        return;
      }
      
      // Simulação de envio (substituir por fetch/API real)
      showMessage('✅ Inscrição realizada com sucesso! Verifique seu e-mail para confirmação.', 'success');
      form.reset();
      
      // Em produção: enviar para backend
      /*
      fetch('/api/inscricao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone, modalidade })
      })
      .then(res => res.json())
      .then(data => { /* sucesso */ })
      .catch(err => showMessage('Erro ao enviar inscrição. Tente novamente.', 'error'));
      */
    });
    
    function showMessage(text, type) {
      if (!messageBox) return;
      messageBox.textContent = text;
      messageBox.className = `inscricao-message ${type}`;
      messageBox.style.display = 'block';
      
      setTimeout(() => {
        messageBox.style.display = 'none';
      }, 5000);
    }
  };
  
  initInscricaoForm();

  // ========================================
  // FUNÇÕES AUXILIARES
  // ========================================
  
  // Nome completo da modalidade
  function getNomeModalidade(codigo) {
    const modalidades = {
      '5km': 'Corrida 5km',
      '10km': 'Corrida 10km',
      'caminhada': 'Caminhada',
      'kids': 'Corrida Kids'
    };
    return modalidades[codigo] || codigo;
  }
  
  // Máscara de telefone
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      if (value.length > 10) value = `${value.slice(0, 10)}-${value.slice(10)}`;
      e.target.value = value;
    });
  }
  
  // Máscara de valor monetário (para o PIX)
  const valorInput = document.getElementById('valor-doacao');
  if (valorInput) {
    valorInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      value = (value / 100).toFixed(2) + '';
      value = value.replace('.', ',');
      value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      e.target.value = value;
    });
  }
});
