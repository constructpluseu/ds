export type ComponentStatus = "disponivel" | "planeado";

export interface ComponentEntry {
  slug: string;
  nome: string;
  categoria: string;
  descricao: string;
  status: ComponentStatus;
}

export const componentCategories = [
  "Ações",
  "Formulário",
  "Feedback e estado",
  "Layout e exibição de dados",
  "Navegação e disclosure",
] as const;

export const componentRegistry: ComponentEntry[] = [
  // Ações
  {
    slug: "button",
    nome: "Button",
    categoria: "Ações",
    descricao: "Dispara uma ação imediata: guardar, avançar, cancelar ou eliminar.",
    status: "disponivel",
  },

  // Formulário
  {
    slug: "text-input",
    nome: "Text Input",
    categoria: "Formulário",
    descricao: "Campo de texto de uma linha para dados curtos (nome, NIF, email).",
    status: "disponivel",
  },
  {
    slug: "textarea",
    nome: "Textarea",
    categoria: "Formulário",
    descricao: "Campo de texto multilinha para descrições e notas mais longas.",
    status: "disponivel",
  },
  {
    slug: "select",
    nome: "Select",
    categoria: "Formulário",
    descricao: "Escolha de uma opção entre uma lista curta e conhecida.",
    status: "disponivel",
  },
  {
    slug: "checkbox",
    nome: "Checkbox",
    categoria: "Formulário",
    descricao: "Escolha binária ou seleção múltipla independente numa lista.",
    status: "disponivel",
  },
  {
    slug: "radio-button",
    nome: "Radio Button",
    categoria: "Formulário",
    descricao: "Escolha única e mutuamente exclusiva entre 2 a 5 opções visíveis.",
    status: "disponivel",
  },
  {
    slug: "toggle",
    nome: "Toggle",
    categoria: "Formulário",
    descricao: "Liga/desliga uma definição com efeito imediato.",
    status: "disponivel",
  },
  {
    slug: "number-input",
    nome: "Number Input",
    categoria: "Formulário",
    descricao: "Campo numérico com incremento/decremento e limites de valor.",
    status: "disponivel",
  },
  {
    slug: "search",
    nome: "Search",
    categoria: "Formulário",
    descricao: "Campo dedicado à procura de obras, materiais ou contactos.",
    status: "disponivel",
  },
  {
    slug: "combobox",
    nome: "Combobox / Multiselect",
    categoria: "Formulário",
    descricao: "Escolha com filtro por digitação, única ou múltipla, em listas longas.",
    status: "disponivel",
  },
  {
    slug: "slider",
    nome: "Slider",
    categoria: "Formulário",
    descricao: "Seleção de um valor ou intervalo numérico por arrasto.",
    status: "disponivel",
  },
  {
    slug: "file-uploader",
    nome: "File Uploader",
    categoria: "Formulário",
    descricao: "Carregamento de ficheiros e fotografias (autos, comprovativos, plantas).",
    status: "disponivel",
  },
  {
    slug: "date-picker",
    nome: "Date Picker",
    categoria: "Formulário",
    descricao: "Seleção de uma única data em calendário (prazos, faturação, garantias).",
    status: "disponivel",
  },

  // Feedback e estado
  {
    slug: "tooltip",
    nome: "Tooltip",
    categoria: "Feedback e estado",
    descricao: "Explicação curta e contextual associada a um elemento no foco/hover.",
    status: "disponivel",
  },
  {
    slug: "modal",
    nome: "Modal",
    categoria: "Feedback e estado",
    descricao: "Interrompe o fluxo para confirmar, focar ou recolher uma ação crítica.",
    status: "disponivel",
  },
  {
    slug: "notification",
    nome: "Notification",
    categoria: "Feedback e estado",
    descricao: "Confirma o resultado de uma ação (toast) ou comunica algo persistente (inline).",
    status: "disponivel",
  },
  {
    slug: "progress-bar",
    nome: "Progress Bar",
    categoria: "Feedback e estado",
    descricao: "Indica o progresso de uma operação com duração previsível.",
    status: "disponivel",
  },
  {
    slug: "skeleton",
    nome: "Skeleton",
    categoria: "Feedback e estado",
    descricao: "Marcador de posição enquanto o conteúdo real está a carregar.",
    status: "disponivel",
  },
  {
    slug: "loading",
    nome: "Loading Spinner",
    categoria: "Feedback e estado",
    descricao: "Indicador de carregamento sem progresso mensurável.",
    status: "disponivel",
  },

  // Layout e exibição de dados
  {
    slug: "card",
    nome: "Card",
    categoria: "Layout e exibição de dados",
    descricao: "Agrupa informação relacionada numa superfície com fronteira visual própria.",
    status: "disponivel",
  },
  {
    slug: "tag",
    nome: "Tag / Badge",
    categoria: "Layout e exibição de dados",
    descricao: "Rótulo curto de estado, categoria ou classificação.",
    status: "disponivel",
  },
  {
    slug: "avatar",
    nome: "Avatar",
    categoria: "Layout e exibição de dados",
    descricao: "Representa uma pessoa ou equipa através de imagem ou iniciais.",
    status: "disponivel",
  },
  {
    slug: "tile",
    nome: "Tile",
    categoria: "Layout e exibição de dados",
    descricao: "Superfície clicável que representa um módulo, obra ou atalho.",
    status: "disponivel",
  },
  {
    slug: "structured-list",
    nome: "Structured List",
    categoria: "Layout e exibição de dados",
    descricao: "Lista tabular simples para conjuntos de dados sem paginação complexa.",
    status: "disponivel",
  },
  {
    slug: "data-table",
    nome: "Data Table",
    categoria: "Layout e exibição de dados",
    descricao: "Tabela densa com ordenação por coluna e seleção de linhas para ações em lote.",
    status: "disponivel",
  },
  {
    slug: "tree-view",
    nome: "Tree View",
    categoria: "Layout e exibição de dados",
    descricao: "Hierarquia navegável e expansível (ex.: estrutura de pastas de uma obra).",
    status: "disponivel",
  },

  // Navegação e disclosure
  {
    slug: "tabs",
    nome: "Tabs",
    categoria: "Navegação e disclosure",
    descricao: "Alterna entre vistas relacionadas dentro do mesmo contexto.",
    status: "disponivel",
  },
  {
    slug: "accordion",
    nome: "Accordion",
    categoria: "Navegação e disclosure",
    descricao: "Revela e oculta secções de conteúdo para reduzir densidade visual.",
    status: "disponivel",
  },
  {
    slug: "breadcrumb",
    nome: "Breadcrumb",
    categoria: "Navegação e disclosure",
    descricao: "Mostra a posição atual numa hierarquia de navegação.",
    status: "disponivel",
  },
  {
    slug: "pagination",
    nome: "Pagination",
    categoria: "Navegação e disclosure",
    descricao: "Navega entre páginas de um conjunto de resultados.",
    status: "disponivel",
  },
  {
    slug: "menu",
    nome: "Dropdown Menu",
    categoria: "Navegação e disclosure",
    descricao: "Lista de ações contextuais acionada a partir de um botão ou ícone.",
    status: "disponivel",
  },
  {
    slug: "popover",
    nome: "Popover",
    categoria: "Navegação e disclosure",
    descricao: "Painel flutuante com conteúdo rico ancorado a um elemento.",
    status: "disponivel",
  },
  {
    slug: "toggletip",
    nome: "Toggletip",
    categoria: "Navegação e disclosure",
    descricao: "Tooltip acionado por clique/toque, com conteúdo interativo acessível.",
    status: "disponivel",
  },
  {
    slug: "shell",
    nome: "Navegação (Shell)",
    categoria: "Navegação e disclosure",
    descricao: "Cabeçalho e menu lateral que enquadram toda a aplicação.",
    status: "disponivel",
  },
  {
    slug: "link",
    nome: "Link",
    categoria: "Navegação e disclosure",
    descricao: "Navegação textual para dentro ou fora da aplicação.",
    status: "disponivel",
  },
  {
    slug: "list",
    nome: "List",
    categoria: "Navegação e disclosure",
    descricao: "Lista simples ordenada ou não ordenada de itens relacionados.",
    status: "disponivel",
  },
];

export function getComponentsByCategory(categoria: string): ComponentEntry[] {
  return componentRegistry.filter((c) => c.categoria === categoria);
}

export function getComponent(slug: string): ComponentEntry | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}
