---
"@constructpluseu/tokens": patch
---

Corrige referências a `--cp-color-semantic-accent-default`/`-hover`, usadas em 6 sítios
(DataTable, DatePicker, FileUploader, SideNav e a navegação ativa do site de documentação) sem
nunca terem sido declaradas como token — o motor CSS descartava-as silenciosamente, deixando o
resultado dependente de herança (nomeadamente `color`, por ser uma propriedade herdada).

O problema real era uma lacuna na taxonomia: `bg.accent`/`-hover`/`-active` (para preenchimentos)
já existiam, mas não havia equivalente para usar o acento como cor de primeiro plano (texto,
ícone, borda). Adiciona `text.accent`, `icon.accent` e `border.accent` (claro: `mint.900`/
`mint.500`, mesmo padrão de contraste de `text.success`/`border.focus`; escuro: `mint.300`/
`mint.400`) e atualiza cada um dos 6 usos para o token correto — os que precisavam de
preenchimento passam a usar `bg.accent`/`bg.accent-hover` já existentes, os que precisavam de
primeiro plano usam os três tokens novos.

Corrige também o aviso do Style Dictionary "filtered out token references" emitido ao gerar
`tokens-dark.css`: o build do tema escuro filtra para só emitir tokens `color.semantic.*`, mas
`outputReferences: true` continuava a gerar `var(--cp-color-base-*)` para referências a tokens de
base excluídos desse ficheiro — funcionava por acaso, só porque `tokens-dark.css` é sempre
concatenado a seguir a `tokens-light.css` (que já declara essas variáveis) e nenhum token de base
ainda difere entre temas. Passa a usar `outputReferencesFilter` (utilitário oficial do Style
Dictionary para este cenário), que resolve para o valor literal qualquer referência a um token
filtrado — `tokens-dark.css` fica correto e autocontido mesmo se importado isoladamente.
