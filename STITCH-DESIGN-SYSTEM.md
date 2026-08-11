# Construct+ Design System — Brief para Google Stitch

Use este documento como contexto de design system ao gerar ecrãs no Google Stitch, para manter
consistência visual com o produto real da Construct Plus.

## 1. Sobre o produto

**Construct Plus** é um SaaS B2B de gestão de obras para o mercado português/UE (construção
civil, reabilitação, engenharia). O público é profissional — gestores de obra, engenheiros,
equipas administrativas e financeiras. O tom visual é **sólido, direto e confiável**, nunca lúdico
ou "startup colorida": pense em ferramentas de gestão profissional, não em apps de consumo.

## 2. Cor

### Paleta de marca

| Papel | Cor | Hex |
|---|---|---|
| Primária (marca) | Navy profundo | `#0D2137` |
| Primária — hover | Navy médio | `#163352` |
| Primária — escala clara | Navy claro | `#2C4A6E` |
| Destaque / CTA (accent) | Verde-menta | `#3EC98E` |
| Destaque — hover | Verde-menta claro | `#4DD29A` |
| Destaque — ativo | Verde-menta escuro | `#2BAA74` |

### Neutros

| Papel | Hex |
|---|---|
| Fundo de página (canvas) | `#F7F9FC` |
| Fundo de superfície (cartões, campos, modais) | `#FFFFFF` |
| Fundo de superfície secundária | `#F0F4F8` |
| Texto principal | `#0D2137` (navy 700) |
| Texto secundário / legendas | `#475569` (gray 600) |
| Texto placeholder / desativado | `#94A3B8` (gray 400) |
| Borda padrão | `#E2E8F0` (gray 200) |
| Borda forte | `#CBD5E1` (gray 300) |

### Cores de estado (semânticas)

| Estado | Texto | Fundo subtil | Borda |
|---|---|---|---|
| Sucesso | `#145A3D` | `rgba(62,201,142,0.12)` | `#5DDBA2` |
| Aviso | `#B45309` | `rgba(245,158,11,0.12)` | `#FBBF24` |
| Erro / perigo | `#B91C1C` | `rgba(220,38,38,0.12)` | `#F87171` |
| Informação | `#1D4ED8` | `rgba(37,99,235,0.12)` | `#60A5FA` |

### Regras de uso

- A cor primária (navy) é usada para fundos de marca, texto principal e botões primários.
- O verde-menta é reservado para **ações de destaque/conversão** e indicadores de sucesso/ESG —
  não usar como cor de fundo geral, só como acento.
- Nunca comunicar um estado (erro, sucesso, aviso) só pela cor — sempre combinar com texto ou ícone.
- O produto suporta tema claro e escuro; no tema escuro o navy e o branco invertem papéis e o
  verde-menta mantém-se como accent em ambos.

## 3. Tipografia

- **Família única**: Inter (fallback: `Segoe UI`, system-ui, sans-serif). Não usar serifadas nem
  fontes decorativas em nenhum lugar da interface.
- **Pesos**: regular (400) para corpo de texto, medium (500) para labels e ênfase leve, semibold
  (600) para títulos de secção e botões, bold (700) para títulos de página.

| Escala | Tamanho | Uso típico |
|---|---|---|
| xs | 12px | Legendas, metadados, texto de ajuda |
| sm | 14px | Corpo de texto em campos e tabelas densas |
| md | 16px | Corpo de texto padrão |
| lg | 18px | Subtítulos, texto de destaque |
| xl | 20px | Título de cartão/secção |
| 2xl | 24px | Título de página (H2) |
| 3xl | 30px | Título principal (H1) |
| 4xl+ | 36px+ | Hero/landing apenas |

Altura de linha: 1.2 para títulos (tight), 1.5 para corpo de texto (normal).

## 4. Espaçamento e grelha

Escala de espaçamento em incrementos de 4px (base `0.25rem`): **4, 8, 12, 16, 20, 24, 32, 40, 48,
64, 80, 96px**. Usar sempre um valor da escala — nunca valores arbitrários (ex.: 13px, 22px).

- Padding interno de campos e botões: 8–12px vertical, 16px horizontal.
- Espaçamento entre campos de um formulário: 16–24px.
- Espaçamento entre secções de uma página: 32–48px.
- Margem de página em ecrã largo: 24–32px; em ecrã estreito (mobile): 16px.

## 5. Cantos e elevação

- **Raio de canto**: valor único de `5px` em todos os elementos (botões, campos, cartões, modais,
  tags) — sem escala progressiva. Tags/badges e avatares circulares continuam a usar raio total
  (pill/círculo), que é um valor à parte, não faz parte desta escala.
- **Sombras**: subtis, nunca dramáticas. Cartões usam uma sombra muito leve
  (`0 2px 12px rgba(13,33,55,0.08)`); modais e popovers usam uma sombra mais pronunciada
  (`0 8px 24px rgba(13,33,55,0.12)`). Elementos de destaque (CTA em foco) podem usar uma sombra
  verde suave (`0 8px 32px rgba(62,201,142,0.25)`) em vez de preta.
