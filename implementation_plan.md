# Plano de Implementação: Seção de Serviços (Etapa 1)

## 01. Análise da Implementação Atual

Atualmente, o arquivo `src/sections/Services.tsx` possui um layout genérico de *scrollytelling* com as seguintes características:
- Utiliza um `IntersectionObserver` básico para trocar um índice (`activeIndex`).
- Depende de imagens estáticas (JPG) em vez de gráficos dinâmicos.
- Possui um layout de texto simplificado e incompleto em relação ao copywriting oficial da Alura Cloud.
- Falta o cabeçalho introdutório ("SOLUÇÕES DIGITAIS COMPLETAS...").

## 02. Estratégia Técnica (A Nova Arquitetura)

Para atender ao briefing visual premium e ao conceito de "metamorfose" contínua entre as categorias, precisamos descartar o observer nativo e as imagens estáticas, substituindo-os por uma **arquitetura controlada pelo GSAP ScrollTrigger** e **SVG Nativo**.

Nesta Etapa 1, implementaremos **exclusivamente a fundação e a Categoria 01 (Desenvolvimento Digital)**.

### A. Estrutura Base (`Services.tsx`)
- **Header:** Criar a estrutura introdutória com a tipografia monumental solicitada: "SOLUÇÕES DIGITAIS COMPLETAS PARA PROJETOS REAIS".
- **Container GSAP:** Configurar um container mestre (`.services-wrapper`) onde a coluna direita (Visual) receberá um `Pin` do GSAP, mantendo-se fixa e pegajosa enquanto a coluna esquerda (Texto) realiza o scroll vertical.

### B. Novo Motor Gráfico (`MorphingServiceCore.tsx`)
- Criaremos um novo componente na pasta `src/components/services/` dedicado a renderizar a cena 3D isométrica que irá mutar.
- **Etapa 1 (Desenvolvimento Digital):** Desenvolveremos a representação visual da "Interface / Viewport" utilizando SVG Nativo. Criaremos linhas, grids e a estrutura isométrica de um browser flutuante e elementos de UI, compartilhando a mesma matemática isométrica (`utils.ts`) do Hero.

### C. Atualização do Conteúdo
- Substituir os textos temporários pelos textos oficiais do briefing, aplicando a hierarquia de fontes da Axiforma (Semi Bold para Títulos, Regular para Descrições).

---

> [!IMPORTANT]
> **User Review Required:** 
> Você concorda com a substituição do `IntersectionObserver` pelo `GSAP ScrollTrigger` para obtermos controle cirúrgico sobre a animação do SVG em relação à rolagem do mouse? E aprova o início pelo componente base e pelo SVG da categoria "Desenvolvimento Digital" conforme instruído?

## 03. Próximos Passos (Após Aprovação)
1. Refatorar `Services.tsx` integrando o GSAP ScrollTrigger.
2. Criar `src/components/services/MorphingServiceCore.tsx` e implementar o visual isomêtrico de Interface Web.
3. Ajustar o `globals.css` para suportar o novo layout da seção.
