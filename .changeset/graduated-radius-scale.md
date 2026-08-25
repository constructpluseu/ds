---
"@constructpluseu/tokens": minor
---

Introduz uma escala real de raio de canto: `sm`/`md`/`lg`/`xl`/`2xl`/`3xl` deixam de ser todos
iguais a `0.3125rem` (5px) — cada um passa a ter um valor distinto (`4px`/`6px`/`10px`/`16px`/
`20px`/`24px`), dando hierarquia visual real entre superfícies pequenas (checkbox, badges),
médias (inputs, menus) e grandes (cartões, modais, botões). `none` e `full` mantêm-se
inalterados. Como a esmagadora maioria dos componentes já referenciava o token semanticamente
correto para a sua escala (ex.: `checkbox` em `sm`, `card`/`modal`/`button` em `xl`), este é
principalmente um ajuste de valores — não de que token cada componente usa — mas é uma mudança
visual visível em todos os consumidores, por isso versionado como `minor`.
