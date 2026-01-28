# 🌿 Associação Esportiva Educação e Saúde de Pompeia

![Logo da Associação](https://via.placeholder.com/600x150/004d26/FFFFFF?text=Associação+Esportiva+Educação+e+Saúde+de+Pompéia)  
*Transformando vidas por meio do esporte, da educação e da cidadania*

---

## 📌 Sobre este repositório

Este repositório contém o **site oficial** da **Associação Esportiva Educação e Saúde de Pompeia**, uma entidade civil sem fins lucrativos fundada em 30 de outubro de 2025, com sede em Pompéia (SP).

O site é **estático, responsivo e acessível**, desenvolvido com HTML5, CSS3 e JavaScript puro — sem frameworks pesados, bancos de dados ou backend. É ideal para hospedagem gratuita no **GitHub Pages**.

---

## 🧩 Estrutura do projeto

.
├── index.html # Página inicial (Home) com banner slider
├── quem-somos.html # Missão, visão, valores e equipe
├── historia.html # Trajetória do projeto TB Pompeia
├── projetos.html # Futebol Educativo e Corrida de Rua
├── eventos.html # Atividades regulares (treinos, corridas)
├── envolva-se.html # Formas de apoio: doações, patrocínio, voluntariado
├── contato.html # E-mail, WhatsApp, redes sociais e endereço
├── css/
│ └── style.css # Estilização completa com variáveis CSS
├── js/
│ └── main.js # Comportamento: menu ativo, banner slider e animações
└── img/
└── banner/
├── slide1-eventos.jpg
├── slide2-envolva-se.jpg
└── slide3-contato.jpg


---

## 🎨 Design e identidade

### **Cores institucionais**
- Verde escuro: `#004d26`  
- Verde médio: `#00563F`
- Azul destaque: `#007bff`
- Roxo gradiente: `#667eea` → `#764ba2`

### **Tipografia**
- Títulos: **Montserrat** (via Google Fonts)  
- Corpo: **Segoe UI / Open Sans** (fallback seguro)

### **Layout**
- **Grid de 2 colunas**: Design moderno e responsivo
- **Banner slider**: Destaque visual com Swiper.js
- **Cards interativos**: Hover effects e animações suaves

### **Ícones**
- SVG inline (sem dependências externas)

### **Acessibilidade**
- Contraste adequado
- Semântica clara
- Navegação por teclado
- Suporte a leitores de tela

---

## ✨ Funcionalidades

### **Navegação**
- ✅ **Menu com destaque automático** da página atual
- ✅ **Navegação modular**: cada seção é uma página independente

### **Banner Slider (Swiper.js)**
- ✅ **Loop infinito** com transição suave
- ✅ **Autoplay** automático (5 segundos por slide)
- ✅ **Pausa ao passar o mouse**
- ✅ **Navegação com botões** (próximo/anterior)
- ✅ **Paginação com bolinhas** clicáveis
- ✅ **Efeito de fade** entre slides
- ✅ **Navegação por teclado** (setas)
- ✅ **Acessibilidade** completa (ARIA labels)

### **Design Responsivo**
- ✅ **Desktop**: Grid de 2 colunas + banner 600px
- ✅ **Tablet**: Grid de 1 coluna + banner 400px
- ✅ **Mobile**: Layout otimizado + banner 300px

### **Animações**
- ✅ **Scroll suave** para âncoras
- ✅ **Fade-in ao rolar** (cards aparecem gradualmente)
- ✅ **Hover effects** nos cards (elevação e sombra)

### **Performance**
- ✅ **Carregamento rápido**: zero dependências externas (além do Google Fonts e Swiper.js CDN)
- ✅ **Lazy loading** de imagens
- ✅ **Pré-carregamento** de slides
- ✅ **Otimização** para mobile-first

### **Hospedagem**
- ✅ **Pronto para GitHub Pages**: basta enviar os arquivos para um repositório `usuario.github.io`
- ✅ **Zero configuração**: funciona imediatamente após upload

---

## 🚀 Como publicar

1. Crie um repositório no GitHub com o nome: **`seu-usuario.github.io`**
2. Envie todos os arquivos deste projeto para a branch `main`
3. Acesse inicialmente: **https://seu-usuario.github.io**  
   Após configurar o domínio personalizado: **https://aeesp.org.br**

> 💡 **Dica**: não crie subpastas — os arquivos `.html` devem estar na **raiz** do repositório.

---

## 🖼️ Imagens do Banner

O banner slider utiliza 3 imagens principais:

| Slide | Tema | Tamanho recomendado |
|-------|------|---------------------|
| **Slide 1** | Eventos e Atividades | 1920x600px (16:5) |
| **Slide 2** | Apoie nossa causa | 1920x600px (16:5) |
| **Slide 3** | Entre em contato | 1920x600px (16:5) |

### **Recomendações para as imagens:**
- **Formato**: JPG ou WebP
- **Compressão**: Use ferramentas como TinyPNG ou Squoosh
- **Qualidade**: Manter alta resolução para desktop
- **Textos**: Evitar textos pequenos (serão sobrepostos pelo texto do slide)

---

## 📦 Dependências Externas

O site utiliza apenas 2 bibliotecas externas via CDN:

```html
<!-- Swiper.js CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<!-- Swiper.js JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