- **Foco de teclado**: sempre um anel de 2px na cor de destaque (verde-menta), nunca a cor de
  fundo do próprio elemento — precisa de ser visível em qualquer superfície.

## 6. Biblioteca de componentes

O design system tem ~35 componentes, organizados em 5 categorias. Ao gerar ecrãs, componha a
partir destes blocos em vez de inventar padrões novos.

### Ações
- **Button** — variantes: primary (navy), accent (verde-menta, para conversão), secondary
  (contorno), ghost (sem fundo), danger (vermelho, ações destrutivas). Canto levemente
  arredondado (5px). Rótulo sempre num verbo.

### Formulário
- **Text Input**, **Textarea**, **Number Input** — campo com label sempre visível acima, borda
  cinza fina, foco com anel verde.
- **Select** — para até ~7 opções fixas.
- **Combobox / Multiselect** — lista longa com filtro por digitação, opção de tags removíveis no
  modo múltiplo.
- **Checkbox**, **Radio Button**, **Toggle** — controlos binários/múltiplos padrão.
- **Date Picker** — campo só de leitura + calendário sobreposto.
- **Slider** — seleção de valor por arrasto.
- **Search** — campo com ícone de lupa e botão de limpar.
- **File Uploader** — zona de arrastar-e-largar com contorno tracejado.

### Feedback e estado
- **Tooltip** — texto curto no hover/foco.
- **Toggletip** — como tooltip, mas acionado por clique, com conteúdo interativo.
- **Modal** — sobrepõe o ecrã inteiro com um fundo escurecido (overlay), usado para confirmações
  e formulários curtos.
- **Notification** — toast (canto do ecrã, desaparece sozinho) ou inline (persistente, dentro do
  fluxo da página); ambos com variantes de sucesso/aviso/erro/informação.
- **Progress Bar**, **Loading Spinner**, **Skeleton** — estados de carregamento.

### Layout e exibição de dados
- **Card** — superfície com sombra leve, agrupa informação relacionada.
- **Tag / Badge** — rótulo curto e arredondado (pill) para estado/categoria.
- **Avatar** — imagem ou iniciais, circular.
- **Tile** — cartão clicável, usado como atalho/módulo no dashboard.
- **Structured List** — lista tabular simples.
- **Data Table** — tabela densa com cabeçalhos ordenáveis (seta ▲/▾) e checkboxes de seleção de
  linha à esquerda.
- **Tree View** — hierarquia expansível com indentação e setas ▸/▾.

### Navegação e disclosure
- **Tabs**, **Accordion** — alternância/disclosure de conteúdo.
- **Breadcrumb**, **Pagination**, **Link**, **List** — navegação básica.
- **Dropdown Menu**, **Popover** — painéis contextuais ancorados a um botão.
- **Navegação (Shell)**: **Header** (barra superior fixa em navy, com marca à esquerda e ações à
  direita) + **Side Nav** (menu lateral em fundo branco, itens com ícone opcional, secções
  expansíveis, item ativo destacado com fundo verde subtil e texto verde).

## 7. Tom de voz e conteúdo

- Português europeu (pt-PT), nunca pt-BR — vocabulário: "obra", "orçamento", "faturação",
  "vistoria", "aprovisionamento", nunca "cronograma"/"celular"/gerúndios contínuos.
- Direto e profissional, sem gírias nem exclamações excessivas. Botões usam verbo no
  infinitivo/imperativo: "Guardar obra", "Criar orçamento", nunca "Vamos lá!" ou floreios.
- Mensagens de erro dizem o que fazer para corrigir, não só o que está errado.
- Rótulos e títulos nomeiam a coisa concreta ("Data de início da obra"), nunca genéricos
  ("Data", "Campo 1").

## 8. Layout típico de aplicação

Uma página autenticada normal segue esta estrutura:

```
┌───────────────────────────────────────────────┐
│ Header (navy, fixo no topo)                    │
├───────────┬─────────────────────────────────────┤
│           │ Título da página (H1, navy)          │
│ Side Nav  │ Ações da página (botões, à direita)  │
│ (branco)  ├─────────────────────────────────────┤
│           │ Conteúdo: cards, tabela ou formulário│
│           │ sobre fundo canvas (cinza muito claro)│
└───────────┴─────────────────────────────────────┘
```

## 9. O que evitar

- Cores vivas/saturadas fora da paleta (roxo, rosa, laranja vibrante) — não fazem parte da marca.
- Cantos totalmente quadrados ou raio exagerado (estilo app de consumo) — a marca usa um
  arredondamento discreto e consistente, nunca os dois extremos.
- Fontes serifadas, itálico decorativo, ou mais do que uma família tipográfica.
- Ilustrações "fofas"/cartoon — se precisar de imagem, prefira fotografia real de obras ou
  ícones lineares simples.
- Densidade de informação excessiva sem espaçamento — é uma ferramenta profissional, mas a
  legibilidade nunca deve ser sacrificada por caber mais na tela.
