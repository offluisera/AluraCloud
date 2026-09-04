# Alura Cloud — Backup de Sessão e Estado do Projeto (Sessão 2)

Este arquivo serve como um ponto de restauração (checkpoint) para as próximas sessões, contendo todo o contexto arquitetônico, de design e do que já foi implementado. 

## 1. Identidade e Filosofia de Design (Design Brief)
- **Tema Geral**: Estúdio de Engenharia Digital (não apenas uma "agência web"). A sensação deve ser de que existe uma *engenharia robusta* por trás de tudo.
- **Paleta de Cores**: Dark Theme absoluto. Fundo principal Rich Black (`#020b0a`) e Accent principal verde neon (`#00DF81`).
- **Stack**: Next.js 16 (App Router), Vanilla CSS (Sem Tailwind), GSAP para animações.
- **Estética (Referências: BlackCat, Volara)**:
  - Foco massivo em **espaço negativo**, layout editorial e minimalismo sofisticado.
  - Microinterações premium.
  - Uso de imagens de **altíssima fidelidade** (Glassmorphism, Renders 3D, Mockups) em vez de ilustrações genéricas "flat".

## 2. O Que Foi Implementado e Finalizado

### A. Hero (Etapa 1)
- **Design Visual**: Construímos um sistema isométrico puro usando SVG paramétrico para desenhar uma matriz tridimensional ao fundo.
- **Correção Matemática**: A projeção do losango (rhombus) foi ajustada cirurgicamente para criar profundidade real sem distorção.
- **Detalhes Técnicos**: Inserção de dados HUD estilo interface de engenharia (ex: coordenadas exatas da sede em Bandeira do Sul, MG: `-21.7611, -46.3861`).

### B. Navegação (Nav)
- **Design Premium**: O *header* foi transformado em um "Dock" compacto e centralizado flutuando no topo.
- **Microinterações**: O indicador ativo usa um nó brilhante discreto (border-radius 50% + box-shadow verde).
- **Mobile**: Interface despoluída focada em usabilidade imediata.

### C. Manifesto
- **Lógica Editorial**: Seção focada em tipografia gigante e respiro visual. Frase: *"Você traz a ideia. Nós construímos a engenharia exata para ela existir."*
- **Animações**: Linha de eixo vertical (Z) que desce conectando o Hero com o Manifesto. O texto é revelado palavra por palavra no scroll.
- **Correção de Bugs GSAP**: A opacidade ficava travada no React Strict Mode. Resolvemos separando o estado inicial com `gsap.set` e a animação com `gsap.to`.
- **Fundo**: Padrão de pontilhismo elegante coberto com uma máscara de vinheta (radial gradient) fundindo as bordas ao fundo escuro.

### D. Serviços (Arquitetura Volara)
- **Abandono de Cards Genéricos**: Trocamos a grade simples por uma experiência avançada baseada no benchmark do site *Volara*.
- **Engine Sticky Nativa**: Construímos um layout onde a coluna esquerda (textos) rola naturalmente, enquanto a coluna direita (imagens) "gruda" na tela (`position: sticky`). Um `IntersectionObserver` detecta silenciosamente qual serviço está no meio da tela para aplicar *crossfade* na imagem correta.
- **Assets Gerados de Alta Fidelidade**: Foram gerados 4 renders realistas na pasta `public/images/`:
  1. `service_dev.jpg`: Mockup Glassmorphism de Interface Web.
  2. `service_systems.jpg`: Dashboard SaaS complexo e high-tech.
  3. `service_solutions.jpg`: Renderização Isométrica de Voxel 3D (Minecraft) com estética Cyberpunk/Tech.
  4. `service_infra.jpg`: Cinematic render de Data Center (racks de servidores iluminados por LEDs).
  5. *Hospedagem (Item 5)*: Implementado como um radar abstrato pulsante na UI (Standby / Em Breve).

## 3. Próximos Passos (Próximas Sessões)
As seguintes seções precisam ser implementadas, seguindo rigorosamente a mesma direção de arte:
- **03 — Processo**: A metodologia de trabalho (Como construímos).
- **04 — Tecnologias (Tech)**: Exibição da stack técnica de forma arquitetônica (não apenas logos jogados em um carrossel).
- **05 — Contato**: CTA dramático e minimalista finalizando o fluxo da página.

## 4. Instruções para a IA na Próxima Sessão
- **NÃO quebre o que já foi feito**: A base de classes no `globals.css` está perfeitamente refinada. Reutilize tipografias e regras de layout existentes.
- Ao iniciar a próxima sessão, carregue o conteúdo deste arquivo para garantir a continuidade absoluta do trabalho de Direção de Arte e Arquitetura Frontend. Mantenha o mindset ativo de criar algo premium, focado em alta densidade, UI fluida e sem recorrer a "gambiarras" ou design óbvio.
