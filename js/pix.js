// ========================================
// pix.js - Geração e cópia de código PIX para AEESP
// ========================================

// Dados do PIX da AEESP
const pixData = {
  chave: '64661923000177', // CNPJ sem traço ou caracteres especiais
  nome: 'ASSOCIACAO ESPORTIVA EDUCACAO E SAUDE DE POMPEIA',
  cidade: 'POMPEIA',
  infoAdicional: 'Doacao para AEESP'
};

// Função para formatar valor em reais (ex: 25.50 → R$ 25,50)
function formatarValor(valor) {
  const num = parseFloat(valor);
  if (isNaN(num)) return '0,00';
  return num.toFixed(2).replace('.', ',');
}

// Função para gerar o código PIX estático com valor (Padrão EMV BR Code)
function gerarCodigoPix(valor) {
  const valorFormatado = parseFloat(valor).toFixed(2);
  
  // Campos obrigatórios do EMV QR Code
  const payloadFormatIndicator = '000201';
  const merchantCategoryCode = '52040000';
  const transactionCurrency = '5303986';
  const countryCode = '5802BR';
  
  // Merchant Account Information (MAI) - Tag 26
  // GUI + Chave PIX (CNPJ)
  const gui = '0014BR.GOV.BCB.PIX';
  const chavePix = pixData.chave;
  const chaveField = '01' + String(chavePix.length).padStart(2, '0') + chavePix;
  const maiContent = gui + chaveField;
  const maiTag = '26' + String(maiContent.length).padStart(2, '0') + maiContent;
  
  // Transaction Amount - Tag 54 (apenas se houver valor)
  let amountTag = '';
  if (valorFormatado && parseFloat(valorFormatado) > 0) {
    const amountValue = String(valorFormatado);
    amountTag = '54' + String(amountValue.length).padStart(2, '0') + amountValue;
  }
  
  // Merchant Name - Tag 59 (máx 25 caracteres)
  const merchantName = pixData.nome.substring(0, 25);
  const nameTag = '59' + String(merchantName.length).padStart(2, '0') + merchantName;
  
  // Merchant City - Tag 60 (máx 15 caracteres)
  const merchantCity = pixData.cidade.substring(0, 15);
  const cityTag = '60' + String(merchantCity.length).padStart(2, '0') + merchantCity;
  
  // Additional Data Field Template - Tag 62
  const additionalData = '62070503***';
  
  // Monta payload sem CRC
  let payload = payloadFormatIndicator + maiTag + merchantCategoryCode + 
                transactionCurrency + amountTag + countryCode + 
                nameTag + cityTag + additionalData;
  
  // Adiciona tag do CRC
  payload += '6304';
  
  // Calcula e adiciona CRC16-CCITT
  const crc = calcularCRC16(payload);
  
  return payload + crc;
}

// Função para calcular CRC16-CCITT (polinômio 0x1021)
function calcularCRC16(payload) {
  let crc = 0xFFFF;
  const poly = 0x1021;
  
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ poly;
      } else {
        crc <<= 1;
      }
      crc &= 0xFFFF;
    }
  }
  
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

// Função principal para copiar o PIX
function copiarPix() {
  const valorInput = document.getElementById('pix-valor');
  const valor = valorInput?.value?.replace(',', '.').trim();
  const messageDiv = document.getElementById('pix-message');
  
  // Validação do valor
  if (!valor || parseFloat(valor) <= 0 || isNaN(parseFloat(valor))) {
    showMessage('⚠️ Por favor, informe um valor válido (ex: 10, 25.50)', 'error', messageDiv);
    return;
  }
  
  try {
    const codigoPix = gerarCodigoPix(valor);
    
    // Copiar para clipboard (API moderna)
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(codigoPix)
        .then(() => {
          showMessage(`✅ PIX copiado! Cole no seu app de banco<br><strong>Valor: R$ ${formatarValor(valor)}</strong>`, 'success', messageDiv);
        })
        .catch(() => fallbackCopy(codigoPix, valor, messageDiv));
    } else {
      // Fallback para navegadores antigos
      fallbackCopy(codigoPix, valor, messageDiv);
    }
  } catch (error) {
    console.error('Erro na geração do PIX:', error);
    showMessage('❌ Erro ao gerar PIX. Tente novamente.', 'error', messageDiv);
  }
}

// Fallback para copy em navegadores antigos (execCommand)
function fallbackCopy(texto, valor, messageDiv) {
  const textarea = document.createElement('textarea');
  textarea.value = texto;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';
  textarea.setAttribute('readonly', '');
  textarea.setAttribute('aria-hidden', 'true');
  
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    const sucesso = document.execCommand('copy');
    if (sucesso) {
      showMessage(`✅ PIX copiado! Cole no seu app de banco<br><strong>Valor: R$ ${formatarValor(valor)}</strong>`, 'success', messageDiv);
    } else {
      throw new Error('execCommand falhou');
    }
  } catch (err) {
    console.error('Fallback copy falhou:', err);
    showMessage('❌ Não foi possível copiar automaticamente.<br><strong>Selecione e copie manualmente o código PIX.</strong>', 'error', messageDiv);
    
    // Mostra o código para cópia manual (opcional)
    const manualDiv = document.createElement('div');
    manualDiv.style.cssText = 'margin-top:10px;padding:10px;background:#fff;border:1px solid #ccc;border-radius:4px;font-family:monospace;font-size:11px;word-break:break-all;';
    manualDiv.textContent = texto;
    manualDiv.onclick = () => {
      textarea.value = texto;
      textarea.select();
      document.execCommand('copy');
      showMessage('✅ Copiado!', 'success', messageDiv);
    };
    manualDiv.title = 'Clique para copiar';
    messageDiv.appendChild(manualDiv);
  }
  
  document.body.removeChild(textarea);
}

// Exibir mensagem com animação
function showMessage(text, type, element) {
  if (!element) return;
  element.innerHTML = text;
  element.className = `pix-message ${type}`;
  element.style.display = 'block';
  
  // Remove mensagem após 5 segundos
  setTimeout(() => {
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      element.style.display = 'none';
      element.style.opacity = '1';
    }, 300);
  }, 5000);
}

// Função para preencher valor ao clicar nas sugestões
function preencherValor(sugestao) {
  const valorInput = document.getElementById('pix-valor');
  if (valorInput) {
    valorInput.value = sugestao;
    valorInput.focus();
    
    // Feedback visual
    valorInput.style.borderColor = '#22c55e';
    setTimeout(() => {
      valorInput.style.borderColor = '#004d26';
    }, 300);
  }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  const valorInput = document.getElementById('pix-valor');
  
  if (valorInput) {
    // Permitir apenas números, vírgula e ponto
    valorInput.addEventListener('input', function(e) {
      this.value = this.value.replace(/[^0-9,.]/g, '');
    });
    
    // Formatar ao perder o foco
    valorInput.addEventListener('blur', function(e) {
      if (this.value) {
        const num = parseFloat(this.value.replace(',', '.'));
        if (!isNaN(num) && num > 0) {
          this.value = formatarValor(num);
        }
      }
    });
    
    // Permitir Enter para copiar
    valorInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        copiarPix();
      }
    });
  }
  
  // Permitir Enter nos botões de sugestão
  document.querySelectorAll('.sugestoes button').forEach(btn => {
    btn.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
});
