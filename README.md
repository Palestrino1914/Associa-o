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


---

## 🎨 Design e identidade

### **Cores institucionais**
- Verde escuro: `#004d26`  
- Verde médio: `#00563F`
- Verde esmeralda: `#007849`
- Verde água: `#00a86b`
- Verde floresta: `#006400`
- Verde oliva: `#228B22`

### **Tipografia**
- Títulos: **Montserrat** (via Google Fonts)  
- Corpo: **Segoe UI / Open Sans** (fallback seguro)

### **Layout**
- **Grid de 2 colunas**: Design moderno e responsivo
- **Banner slider**: Destaque visual com Swiper.js e gradientes verdes
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
- ✅ **3 slides com gradientes em tons de verde** (sem dependência de imagens)

### **Design Responsivo**
- ✅ **Desktop**: Grid de 2 colunas + banner 450px
- ✅ **Tablet**: Grid de 1 coluna + banner 350px
- ✅ **Mobile**: Layout otimizado + banner 300px

### **Animações**
- ✅ **Fade-in ao rolar** (cards aparecem gradualmente)
- ✅ **Hover effects** nos cards (elevação e sombra)
- ✅ **Animações suaves** nos ícones SVG

### **Performance**
- ✅ **Carregamento rápido**: zero dependências externas (além do Swiper.js CDN)
- ✅ **Zero imagens no banner** (usa apenas gradientes CSS)
- ✅ **Otimização** para mobile-first

### **Hospedagem**
- ✅ **Pronto para GitHub Pages**: basta enviar os arquivos para um repositório
- ✅ **Zero configuração**: funciona imediatamente após upload

---

## 🚀 Como publicar

### **Opção 1: GitHub Pages (Recomendado)**

1. Crie um repositório no GitHub
2. Envie todos os arquivos deste projeto para a branch `main`
3. Acesse: **https://seu-usuario.github.io/nome-do-repositorio/**

### **Opção 2: Domínio Personalizado**

1. Configure um domínio personalizado no GitHub Pages
2. Acesse: **https://aeesp.org.br**

> 💡 **Dica**: não crie subpastas — os arquivos `.html` devem estar na **raiz** do repositório.

---

## 🎨 Paleta de Cores dos Slides

O banner slider utiliza **3 gradientes em tons de verde**:

| Slide | Gradiente | Descrição |
|-------|-----------|-----------|
| **Slide 1** | `#004d26` → `#007849` | Verde escuro → Verde esmeralda |
| **Slide 2** | `#00563F` → `#00a86b` | Verde institucional → Verde água |
| **Slide 3** | `#006400` → `#228B22` | Verde floresta → Verde oliva |

---

## 📦 Dependências Externas

O site utiliza apenas **1 biblioteca externa** via CDN:

```html
<!-- Swiper.js CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<!-- Swiper.js JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
