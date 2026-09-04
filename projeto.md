# Projeto AluraCloud - Manifesto e Documentação (V2)

## 1. Visão Geral
**AluraCloud** é um "Estúdio de Engenharia Digital" com uma proposta visual premium. O objetivo do site institucional é transmitir alta tecnologia, exclusividade e modernidade através de interações ricas e elementos visuais em 3D isométrico desenhados nativamente.

## 2. Stack Tecnológico
- **Framework:** Next.js (React) com App Router.
- **Linguagem:** TypeScript.
- **Estilização:** CSS Vanilla (`globals.css`) fortemente baseado em variáveis CSS (Design System próprio). *Nota: O Tailwind CSS foi intencionalmente removido do projeto na V2 para garantir máxima fidelidade, flexibilidade e controle visual.*
- **Animações:** GSAP (ScrollTrigger para efeitos baseados em scroll) e transições CSS nativas.
- **Gráficos 3D:** Motor Isométrico Matemático construído internamente (geração procedural de polígonos SVG via React).

## 3. Design System & Identidade Visual
A estética prioriza fundos muito escuros e elementos luminosos "neon".
- **Cor de Fundo Principal (`--bg-base`):** `#020b0a` (Verde extremamente escuro/quase preto).
- **Cor de Fundo de Cartões (`--bg-surface`):** Ligeiramente mais claro que o base.
- **Cor de Destaque (`--accent`):** `#00DF81` (Verde vibrante/Neon).
- **Tipografia:** 
  - Fonte Display (títulos e números) para impacto.
  - Fonte Sans (descrições e textos base) para legibilidade.
- **Micro-interações:** Glows, borders expansivas (glassmorphism sombrio) e transformações de hover (cards que flutuam, botões magnéticos).

## 4. O Motor Isométrico (`utils.ts`)
Criamos uma biblioteca de utilitários própria para desenhar elementos 3D:
- **`p(x, y, z)`:** Converte coordenadas 3D para um espaço 2D isométrico focado em `x: 600, y: 650`.
- **`plane(x, y, z, width, height)`:** Cria polígonos para o sistema SVG desenhar os objetos.
- **Vantagem:** Não usamos imagens externas (`.png` ou `.webp`), tudo é desenhado matematicamente em `path` e `polygon` SVG pelo próprio React, sendo absurdamente leve e interativo.

## 5. Estrutura de Componentes Construída (Até o Momento)

### 5.1 Navegação (`Nav.tsx`)
- Menu no estilo "Dock" flutuante moderno (semelhante ao macOS/Framer).
- Centralizado, itens magnéticos, sem Tailwind.

### 5.2 Hero Section (`Hero.tsx` & `HeroShapes.tsx`)
- Layout assimétrico, fiel à referência inicial.
- Texto massivo focado em Engenharia Digital de um lado.
- Primitivos geométricos 3D em SVG (cubos e grids flutuantes) do outro lado, orquestrados com GSAP.

### 5.3 Seção de Serviços (`Services.tsx`)
- **Cabeçalho Visual (`ServicesHeaderGraphic.tsx`):** Um título acompanhado de uma esfera holográfica gigante (glow de fundo) com um anel de partículas orbitando no lado direito.
- **Grid de Categorias:** Layout em 5 colunas horizontais (`grid-template-columns: repeat(5, 1fr)`).
- **Cartões Individuais (Tall Cards):** Cada serviço tem seu cartão que sobe suavemente ao passar o mouse.
- **Artes Dedicadas (`ServiceCardGraphic.tsx`):** Cada cartão desenha seu próprio universo 3D isométrico na parte de baixo, ancorado por um piso quadriculado (`gridLines`):
  - `01`: Viewport de App/Browser e Mobile flutuantes.
  - `02`: Dashboard separado em módulos flutuantes.
  - `03`: Torre de blocos inspirada em Minecraft com ícone de bot do Discord.
  - `04`: Pilha de servidores e racks de infraestrutura.
  - `05`: Nuvens estratificadas e raio direcional (Hospedagem).

## 6. Próximos Passos (Faltantes)
De acordo com o mockup do briefing, as próximas seções a serem desenvolvidas na página principal são:
1. **O PROCESSO**
2. **TECNOLOGIAS (Stack)**
3. **CONTATO / RODAPÉ**

> Documento gerado e atualizado continuamente ao longo do processo de desenvolvimento da V2.
