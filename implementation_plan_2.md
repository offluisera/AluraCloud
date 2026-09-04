# ALURA CLOUD V2 — Direção de Arte + Arquitetura Frontend

> **Fase 1**: Design System · Tipografia · Background · Grid · Shapes · Hero · Navegação
> **Objetivo**: Atingir o nível visual da [referencia.png](file:///c:/xampp/htdocs/AluraCloud/referencia.png) com identidade própria

---

## AUDITORIA DO ESTADO ATUAL

### O que já existe e funciona

| Componente | Estado | Veredicto |
|---|---|---|
| [globals.css](file:///c:/xampp/htdocs/AluraCloud/alura-cloud-site/src/app/globals.css) | 1411 linhas, tokens corretos, sem Tailwind | ✅ Fundação sólida — **refinar, não reescrever** |
| [Hero.tsx](file:///c:/xampp/htdocs/AluraCloud/alura-cloud-site/src/sections/Hero.tsx) | Layout assimétrico, GSAP timeline, eyebrow+headline+sub+CTA+meta | ⚠️ Estrutura boa, mas Hero visualmente **plano** — falta profundidade, density, grandeza |
| [HeroShapes.tsx](file:///c:/xampp/htdocs/AluraCloud/alura-cloud-site/src/components/shapes/HeroShapes.tsx) | 6 primitivos SVG, animações CSS fade | ⚠️ Conceitualmente correto mas **muito tímido** — opacidades baixas, sem peso visual, sem drama |
| [Nav.tsx](file:///c:/xampp/htdocs/AluraCloud/alura-cloud-site/src/components/layout/Nav.tsx) | Dock pill flutuante, scroll detection, mobile overlay | ✅ Funcional — refinar acabamento |
| [Logo.tsx](file:///c:/xampp/htdocs/AluraCloud/alura-cloud-site/src/components/ui/Logo.tsx) | Losango "A" SVG | ✅ Manter |
| [Button.tsx](file:///c:/xampp/htdocs/AluraCloud/alura-cloud-site/src/components/ui/Button.tsx) | Outline, arrow, sem glass | ✅ Correto conforme brief |
| Design tokens CSS | Paleta 6+7, type scale, spacing, easings | ✅ Corretos — ajustar detalhes |
| package.json | Next 16, React 19, GSAP, lucide-react | ✅ Stack limpa |

### Diagnóstico principal

O projeto tem a **estrutura certa** mas falta **intensidade visual**. Comparado com a referência:

1. **Shapes muito fracos** — opacidade 0.12-0.45 vs referência que tem shapes com presença real (0.3-0.8)
2. **Hero sem peso** — headline precisa de mais impacto (tamanho, tracking, composição)
3. **Falta profundidade** — background é flat `#021B1A` sem camadas; referência tem texturas de grid + glows + gradientes suaves
4. **Falta densidade** — muita área vazia sem propósito vs espaço negativo intencional da referência
5. **Shapes são centrados** — viewBox 600x600 centrado em (300,300); falta assimetria e tensão compositiva

---

## ANÁLISE DA REFERÊNCIA COMO BENCHMARK

### O que a referência faz que eleva a qualidade

| Princípio | O que a referência demonstra | Como traduzir para Alura Cloud |
|---|---|---|
| **Densidade controlada** | 15 módulos em 1 board, cada um com conteúdo real, sem espaço desperdiçado | Cada seção deve ter peso visual — shapes preenchem, não decoram |
| **Profundidade** | Mínimo 3 camadas: background grid → shapes médios → elementos forefront | CSS layers: `bg-grid` → `bg-glow` → `shapes-mid` → `content` → `shapes-fore` |
| **Iluminação** | Pontos de `#00DF81` como fontes de luz — glow é motivado, não aleatório | Nós são "fontes de energia"; glow irradia dos nós, não do nada |
| **Geometria precisa** | Linhas, arcos, grids com stroke consistente. Nada tremido ou "artístico" | SVGs com stroke fixo (0.5/0.8/1px), coordenadas limpas, alinhamento ao grid |
| **Composição assimétrica** | Hero: texto à esquerda, shapes à direita com tensão diagonal | Manter grid 55/45; shapes devem "puxar" o olho para a direita-baixo |
| **Espaço negativo** | Módulos respiram, mas o espaço é **enquadrado** por bordas e linhas | Bordas 1px `#142220` como moldura; espaço é estruturado, não vazio |
| **Acabamento** | Bordas finas, labels uppercase pequenos, tipografia precisa | Cada pixel conta: letter-spacing exato, padding intencional |
| **Shapes como sistema** | Os 6 primitivos reaparecem em composições diferentes por módulo | Um `ShapeSystem` reutilizável que monta composições por contexto |
| **Cores como hierarquia** | `#00DF81` aparece em <15% da superfície — escassez = impacto | Verde vibrante: APENAS headline accent + nós + CTA hover + indicadores |
| **Grid visual** | Grid de fundo muito sutil mas onipresente — dá sensação de "planta técnica" | Pattern SVG 60-80px, stroke 0.3px, opacity 0.06-0.12 |

---

## 1. DIREÇÃO DE ARTE

**Conceito**: *"Infraestrutura em silêncio"*

A Alura Cloud não grita. Ela mostra — como um datacenter limpo onde cada cabo tem propósito, cada LED indica status, e o silêncio é sinal de que tudo funciona. O site deve parecer um sistema operando: preciso, profundo, vivo mas controlado.

**Tom visual:**
- Escuridão como base operacional (não como "dark mode genérico")
- Verde como sinal de vida/status/atividade (não como "cor da marca")
- Geometria como evidência de engenharia (não como decoração)
- Movimento como respiração do sistema (não como espetáculo)

**Anti-padrões que vamos evitar:**
- ❌ Glassmorphism, blobs, partículas
- ❌ Gradientes arco-íris ou multicoloridos
- ❌ Cards com border-radius grande e sombras fofa
- ❌ Hero centralizado com subtítulo + 2 botões lado a lado
- ❌ "Powered by AI" aesthetic
- ❌ Fontes genéricas (Inter, Poppins, Montserrat)

---

## 2. CONCEITO VISUAL

**Metáfora central**: Planta de engenharia digital — o site é o blueprint do próprio trabalho.

**Camadas visuais (de trás para frente):**

```
Layer 0 — Background base (#021B1A)
Layer 1 — Grid de engenharia (SVG pattern, 60px, opacity 0.06-0.10)
Layer 2 — Radial glow suave (2-3 pontos de luz verde, r=400-600px, opacity 0.02-0.04)
Layer 3 — Shapes estruturais (linhas, arcos, planos — opacity 0.3-0.5)
Layer 4 — Shapes ativos (nós com glow, conexões dash — opacity 0.6-1.0)
Layer 5 — Content (texto, botões, UI)
Layer 6 — Shapes foreground ocasionais (linhas que cruzam sobre o content, opacity 0.1)
```

**Princípio do "less green, more impact"**: O `#00DF81` deve ocupar menos de 10% da superfície visível. Aparece em:
- Headline accent ("IDEIAS REAIS.")
- Nós ativos (círculos com glow)
- CTA button hover
- Status dots
- Process numbers
- Eyebrow dot

Tudo mais usa a faixa escura (#021B1A → #0B453A) e neutros (#AACBC4, #707D7D).

---

## 3. ARQUITETURA DA PÁGINA (Fase 1)

```
┌──────────────────────────────────────────────────────────┐
│  NAV DOCK (fixed, pill, center-top)                      │
│  [◇ A] [AC] │ Início  Serviços  Processo  Tech  Contato │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  HERO (100svh)                                           │
│  ┌─────────────────────┬────────────────────────────┐    │
│  │  Eyebrow            │                            │    │
│  │  ENGENHARIA         │     ╱╲    ·    ╲           │    │
│  │  DIGITAL PARA       │   ╱    ╲ ╱ ╲   ╲          │    │
│  │  IDEIAS REAIS.      │  ·──────·───·────·         │    │
│  │                     │   ╲    ╱     ╲  ╱          │    │
│  │  [Subtexto]         │    ╲ ╱  grid  ╲╱           │    │
│  │                     │     ·          ·            │    │
│  │  [FALAR COM A ─→]   │    arcs + nodes             │    │
│  │                     │                            │    │
│  │  ── meta bar ──     │                            │    │
│  └─────────────────────┴────────────────────────────┘    │
│  [Scroll ↓]                                              │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  (Fase 2+: Manifesto, Serviços, etc.)                    │
└──────────────────────────────────────────────────────────┘
```

---

## 4. ESTRUTURA DO HERO

### Layout

- **Grid**: `grid-template-columns: 55fr 45fr` (assimétrico)
- **Min-height**: `100svh`
- **Padding-top**: `max(7rem, 12vh)` para distância do nav dock
- **Align-items**: `center`

### Composição do texto (coluna esquerda)

```
[·] ESTÚDIO DE ENGENHARIA DIGITAL          ← eyebrow (11px, uppercase, spacing 0.15em, #707D7D)
                                             dot verde 6px com glow

ENGENHARIA                                  ← headline (clamp(3rem, 6.5vw, 6rem), 600, uppercase)
DIGITAL PARA                                  letter-spacing: -0.035em, line-height: 0.95
IDEIAS REAIS.                               ← accent (#00DF81)

Projetamos, desenvolvemos e                 ← sub (clamp(0.9375rem, 1.5vw, 1.0625rem), #AACBC4)
estruturamos soluções digitais                 max-width: 440px, line-height: 1.7
completas...

[ FALAR COM A ALURA CLOUD  → ]             ← btn outline (11px, uppercase, border #142220)
                                             hover: border + text → #00DF81, arrow translateX(4px)

─────────────────────────────               ← separator (1px, #142220)
DESENVOLVIMENTO  PRODUTO  INFRAESTRUTURA    ← meta bar (11px, uppercase, #707D7D, spacing 0.12em)
```

### Composição dos shapes (coluna direita)

Não é uma cópia da referência. É uma composição original com os mesmos 6 primitivos:

- **Grid de fundo**: pattern 60px, opacity 0.08, cobre toda a coluna
- **Arcos**: 3 semicírculos concêntricos deslocados do centro, strokes finos (0.5-1px), dashed
- **Linhas estruturais**: 2 diagonais cruzadas + 1 horizontal forte, criando tensão
- **Nós**: 5-7 pontos nos cruzamentos — 2-3 "ativos" (glow + pulse), restantes dim
- **Planos**: 1-2 polígonos com perspectiva leve (simula depth)
- **Conexões**: linhas dash conectando nós, opacity 0.3

**Diferença crucial vs. estado atual**: Os shapes precisam ter mais **presença**. Aumentar opacidades. O shape system deve parecer que EXISTE, não que é um fantasma.

### Animação de entrada (GSAP timeline)

```
t=0.0s  Grid fade in (opacity 0 → 0.08, duration 0.8s)
t=0.2s  Linhas draw (stroke-dashoffset 1 → 0, duration 1.2s, stagger 0.15s)
t=0.5s  Arcos draw (stroke-dashoffset, duration 1.4s)
t=0.7s  Nós fade + scale (opacity 0 → 1, scale 0 → 1, stagger 0.1s)
t=0.8s  Eyebrow fade-in-up (y:16→0, opacity 0→1, duration 0.7s)
t=1.0s  Headline fade-in-up (y:32→0, opacity 0→1, duration 0.9s)
t=1.3s  Subtexto (y:20→0, duration 0.7s)
t=1.5s  CTA (y:16→0, duration 0.6s)
t=1.7s  Meta bar (opacity, duration 0.8s)
```

> [!IMPORTANT]
> Shapes e texto devem animar **em paralelo**, não sequencialmente. O shape system começa primeiro, e o texto entra enquanto shapes ainda estão desenhando. Isso cria a sensação de "sistema ligando".

---

## 5. SISTEMA DE SHAPES

### 6 primitivos (SVG inline)

| Primitivo | Elemento SVG | Stroke | Cor | Opacidade base | Uso |
|---|---|---|---|---|---|
| **Linhas** | `<line>` | 0.5-0.8px | `#0B453A` / `#095544` | 0.3-0.5 | Diagonais, horizontais, verticais — estrutura |
| **Nós** | `<circle>` r=2-5px | — | fill `#00DF81` / `#2CC295` | 0.4-1.0 | Cruzamentos — pontos de "energia" |
| **Arcos** | `<path>` (arc) / `<circle>` | 0.5-1px, dashed | `#0B453A` → `#00DF81` (gradient) | 0.3-0.6 | Semicírculos concêntricos, quarter-arcs |
| **Grid** | `<pattern>` + `<rect>` | 0.3px | `#0B453A` | 0.06-0.12 | Background de engenharia |
| **Planos** | `<polygon>` | 0.5px | `#095544` | 0.2-0.4 | Superfícies com perspectiva — profundidade |
| **Conexões** | `<line>` stroke-dasharray | 0.5px, `3 6` | `#00DF81` 30% / `#2CC295` 25% | 0.2-0.3 | Paths entre nós |

### Regras compositivas

1. **Arcos nunca centrados** — sempre offset em relação ao centro da composição
2. **Nós nos cruzamentos** — cada nó deve estar na interseção de pelo menos 2 linhas
3. **Gradientes nos arcos** — start transparent → mid visible → end transparent (fadeout nas pontas)
4. **Glow nos nós** — `<filter>` com `feGaussianBlur` stdDeviation 3-5px apenas nos nós ativos
5. **Planos com skew** — polygon points que simulam perspectiva isométrica leve

### Implementação: `ShapeSystem.tsx`

```
interface ShapeComposition {
  gridOpacity: number;
  lines: LineConfig[];
  arcs: ArcConfig[];
  nodes: NodeConfig[];
  planes: PlaneConfig[];
  connections: ConnectionConfig[];
}
```

Cada seção pode montar uma composição diferente usando os mesmos primitivos. O Hero tem a composição mais complexa; outras seções usam subconjuntos.

---

## 6. SISTEMA DE GRID

### Grid layout

| Token | Valor | Uso |
|---|---|---|
| `--max-w` | `1320px` | Container max-width |
| `--gutter` | `clamp(1.25rem, 3vw, 2.5rem)` | Padding lateral |
| `--grid-cols` | 12 colunas implícitas | Para layouts complexos |
| Grid visual | 60px cells, 0.3px stroke, opacity 0.06-0.10 | Background pattern |

### Grid visual (SVG pattern)

```svg
<pattern id="bg-grid" width="60" height="60" patternUnits="userSpaceOnUse">
  <line x1="60" y1="0" x2="60" y2="60" stroke="var(--shape-grid)" stroke-width="0.3" opacity="0.08"/>
  <line x1="0" y1="60" x2="60" y2="60" stroke="var(--shape-grid)" stroke-width="0.3" opacity="0.08"/>
</pattern>
```

**Decisão**: Reduzir o cell size de 80px (atual) para 60px — mais denso, mais "engenharia". Aumentar levemente a opacidade de 0.15 para 0.08 com stroke mais presente (0.3px vs 0.3px com a redução do cell size, o grid parecerá naturalmente mais denso).

### Responsividade do grid visual

- **Desktop (>1024px)**: grid 60px, opacity 0.08
- **Tablet (768-1024px)**: grid 60px, opacity 0.06
- **Mobile (<768px)**: grid desativado ou opacity 0.03

---

## 7. SISTEMA DE ANIMAÇÕES

### Ferramentas

| Ferramenta | Quando usar | Quando NÃO usar |
|---|---|---|
| **CSS transitions** | Hover states, focus, color changes | Sequências complexas |
| **CSS @keyframes** | Loops simples (pulse, float) | Timelines com stagger |
| **GSAP timelines** | Entrada do Hero, sequência shapes | Hovers simples |
| **GSAP ScrollTrigger** | Reveal de seções, parallax leve | Scroll hijacking |

### GSAP: Regras

- **Timeline do Hero**: 1 timeline mestra com shapes + conteúdo
- **ScrollTrigger**: `start: "top 80%"`, `toggleActions: "play none none none"` — sem reverse
- **Stagger**: 0.08-0.15s para elementos em série
- **Easing**: `power3.out` para entradas, `power2.inOut` para transições
- **Duration**: shapes 1.0-1.4s, texto 0.6-0.9s

### Node pulse (CSS, não GSAP)

```css
@keyframes node-pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.15); }
}
```
Duration: 3-6s (variado por nó para dessincronizar). `prefers-reduced-motion: reduce` → desabilita.

### Draw animation (GSAP)

```js
gsap.fromTo(pathElement, 
  { strokeDashoffset: pathLength },
  { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" }
);
```

Cada path precisa de `pathLength` calculado. Usar `getTotalLength()` no mount.

---

## 8. ESTRATÉGIA DE SCROLL

### Fase 1 (Hero + Nav apenas)

- **Nav dock**: `box-shadow` e `border-color` mudam após scrollY > 40px (já implementado)
- **Hero scroll indicator**: fade out conforme scroll progride (GSAP ScrollTrigger `scrub: true`)
- **Sem scroll hijacking**

### Fases futuras

- Cada seção tem `reveal` animation via ScrollTrigger
- Shapes podem ter parallax leve (`y: -30px` ao scroll) mas não agressivo
- Grid de fundo pode ter parallax inverso (move devagar) para criar profundidade

---

## 9. INTERAÇÕES

### Implementar agora (Fase 1)

| Interação | Elemento | Comportamento |
|---|---|---|
| **Hover CTA** | `.btn` | `border-color` + `color` → `#00DF81`, arrow translateX(4px) |
| **Hover nav item** | `.nav-item` | Color → `--text-pri`, underline scaleX(0→1) |
| **Node pulse** | Nós SVG | Animação CSS contínua, dessincronizada |
| **Scroll nav** | `.nav-dock` | Shadow + border intensificam |
| **Mobile menu** | `.nav-overlay` | Overlay full-screen, links em display size |

### NÃO implementar agora

- Cursor follower / cursor interaction com shapes
- Parallax no mouse
- Shape transformation on scroll
- Hover nos shapes com feedback visual

> Esses elementos são para fases futuras. A skill Frontend Design recomenda: *"Spend your boldness in one place"*. O hero shape system É esse lugar na Fase 1.

---

## 10. TIPOGRAFIA

### Font stack

```css
--font-display: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body:    'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

> [!NOTE]
> Axiforma está preparada via `@font-face` comentado. Quando os arquivos `.woff2` forem fornecidos, basta descomentar e trocar a referência. DM Sans é um fallback adequado — geométrica, clean, pesos 300-600.

### Type scale (decisões concretas)

| Token | Valor | Uso |
|---|---|---|
| `--text-hero` | `clamp(3rem, 6.5vw, 6rem)` | **Aumentar** de 5.5rem para 6rem max — mais impacto |
| `--text-3xl` | `4.5rem` | Section headings display (se necessário) |
| `--text-2xl` | `3rem` | Section headings |
| `--text-xl` | `2rem` | Sub-headings |
| `--text-lg` | `1.5rem` | Large body |
| `--text-md` | `1.125rem` | Medium body |
| `--text-base` | `0.9375rem` | Body text |
| `--text-sm` | `0.8125rem` | Secondary text |
| `--text-xs` | `0.6875rem` | Labels, eyebrows, nav items, meta |

### Tratamento tipográfico por contexto

| Contexto | Weight | Size | Transform | Spacing | Line-height |
|---|---|---|---|---|---|
| **Hero headline** | 600 | `--text-hero` | uppercase | `-0.035em` | 0.95 |
| **Eyebrow** | 500 | `--text-xs` | uppercase | `0.15em` | 1 |
| **Body** | 400 | `--text-base` | none | normal | 1.7 |
| **CTA label** | 500 | `--text-xs` | uppercase | `0.12em` | 1 |
| **Nav items** | 500 | `--text-xs` | uppercase | `0.12em` | 1 |
| **Meta items** | 400 | `--text-xs` | uppercase | `0.12em` | 1 |

### Decisão de letter-spacing no headline

**Atual**: `-0.025em` → **Novo**: `-0.035em`

A referência mostra headlines com tracking tighter. Isso cria mais "massa" tipográfica e impacto. A diferença é sutil mas perceptível.

---

## 11. USO DA PALETA

### Mapeamento funcional concreto

```
BACKGROUNDS
  #021B1A  ← body, hero, seções principais
  #032221  ← seções alternadas (manifesto, tech)
  #06302B  ← seções raised (process)

BORDERS & STRUCTURE
  #142220  ← borders padrão, separators, button border default
  #0E1A17  ← borders muito sutis

SHAPES
  #0B453A  ← stroke principal de shapes (linhas, arcs, grid)
  #095544  ← stroke secundário (planos, diagonais)
  #17876D  ← nós dim

ACCENT (escasso!)
  #00DF81  ← headline accent, nós ativos, CTA hover, status dots (< 10% da superfície)
  #2CC295  ← nós secundários, shapes de média intensidade
  #2FA98C  ← nós terciários

TEXT
  #F1F7F6  ← texto principal, headlines
  #AACBC4  ← texto secundário, subtextos
  #707D7D  ← texto muted, labels, eyebrows, meta

NAV DOCK
  background: rgba(2, 27, 26, 0.92)  ← nav pill background
  border: rgba(11, 69, 58, 0.35)     ← nav pill border
```

### Regra de ouro do verde

> O `#00DF81` é como um LED de status. Se pisca em todos os lugares, não indica nada. Se aparece em pontos precisos, cada ocorrência carrega significado.

---

## 12. RESPONSIVIDADE

### Breakpoints

| Breakpoint | Comportamento Hero |
|---|---|
| **>1200px** | Grid 55/45, shapes full, headline 6rem max |
| **1024-1200px** | Grid 55/45, shapes reduzidos (menos nós, arcos) |
| **768-1024px** | **Grid 1 coluna**, shapes hidden, headline clamp reduzido |
| **<768px** | 1 coluna, sem shapes, meta bar wrap, headline ~2.75rem min |

### Decisões mobile

- **Shapes**: `display: none` abaixo de 1024px — não "encolher", simplesmente remover
- **Grid visual de fundo**: opacity 0.03 abaixo de 768px (quase invisível, dá tom)
- **Nav**: hamburger menu abaixo de 768px (já funciona)
- **Headline**: clamp garante legibilidade; min 3rem
- **Meta bar**: flex-wrap com gap reduzido

---

## 13. PERFORMANCE

### Prioridades

1. **Fonts**: DM Sans via Google Fonts com `display=swap` (já implementado)
2. **SVG inline**: Shapes como JSX — zero network requests, treeshakeable
3. **GSAP**: já instalado (250kb gzipped bundle total com ScrollTrigger). Não adicionar plugins extras
4. **No Three.js**: A referência é 100% resolvível com SVG + CSS. Three.js adicionaria ~150kb+ sem benefício
5. **No Framer Motion**: GSAP já está no bundle. Não duplicar motion engines
6. **CSS-first animations**: Pulses, hovers, transitions → CSS. GSAP só para timelines e scroll

### Bundle estimate (Fase 1)

| Pacote | Tamanho | Justificativa |
|---|---|---|
| React 19 + Next.js 16 | ~90kb gzipped | Framework base |
| GSAP + @gsap/react | ~35kb gzipped | Timelines, ScrollTrigger |
| lucide-react (2 ícones) | ~2kb treeshaken | Arrows, hamburger |
| CSS (globals.css) | ~6kb | Design system |
| **Total JS estimado** | ~127kb gzipped | ✅ Leve |

---

## 14. ARQUITETURA DOS COMPONENTES

### Árvore (Fase 1)

```
src/
├── app/
│   ├── globals.css          ← Design system completo (REFINAR)
│   ├── layout.tsx           ← Metadata, font import
│   └── page.tsx             ← Composição de seções
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx          ← Dock pill (REFINAR)
│   │   └── Footer.tsx       ← (sem alteração Fase 1)
│   │
│   ├── shapes/
│   │   ├── ShapeSystem.tsx  ← [NOVO] 6 primitivos composable
│   │   └── HeroShapes.tsx   ← [REESCREVER] Composição hero usando ShapeSystem
│   │
│   ├── ui/
│   │   ├── Button.tsx       ← (sem alteração)
│   │   └── Logo.tsx         ← (sem alteração)
│   │
│   ├── GSAPAnimations.tsx   ← ScrollTrigger reveals (REFINAR)
│   └── LoadingScreen.tsx    ← (avaliar necessidade)
│
├── sections/
│   ├── Hero.tsx             ← [REFINAR] Maior impacto visual
│   ├── Manifesto.tsx        ← (sem alteração Fase 1)
│   ├── Services.tsx         ← (sem alteração Fase 1)
│   ├── Process.tsx          ← (sem alteração Fase 1)
│   ├── Tech.tsx             ← (sem alteração Fase 1)
│   ├── Hosting.tsx          ← (sem alteração Fase 1)
│   └── Contact.tsx          ← (sem alteração Fase 1)
│
├── data/
│   └── index.ts             ← (sem alteração Fase 1)
│
└── hooks/                   ← (futuro: useScrollProgress, etc.)
```

### Alterações Fase 1

| Arquivo | Ação | Escopo |
|---|---|---|
| `globals.css` | REFINAR | Ajustar `--text-hero`, letter-spacing headline, grid pattern size, opacidades shapes, hero background layers |
| `ShapeSystem.tsx` | CRIAR | Componentes SVG para cada primitivo. Interface composable |
| `HeroShapes.tsx` | REESCREVER | Usar `ShapeSystem`, composição mais densa, mais intensa, GSAP draw animations |
| `Hero.tsx` | REFINAR | Ajustar headline sizing, adicionar layers de background (grid + glow), GSAP timeline combinada |
| `Nav.tsx` | REFINAR | Micro-polishments no dock (padding, border radius consistency) |
| `page.tsx` | SEM ALTERAÇÃO | Estrutura já correta |
| `GSAPAnimations.tsx` | REFINAR | Garantir ScrollTrigger funciona com novo Hero |

---

## 15. DEPENDÊNCIAS

### Manter
| Pacote | Versão | Razão |
|---|---|---|
| `next` | 16.3.3 | Framework principal |
| `react` / `react-dom` | 19.2.8 | UI runtime |
| `gsap` / `@gsap/react` | ^3.15.0 / ^2.1.2 | Animações, timelines, ScrollTrigger |
| `lucide-react` | ^1.37.0 | Ícones mínimos (arrow, hamburger) |

### NÃO instalar
| Pacote | Razão |
|---|---|
| `three` / `@react-three/fiber` | SVG + GSAP resolvem tudo. Three.js adicionaria ~150kb+ sem benefício visual demonstrável |
| `framer-motion` | GSAP já é o motion engine. Duplicar não agrega |
| `tailwindcss` | Removido. Vanilla CSS com tokens |
| React Bits (como dependência) | Componentes de referência, não dependência. Se algum pattern servir, reimplementar com CSS próprio |
| Skiper UI | Baseado em shadcn/Tailwind — incompatível com nossa stack vanilla CSS |
| OriginKit | Referência de patterns animados. Não instalar — inspirar-se no conceito quando necessário |

### Avaliação das bibliotecas de referência

| Biblioteca | Veredicto | Justificativa |
|---|---|---|
| **React Bits** | 🔶 Inspiração | Tem patterns interessantes de text animation e backgrounds. Não instalar — reimplementar conceitos relevantes em CSS/SVG. Maioria depende de Framer Motion que não usamos |
| **Skiper UI** | ❌ Descartado | Depende de shadcn/ui + Tailwind. Incompatível com nossa stack Vanilla CSS. Componentes premium são pagos |
| **OriginKit** | 🔶 Inspiração | Boas referências de animated components. Copiar-colar com adaptação quando um pattern específico servir. Não como dependência |
| **GSAP** | ✅ Usar | Já instalado. Essential para timelines do Hero, ScrollTrigger, draw animations |
| **Three.js** | ❌ Não usar | A referência demonstra que SVG + CSS resolvem todo o shape system. Three.js não traria benefício visual proporcional ao custo de bundle e complexidade |

---

## ANÁLISE DAS SKILLS

### Caveman

**Aplicação**: Ativar em modo `full` durante implementação para economizar tokens. Respostas diretas, sem fluff. Código inalterado. Warnings em linguagem clara quando necessário.

### Frontend Design

**Princípios aplicados neste plano**:

1. *"The hero is a thesis"* → Hero abre com shapes + headline que DEMONSTRAM engenharia, não apenas falam sobre
2. *"Typography carries personality"* → DM Sans 600 com tracking -0.035em, uppercase, line-height 0.95 — massa tipográfica como assinatura
3. *"Structure is information"* → Os números nos serviços (01-05) fazem sentido porque SÃO uma sequência categorizada
4. *"Spend your boldness in one place"* → O shape system do Hero é O elemento memorável. Tudo ao redor fica quieto
5. *"Critique your own work"* → Este plano já identifica 5 problemas do estado atual e propõe correções concretas
6. *"Brainstorm → plan → critique → build"* → Este documento é a etapa de plan + critique. Build vem depois da aprovação

---

## ORDEM DE IMPLEMENTAÇÃO (Fase 1)

> [!IMPORTANT]
> Sequência proposta para implementação incremental após aprovação:

| # | Tarefa | Dependências |
|---|---|---|
| **1** | Refinar `globals.css` — ajustar tokens (`--text-hero`, letter-spacing, grid size) | Nenhuma |
| **2** | Criar `ShapeSystem.tsx` — 6 primitivos SVG composable | Tokens do CSS |
| **3** | Reescrever `HeroShapes.tsx` — composição usando ShapeSystem, mais intensa | ShapeSystem |
| **4** | Refinar `Hero.tsx` — background layers, headline sizing, GSAP timeline combinada | HeroShapes, CSS |
| **5** | Refinar `Nav.tsx` — micro-polishments | CSS |
| **6** | Testar no browser | Tudo acima |
| **7** | Iterar baseado no visual — ajustar opacidades, tamanhos, timing | Visual feedback |

---

## PERGUNTAS PARA APROVAÇÃO

> [!IMPORTANT]
> Antes de implementar, preciso confirmar:

### 1. Axiforma
Você tem os arquivos `.woff2` da Axiforma? Posso prosseguir com DM Sans como fallback e deixar o `@font-face` preparado.

### 2. Headline text
A referência usa "ENGENHARIA DIGITAL PARA IDEIAS REAIS." — manter essa headline ou explorar alternativas?

### 3. Intensidade dos shapes
O plano propõe **aumentar significativamente** a presença dos shapes (opacidades maiores, mais elementos). Confirma essa direção?

### 4. Escopo da Fase 1
Confirmar que a Fase 1 é: **CSS refinado + ShapeSystem + HeroShapes + Hero refinado + Nav refinado**. Sem tocar nas outras seções ainda.
