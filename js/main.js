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
  // Verificar se Swiper foi carregado
  if (typeof window.Swiper === 'undefined') {
    console.error('❌ Swiper.js não carregado! Verifique as URLs no HTML.');
    return;
  }
  
  // Verificar se o elemento existe
  if (!document.querySelector('.swiper')) {
    console.warn('⚠️ Elemento .swiper não encontrado no DOM.');
    return;
  }
  
  try {
    const swiper = new Swiper('.swiper', {
      // Configurações básicas
      loop: true,
      speed: 800,
      
      // Autoplay - 8 SEGUNDOS conforme solicitado
      autoplay: {
        delay: 8000, // ✅ 8 segundos (8000ms)
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      
      // Navegação
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
      // Paginação
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      
      // Efeitos de transição
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      
      // Teclado
      keyboard: {
        enabled: true,
      },
      
      // Acessibilidade
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
    // Fallback: mostrar todos os slides estáticos
    document.querySelectorAll('.swiper-slide').forEach(slide => {
      slide.style.display = 'block';
      slide.style.opacity = '0.8';
    });
  }
};

// Inicializar Swiper após o DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
  // ... outras inicializações ...
  
  // Inicializar Swiper com pequeno delay para garantir carregamento
  setTimeout(initSwiper, 100);
});

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
// FORMULÁRIO DE INSCRIÇÃO - REDIRECIONAMENTO PARA WHATSAPP
// ========================================
const initInscricaoForm = () => {
  const form = document.querySelector('#inscricao-form');
  if (!form) return;
  
  const messageBox = document.querySelector('#inscricao-message');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const nome = form.querySelector('#nome')?.value.trim();
    const idade = form.querySelector('#idade')?.value.trim();
    const modalidade = form.querySelector('#modalidade')?.value;
    const telefone = form.querySelector('#telefone')?.value.trim();
    const email = form.querySelector('#email')?.value.trim() || 'Não informado';
    const responsavel = form.querySelector('#responsavel')?.value.trim() || 'Não informado';
    const termos = form.querySelector('#termos')?.checked;
    
    // Validação básica
    if (!nome || !idade || !modalidade || !telefone || !termos) {
      showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }
    
    // Validar idade numérica
    if (isNaN(idade) || idade < 4 || idade > 120) {
      showMessage('Idade inválida. Informe entre 4 e 120 anos.', 'error');
      return;
    }
    
    // Validar compatibilidade idade/modalidade
    if ((modalidade === '5km' && idade < 14) || (modalidade === '10km' && idade < 18)) {
      showMessage('Idade não compatível com a modalidade selecionada.', 'error');
      return;
    }
    
    // Montar mensagem formatada para WhatsApp
    let mensagem = `*INSCRIÇÃO CONFIRMADA - 3º ANO TREINÃO AEESP*\n\n`;
    mensagem += `*DATA:* 22 de Março de 2026\n`;
    mensagem += `*LOCAL:* Fundo do Recinto Mário Zaparolli – Pompeia/SP\n\n`;
    mensagem += `*DADOS DO PARTICIPANTE:*\n`;
    mensagem += `Nome: ${nome}\n`;
    mensagem += `Idade: ${idade} anos\n`;
    mensagem += `Modalidade: ${getNomeModalidade(modalidade)}\n`;
    mensagem += `Telefone: ${telefone}\n`;
    mensagem += `E-mail: ${email}\n`;
    
    if (idade < 18 && modalidade !== 'caminhada' && modalidade !== 'kids') {
      mensagem += `Responsável: ${responsavel}\n`;
    }
    
    mensagem += `\n*Termos de responsabilidade aceitos*\n`;
    mensagem += `*Conectando pessoas, movimentando vidas e transformando histórias.*`;
    
    // Codificar para URL (SEM espaços!)
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Número do WhatsApp da AEESP: (14) 99846-6018 → 5514998466018
    const numeroWhatsApp = '5514998466018';
    
    // REDIRECIONAR PARA WHATSAPP (URL SEM ESPAÇOS!)
    window.location.href = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    // Mensagem de sucesso
    showMessage('✅ Inscrição enviada! Aguarde contato no WhatsApp para confirmação.', 'success');
    
    // Limpar formulário após 3 segundos
    setTimeout(() => {
      form.reset();
    }, 3000);
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

// Função auxiliar para nome da modalidade
function getNomeModalidade(codigo) {
  const modalidades = {
    '5km': 'Corrida 5km',
    '10km': 'Corrida 10km',
    'caminhada': 'Caminhada',
    'kids': 'Corrida Kids'
  };
  return modalidades[codigo] || codigo;
}

// Inicializar formulário
initInscricaoForm();
