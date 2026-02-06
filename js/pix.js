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
    
    // Merchant Account Information (MAI)
    payload += '2658'; // Length of MAI
    payload += '0014BR.GOV.BCB.PIX'; // GUI
    payload += '0136' + pixData.chave.padEnd(36, '\u0000').substring(0, 36); // Chave PIX (CNPJ)
    payload += '0214' + pixData.nome.padEnd(14, '\u0000').substring(0, 14); // Nome recebedor
    
    // Merchant Category Code
    payload += '52040000';
    
    // Transaction Currency (986 = BRL)
    payload += '5303986';
    
    // Transaction Amount
    payload += '5405' + valorFormatado.padStart(5, '0');
    
    // Country Code (BR)
    payload += '5802BR';
    
    // Merchant Name (nome completo)
    payload += '5925' + pixData.nome.padEnd(25, '\u0000').substring(0, 25);
    
    // Merchant City
    payload += '6007' + pixData.cidade.padEnd(7, '\u0000').substring(0, 7);
    
    // Additional Data Field Template
    payload += '6207';
    payload += '0503***';
    
    // CRC16 placeholder
    payload += '6304****';
    
    // Calcular CRC16
    const crc = calcularCRC16(payload.slice(0, -4));
    return payload.slice(0, -4) + crc;
}

// Função para calcular CRC16 (implementação completa)
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
        }
    }
    
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

// Função principal para copiar o PIX
function copiarPix() {
    const valorInput = document.getElementById('pix-valor');
    const valor = valorInput.value.replace(',', '.'); // Converter vírgula para ponto
    const messageDiv = document.getElementById('pix-message');
    
    // Validação do valor
    if (!valor || parseFloat(valor) <= 0 || isNaN(parseFloat(valor))) {
        messageDiv.className = 'pix-message error';
        messageDiv.textContent = '⚠️ Por favor, informe um valor válido (ex: 10, 25.50)';
        messageDiv.style.display = 'block';
        return;
    }
    
    try {
        const codigoPix = gerarCodigoPix(valor);
        
        // Copiar para clipboard
        navigator.clipboard.writeText(codigoPix).then(() => {
            messageDiv.className = 'pix-message success';
            messageDiv.innerHTML = `✅ PIX copiado! Cole no seu app de banco<br>Valor: R$ ${formatarValor(valor)}`;
            messageDiv.style.display = 'block';
            
            // Esconder mensagem após 5 segundos
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
            
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            messageDiv.className = 'pix-message error';
            messageDiv.textContent = '❌ Não foi possível copiar. Tente novamente.';
            messageDiv.style.display = 'block';
        });
    } catch (error) {
        console.error('Erro na geração do PIX:', error);
        messageDiv.className = 'pix-message error';
        messageDiv.textContent = '❌ Erro ao gerar PIX. Tente novamente.';
        messageDiv.style.display = 'block';
    }
}

// Função para preencher valor ao clicar nas sugestões
function preencherValor(sugestao) {
    const valorInput = document.getElementById('pix-valor');
    valorInput.value = sugestao;
    valorInput.focus();
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar evento de formatação ao input
    const valorInput = document.getElementById('pix-valor');
    if (valorInput) {
        valorInput.addEventListener('input', function(e) {
            // Permitir apenas números, vírgula e ponto
            this.value = this.value.replace(/[^0-9,.]/g, '');
        });
    }
});
