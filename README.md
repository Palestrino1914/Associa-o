# 🌿 Associação Esportiva Educação e Saúde de Pompeia

![Logo da Associação](img/aeesp-logo.png)  
*Transformando vidas por meio do esporte, da educação e da cidadania*

---

## 📌 Sobre este repositório

Este repositório contém o **site oficial** da **Associação Esportiva Educação e Saúde de Pompeia**, entidade civil sem fins lucrativos fundada em 30 de outubro de 2025, com sede em Pompéia (SP).

O site é **estático, responsivo e acessível**, desenvolvido com HTML5, CSS3 e JavaScript puro — sem frameworks pesados, bancos de dados ou backend. Hospedado gratuitamente no **GitHub Pages** com design profissional e identidade visual unificada.

---

## 🧩 Estrutura do projeto

.
├── index.html # Página inicial com banner slider (4 slides)
├── quem-somos.html # Missão, visão, valores e equipe fundadora
├── historia.html # Trajetória do projeto TB Pompeia
├── projetos.html # Futebol Educativo e Corrida de Rua
├── eventos.html # Atividades regulares (treinos, corridas)
├── envolva-se.html # Formas de apoio: doações, patrocínio, voluntariado
├── contato.html # E-mail, WhatsApp, redes sociais e endereço
├── img/
│ ├── aeesp-logo.png # Logo principal (header + slide do banner)
│ └── favicon.png # Ícone para aba do navegador (opcional)
├── css/
│ └── style.css # Estilização completa com variáveis CSS


---

## 🎨 Identidade Visual Unificada

### **Logo institucional**
- **Localização**: Header de todas as páginas + Slide 4 do banner
- **Arquivo**: `img/aeesp-logo.png`
- **Tamanho no banner**: 280px (desktop) / 210px (tablet) / 140px (mobile)
- **Posicionamento**: Centralizado com fundo verde institucional

### **Cores institucionais**
| Elemento | Cor | Hex |
|----------|-----|-----|
| **Verde escuro (background)** | Fundo header, footer, colunas laterais | `#004d26` |
| **Verde médio (gradiente)** | Destaque visual | `#00563F` |
| **Verde escuro (texto)** | Títulos e elementos de destaque | `#1a5d1a` |
| **Verde quase preto (texto)** | Corpo do texto nas seções internas | `#0E2407` |
| **Branco** | Texto em áreas escuras | `#FFFFFF` |

### **Tipografia**
- **Títulos**: Montserrat (via Google Fonts) - Negrito, maiúsculas
- **Corpo**: Open Sans / Segoe UI - Justificado, legível
- **Tamanho base**: 16px (aumenta para 18px em mobile)

### **Layout**
| Página | Layout | Características |
|--------|--------|-----------------|
| **Home (`index.html`)** | Banner slider + Grid de cards | 4 slides (incluindo logo), 6 cards interativos |
| **Seções internas** | 3 colunas (18% \| 64% \| 18%) | Colunas laterais verdes, conteúdo central branco |
| **Mobile** | Layout único | Colunas laterais escondidas, conteúdo central expandido |

---

## ✨ Funcionalidades Implementadas

### **Navegação**
- ✅ **Logo no header** de todas as páginas (canto superior esquerdo)
- ✅ **Menu com destaque automático** da página atual
- ✅ **Navegação consistente** em todas as seções

### **Banner Slider (Swiper.js)**
- ✅ **4 slides total**: 3 com mensagens + 1 com logo institucional
- ✅ **Logo centralizado** com tamanho otimizado (280px desktop)
- ✅ **Loop infinito** com transição suave
- ✅ **Autoplay** automático (5 segundos por slide)
- ✅ **Pausa ao passar o mouse**
- ✅ **Navegação com botões** (próximo/anterior) + paginação com bolinhas
- ✅ **Responsivo**: Altura ajusta para 350px (tablet) e 300px (mobile)
- ✅ **Acessibilidade completa** (ARIA labels, navegação por teclado)

### **Layout das Seções Internas**
- ✅ **3 colunas fixas**: 18% (verde) | 64% (conteúdo branco) | 18% (verde)
- ✅ **Sem bordas brancas**: Colunas laterais ocupam 100% da largura
- ✅ **Texto com cor #0E2407**: Verde escuro quase preto para melhor legibilidade
- ✅ **Formatação consistente**: Espaçamento uniforme em parágrafos e listas
- ✅ **Mobile-first**: Colunas laterais escondidas em telas pequenas

### **Design Responsivo**
| Dispositivo | Banner | Header | Layout Interno |
|-------------|--------|--------|----------------|
| **Desktop** | 450px | Logo 60px | 3 colunas visíveis |
| **Tablet** | 350px | Logo 50px | 3 colunas visíveis |
| **Mobile** | 300px | Logo 40px | Apenas coluna central |

### **Performance**
- ✅ **Carregamento rápido**: Zero dependências externas (além do Swiper.js CDN)
- ✅ **Otimização de imagens**: Logo em PNG com fundo transparente
- ✅ **CSS minificado**: Variáveis CSS para manutenção fácil
- ✅ **Mobile-first**: Código limpo e sem redundâncias


## 📦 Dependências Externas

O site utiliza apenas **1 biblioteca externa** via CDN:

```html
<!-- Swiper.js CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<!-- Swiper.js JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
├── js/
│ └── main.js # Comportamento: menu ativo, banner slider
└── README.md # Documentação do projeto
