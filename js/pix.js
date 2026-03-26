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
  return parseFloat(valor).toFixed(2).replace('.', ',');
}

// Função para gerar o código PIX estático com valor
function gerarCodigoPix(valor) {
  const valorFormatado = parseFloat(valor).toFixed(2);
  
  // Construção do payload PIX conforme padrão BR Code
  let payload = '000201'; // Payload Format Indicator
  
  // Merchant Account Information (MAI) - GUI + Chave PIX
  const chavePixPadded = pixData.chave.padEnd(36, '\u0000').substring(0, 36);
  const nomePadded = pixData.nome.padEnd(25, '\u0000').substring(0, 25);
  const cidadePadded = pixData.cidade.padEnd(15, '\u0000').substring(0, 15);
  
  payload += '26' + (14 + 4 + chavePixPadded.length).toString().padStart(2, '0');
  payload += '0014BR.GOV.BCB.PIX';
  payload += '01' + chavePixPadded.length.toString().padStart(2, '0') + chavePixPadded;
  
  // Merchant Category Code
  payload += '52040000';
  
  // Transaction Currency (986 = BRL)
  payload += '5303986';
  
  // Transaction Amount
  const valorStr = valorFormatado.toString();
  payload += '54' + valorStr.length.toString().padStart(2, '0') + valorStr;
  
  // Country Code (BR)
  payload += '5802BR';
  
  // Merchant Name
  payload += '59' + nomePadded.length.toString().padStart(2, '0') + nomePadded;
  
  // Merchant City
  payload += '60' + cidadePadded.length.toString().padStart(2, '0') + cidadePadded;
  
  // Additional Data Field Template
  payload += '62070503***';
  
  // CRC16 placeholder
  payload += '6304****';
  
  // Calcular CRC16
  const crc = calcularCRC16(payload.slice(0, -4));
  return payload.slice(0, -4) + crc;
}

// Função para calcular CRC16-CCITT (implementação completa)
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
    
    // Copiar para clipboard
    navigator.clipboard.writeText(codigoPix).then(() => {
      showMessage(`✅ PIX copiado! Cole no seu app de banco<br>Valor: R$ ${formatarValor(valor)}`, 'success', messageDiv);
    }).catch(err => {
      console.error('Erro ao copiar:', err);
      // Fallback para navegadores mais antigos
      fallbackCopy(codigoPix, valor, messageDiv);
    });
  } catch (error) {
    console.error('Erro na geração do PIX:', error);
    showMessage('❌ Erro ao gerar PIX. Tente novamente.', 'error', messageDiv);
  }
}

// Fallback para copy em navegadores antigos
function fallbackCopy(texto, valor, messageDiv) {
  const textarea = document.createElement('textarea');
  textarea.value = texto;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showMessage(`✅ PIX copiado! Cole no seu app de banco<br>Valor: R$ ${formatarValor(valor)}`, 'success', messageDiv);
  } catch (err) {
    showMessage('❌ Não foi possível copiar. Selecione e copie manualmente.', 'error', messageDiv);
  }
  
  document.body.removeChild(textarea);
}

// Exibir mensagem com animação
function showMessage(text, type, element) {
  if (!element) return;
  element.innerHTML = text;
  element.className = `pix-message ${type}`;
  element.style.display = 'block';
  
  setTimeout(() => {
    element.style.display = 'none';
  }, 5000);
}

// Função para preencher valor ao clicar nas sugestões
function preencherValor(sugestao) {
  const valorInput = document.getElementById('pix-valor');
  if (valorInput) {
    valorInput.value = sugestao;
    valorInput.focus();
  }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Adicionar evento de formatação ao input
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
        if (!isNaN(num)) {
          this.value = formatarValor(num);
        }
      }
    });
  }
});
