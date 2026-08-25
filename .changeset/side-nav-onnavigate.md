---
"@constructpluseu/react": minor
"@constructpluseu/vue": minor
"@constructpluseu/angular": minor
---

Adiciona um callback/evento `onNavigate` (React) / `navigate` (Vue, Angular) opcional ao `SideNav`,
chamado ao clicar num item folha antes da navegação nativa do `<a>`. Chamar
`event.preventDefault()` cancela o `href`, permitindo integrar um router client-side (React
Router, Next.js `useRouter`, Vue Router, Angular `Router`) ou validar permissões antes de navegar
— sem precisar de substituir os `<a>` internos do componente por um adaptador externo. `href`
continua a ser obrigatório e a navegação por defeito (sem handler) mantém-se inalterada — mudança
aditiva e retrocompatível.
