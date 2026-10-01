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
        preventClicks: false,
        preventClicksPropagation: false,
        preventInteractionOnTransition: false,
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
        on: {
          touchStart: function(swiper, event) {
            const ignored = event.target.closest('[data-swiper-ignore]');
            if (ignored) {
              event.stopPropagation();
              return false;
            }
          },
          click: function(swiper, event) {
            const ignored = event.target.closest('[data-swiper-ignore]');
            if (ignored) {
              event.stopPropagation();
              return false;
            }
          }
        }
      });
      
      console.log('✅ Swiper inicializado com sucesso!');
      window.swiperInstance = swiper;
      return swiper;
      
    } catch (error) {
      console.error('❌ Erro ao inicializar Swiper:', error);
    }
  };

  // ========================================
  // CONTROLE DE SOM E REPLAY DO VÍDEO DO BANNER
  // ========================================
  const initBannerVideoControls = () => {
    const video = document.getElementById('bannerVideo');
    const soundBtn = document.getElementById('toggleSoundBtn');
    const replayBtn = document.getElementById('replayBtn');
    
    if (!video || !soundBtn || !replayBtn) return;
    
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
      if (show) replayBtn.classList.add('visible');
      else replayBtn.classList.remove('visible');
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
      video.play().catch(err => console.warn('Autoplay após replay pode exigir interação:', err));
      toggleReplayButton(false);
    });
    
    video.addEventListener('ended', () => {
      toggleReplayButton(true);
      video.muted = !isSoundEnabled;
      updateSoundIcons();
    });
    
    video.addEventListener('play', () => toggleReplayButton(false));
    updateSoundIcons();
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
      if (e.key === 'Escape' && lightbox.style.display === 'flex') closeLightbox();
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
    
    const valorInput = pixForm.querySelector('#pix-valor');
    const sugestoes = pixForm.querySelectorAll('.sugestoes button');
    const btnCopy = pixForm.querySelector('.btn-copy-pix');
    const messageBox = pixForm.querySelector('.pix-message');
    const CHAVE_PIX = '64.661.923/0001-77';
    
    sugestoes.forEach(btn => {
      btn.addEventListener('click', function() {
        const valor = this.textContent.replace('R$ ', '').trim();
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
      setTimeout(() => { messageBox.style.display = 'none'; }, 4000);
    }
  };

  // ========================================
  // FORMULÁRIO DE INSCRIÇÃO VIA WHATSAPP
  // ========================================
  const initWhatsAppForm = () => {
    const form = document.getElementById('form-inscricao-whatsapp');
    if (!form) return;
    
    const feedback = document.getElementById('feedback-mensagem');
    const WHATSAPP_NUMBER = '5514998089788';

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      feedback.className = 'feedback';
      feedback.textContent = '';
      
      const nome = document.getElementById('nome').value.trim();
      const nascimento = document.getElementById('nascimento').value;
      const genero = document.querySelector('input[name="genero"]:checked')?.value;
      const telefone = document.getElementById('telefone').value.trim();
      const email = document.getElementById('email').value.trim();
      const modalidade = document.getElementById('modalidade').value;
      const declaracaoSaude = document.getElementById('declaracao-saude').checked;
      const autorizacaoImagem = document.getElementById('autorizacao-imagem').checked;
      const lgpd = document.getElementById('lgpd').checked;
      
      if (!nome || !nascimento || !genero || !telefone || !modalidade) {
        feedback.textContent = '⚠️ Por favor, preencha todos os campos obrigatórios.';
        feedback.classList.add('error');
        return;
      }
      
      if (!declaracaoSaude || !autorizacaoImagem || !lgpd) {
        feedback.textContent = '❌ É necessário marcar todas as declarações de aceite.';
        feedback.classList.add('error');
        return;
      }
      
      const dataNascimento = new Date(nascimento);
      const hoje = new Date();
      let idade = hoje.getFullYear() - dataNascimento.getFullYear();
      const mes = hoje.getMonth() - dataNascimento.getMonth();
      if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) idade--;
      
      if (modalidade === 'Corrida Kids' && (idade < 4 || idade > 12)) {
        feedback.textContent = '❌ Corrida Kids é apenas para crianças de 4 a 12 anos.';
        feedback.classList.add('error');
        return;
      }
      
      if (modalidade === 'Corrida Super 5km' && idade < 14) {
        feedback.textContent = '❌ Corrida Super 5km exige mínimo de 14 anos.';
        feedback.classList.add('error');
        return;
      }
      
      const telefoneLimpo = telefone.replace(/\D/g, '');
      if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        feedback.textContent = '⚠️ Por favor, digite um número de WhatsApp válido.';
        feedback.classList.add('error');
        return;
      }
      
      const mensagem = `🎀 INSCRIÇÃO - OUTUBRO ROSA SUPER 5K\n\n👤 Nome: ${nome}\n📅 Data de Nascimento: ${nascimento.split('-').reverse().join('/')} (${idade} anos)\n👤 Gênero: ${genero}\n📱 WhatsApp: ${telefone}\n📧 E-mail: ${email || 'Não informado'}\n🏃 Modalidade: ${modalidade}\n\n✅ Declaração de Saúde: AUTORIZADO\n✅ Autorização de Imagem: AUTORIZADO\n✅ LGPD: ACEITO\n\n📅 Evento: 25 de Outubro de 2026\n⏰ Horário: 7:30h\n📍 Local: Recinto Mário Zaparolli - Pompéia/SP\n\nAguardo confirmação! 💚`;
      
      const mensagemCodificada = encodeURIComponent(mensagem);
      const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemCodificada}`;
      
      feedback.textContent = '✅ Redirecionando para o WhatsApp...';
      feedback.classList.add('success');
      
      setTimeout(() => {
        window.open(whatsappLink, '_blank');
      }, 1500);
    });
  };

  // ========================================
  // INICIALIZAR TODOS OS COMPONENTES
  // ========================================
  console.log('🚀 AEESP - Inicializando componentes do site...');
  
  initSwiper();
  initBannerVideoControls();
  initLightbox();
  initPixForm();
  initWhatsAppForm(); // <-- Adicionado aqui de forma correta
  
  console.log('✅ Todos os componentes inicializados!');
});// ========================================
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
  // INICIALIZAR SWIPER.JS - BANNER SLIDER (CORRIGIDO)
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
        
        // 🔧 ESSENCIAL: Permitir cliques em links/botões dentro dos slides
        preventClicks: false,
        preventClicksPropagation: false,
        preventInteractionOnTransition: false,
        
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
        
        // 🔧 HANDLERS PARA ELEMENTOS INTERATIVOS (UNIVERSAL)
        on: {
          // Intercepta toque em mobile
          touchStart: function(swiper, event) {
            const ignored = event.target.closest('[data-swiper-ignore]');
            if (ignored) {
              event.stopPropagation();
              return false;
            }
          },
          // Intercepta clique em desktop
          click: function(swiper, event) {
            const ignored = event.target.closest('[data-swiper-ignore]');
            if (ignored) {
              event.stopPropagation();
              return false;
            }
          },
          // Garante que o autoplay não interfira
          autoplayTimeLeft: function(swiper, time, progress) {
            // Não faz nada, apenas previne conflitos
          }
        }
      });
      
      console.log('✅ Swiper inicializado com sucesso!');
      
      // Expor instância globalmente para controle externo
      window.swiperInstance = swiper;
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
    
    const valorInput = pixForm.querySelector('#pix-valor');
    const sugestoes = pixForm.querySelectorAll('.sugestoes button');
    const btnCopy = pixForm.querySelector('.btn-copy-pix');
    const messageBox = pixForm.querySelector('.pix-message');
    
    const CHAVE_PIX = '64.661.923/0001-77';
    
    sugestoes.forEach(btn => {
      btn.addEventListener('click', function() {
        const valor = this.textContent.replace('R$ ', '').trim();
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
  
  console.log('✅ Todos os componentes inicializados!');
});


  <!-- Script do Formulário de Inscrição via WhatsApp -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('form-inscricao-whatsapp');
      const feedback = document.getElementById('feedback-mensagem');
      const WHATSAPP_NUMBER = '5514998089788'; // Número da AEESP

      if (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault(); // Impede o recarregamento da página
          
          // Limpa mensagens anteriores
          feedback.className = 'feedback';
          feedback.textContent = '';
          
          // Coleta os dados
          const nome = document.getElementById('nome').value.trim();
          const nascimento = document.getElementById('nascimento').value;
          const genero = document.querySelector('input[name="genero"]:checked')?.value;
          const telefone = document.getElementById('telefone').value.trim();
          const email = document.getElementById('email').value.trim();
          const modalidade = document.getElementById('modalidade').value;
          const declaracaoSaude = document.getElementById('declaracao-saude').checked;
          const autorizacaoImagem = document.getElementById('autorizacao-imagem').checked;
          const lgpd = document.getElementById('lgpd').checked;
          
          // 1. Validação de campos obrigatórios
          if (!nome || !nascimento || !genero || !telefone || !modalidade) {
            feedback.textContent = '⚠️ Por favor, preencha todos os campos obrigatórios.';
            feedback.classList.add('error');
            return;
          }
          
          // 2. Validação dos checkboxes (LGPD, Imagem, Saúde)
          if (!declaracaoSaude || !autorizacaoImagem || !lgpd) {
            feedback.textContent = '❌ É necessário marcar todas as declarações de aceite.';
            feedback.classList.add('error');
            return;
          }
          
          // 3. Cálculo da idade
          const dataNascimento = new Date(nascimento);
          const hoje = new Date();
          let idade = hoje.getFullYear() - dataNascimento.getFullYear();
          const mes = hoje.getMonth() - dataNascimento.getMonth();
          if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
            idade--;
          }
          
          // 4. Validação de idade por modalidade
          if (modalidade === 'Corrida Kids' && (idade < 4 || idade > 12)) {
            feedback.textContent = '❌ Corrida Kids é apenas para crianças de 4 a 12 anos.';
            feedback.classList.add('error');
            return;
          }
          
          if (modalidade === 'Corrida Super 5km' && idade < 14) {
            feedback.textContent = '❌ Corrida Super 5km exige mínimo de 14 anos.';
            feedback.classList.add('error');
            return;
          }
          
          // 5. Validação básica do telefone (apenas números)
          const telefoneLimpo = telefone.replace(/\D/g, '');
          if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
            feedback.textContent = '⚠️ Por favor, digite um número de WhatsApp válido.';
            feedback.classList.add('error');
            return;
          }
          
          // 6. Montagem da mensagem para o WhatsApp
          const mensagem = `🎀 INSCRIÇÃO - OUTUBRO ROSA SUPER 5K

👤 Nome: ${nome}
📅 Data de Nascimento: ${nascimento.split('-').reverse().join('/')} (${idade} anos)
👤 Gênero: ${genero}
📱 WhatsApp: ${telefone}
📧 E-mail: ${email || 'Não informado'}
🏃 Modalidade: ${modalidade}

✅ Declaração de Saúde: AUTORIZADO
✅ Autorização de Imagem: AUTORIZADO
✅ LGPD: ACEITO

📅 Evento: 25 de Outubro de 2026
⏰ Horário: 7:30h
📍 Local: Recinto Mário Zaparolli - Pompéia/SP

Aguardo confirmação! 💚`;
          
          // 7. Codificação e redirecionamento
          const mensagemCodificada = encodeURIComponent(mensagem);
          const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemCodificada}`;
          
          // Feedback visual de sucesso
          feedback.textContent = '✅ Redirecionando para o WhatsApp...';
          feedback.classList.add('success');
          
          // Abre o WhatsApp em nova aba após 1.5 segundos
          setTimeout(() => {
            window.open(whatsappLink, '_blank');
          }, 1500);
        });
      }
    });
  </script>
