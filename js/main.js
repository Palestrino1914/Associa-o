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
          delay: 10000,                 // Tempo entre slides (10 segundos)
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
  
  // ========================================
  // FORMULÁRIO DE INSCRIÇÃO DO EVENTO TREINÃO
  // ========================================
  const inscricaoForm = document.getElementById('inscricao-form');
  if (inscricaoForm) {
    inscricaoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validação dos campos
      const nome = document.getElementById('nome').value.trim();
      const idade = document.getElementById('idade').value.trim();
      const modalidade = document.getElementById('modalidade').value;
      const telefone = document.getElementById('telefone').value.trim();
      const termos = document.getElementById('termos').checked;
      
      // Verificar se todos os campos obrigatórios estão preenchidos
      if (!nome || !idade || !modalidade || !telefone || !termos) {
        mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }
      
      // Verificar se a idade é um número válido
      if (isNaN(idade) || idade < 4 || idade > 120) {
        mostrarMensagem('Por favor, informe uma idade válida entre 4 e 120 anos.', 'error');
        return;
      }
      
      // Verificar se o telefone tem pelo menos 10 dígitos
      const telefoneLimpo = telefone.replace(/\D/g, '');
      if (telefoneLimpo.length < 10) {
        mostrarMensagem('Por favor, informe um telefone válido com DDD.', 'error');
        return;
      }
      
      // Verificar se a idade é compatível com a modalidade
      if ((modalidade === '5km' && idade < 14) || (modalidade === '10km' && idade < 18)) {
        mostrarMensagem('Idade não compatível com a modalidade selecionada.', 'error');
        return;
      }
      
      // Montar a mensagem para o WhatsApp
      const email = document.getElementById('email').value.trim() || 'Não informado';
      const responsavel = document.getElementById('responsavel').value.trim() || 'Não informado';
      
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
      
      // Codificar para URL
      const mensagemCodificada = encodeURIComponent(mensagem);
      
      // Número do WhatsApp da organização: (14) 99846-6018
      const numeroWhatsApp = '5514998466018';
      
      // URL do WhatsApp - CORRIGIDA (SEM ESPAÇOS!)
      const url = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
      
      // Redirecionar para WhatsApp
      window.open(url, '_blank');
      
      // Exibir mensagem de sucesso
      mostrarMensagem('Inscrição enviada! Aguarde contato no WhatsApp para confirmação.', 'success');
      
      // Opcional: Limpar o formulário após o envio
      // this.reset();
    });
  }
  
  // ========================================
  // FUNÇÕES AUXILIARES
  // ========================================
  
  // Função para exibir mensagens de feedback
  function mostrarMensagem(texto, tipo) {
    const messageDiv = document.getElementById('inscricao-message');
    if (messageDiv) {
      messageDiv.className = `inscricao-message ${tipo}`;
      messageDiv.textContent = texto;
      
      // Rolar até a mensagem
      messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Fechar automaticamente após 10 segundos para mensagens de sucesso
      if (tipo === 'success') {
        setTimeout(() => {
          messageDiv.style.display = 'none';
        }, 10000);
      }
    }
  }
  
  // Função para obter nome completo da modalidade
  function getNomeModalidade(codigo) {
    const modalidades = {
      '5km': 'Corrida 5km',
      '10km': 'Corrida 10km',
      'caminhada': 'Caminhada',
      'kids': 'Corrida Kids'
    };
    return modalidades[codigo] || codigo;
  }
  
  // ========================================
  // MÁSCARA DE TELEFONE (OPCIONAL)
  // ========================================
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      // Limitar a 11 dígitos (DDD + 9 dígitos)
      if (value.length > 11) {
        value = value.slice(0, 11);
      }
      
      // Aplicar máscara (XX) XXXXX-XXXX
      if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      if (value.length > 10) {
        value = `${value.slice(0, 10)}-${value.slice(10)}`;
      }
      
      e.target.value = value;
    });
  }
});
