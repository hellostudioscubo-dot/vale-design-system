# Vale Design System

Design system em React + TypeScript + Tailwind CSS, gerado a partir do arquivo
Figma **[Vale — App de estudos](https://www.figma.com/design/CiJCwsSvwdxtorWL8uUHQQ/Vale-%E2%80%94-App-de-estudos?node-id=394-2)**
— páginas **Foundations** e **Components**.

Publicado no npm: **[`vale-design-system`](https://www.npmjs.com/package/vale-design-system)**
(`npm install vale-design-system`).

## Stack

- **React 18 + TypeScript** — componentes tipados de ponta a ponta.
- **Tailwind CSS** — estilização via tokens (ver `tailwind.config.ts`), sem valores mágicos.
- **Radix UI** — primitivas acessíveis por baixo dos componentes interativos (Dialog, Switch, Progress, Label, Collapsible).
- **class-variance-authority (cva)** — variantes tipadas (`variant`, `size`…) em vez de strings soltas.
- **Storybook 8** — uma story por componente, com o addon de acessibilidade (`@storybook/addon-a11y`) rodando em cada uma.
- **Vite** — dev server e build.

## Estrutura de pastas

```
src/
├── tokens/          Cores, tipografia, espaçamento, raio e sombra — os valores crus,
│                    portados 1:1 das variáveis/estilos do Figma (Foundations). Inclui
│                    `semanticDark` — tokens de dark mode, não vêm do Figma (ver abaixo).
├── foundations/     Fundações usáveis em código: primitivo de Tipografia (<Text/>)
│                    + stories de documentação (Colors, Spacing, Radius, Shadows, Logo).
├── icons/           Ícones SVG (traço 1.5px, grade 24×24 — Foundations → Icons).
├── assets/          Assets reais exportados do Figma — NÃO publicados no pacote npm
│                    (ver "Assets" abaixo):
│   ├── companions/  18 fotos (3 estágios × 6 cores) do Egg Card.
│   └── brand/       Ícone do app (SVG) e wordmark "Vale" (PNG, 3 cores).
├── components/      Componentes de UI, em Atomic Design:
│   ├── atoms/       Button, Input, Chip, Toggle, ProgressBar, ProgressRing,
│   │                NumberBlock, NavItem, ThemeToggle — não dependem de outro
│   │                componente do DS.
│   ├── molecules/   Card, MonthStrip, EggCard — compõem átomos.
│   └── organisms/   Navbar, Modal — compõem átomos/moléculas em blocos completos de tela.
├── hooks/           `useTheme` — toggle de dark mode persistido (não vem do Figma).
├── lib/             Utilitário `cn()` (clsx + tailwind-merge).
├── test/            `setup.ts` — configuração global do Vitest (jest-dom, jest-axe,
│                    mock de matchMedia pro jsdom).
├── index.ts         Ponto de entrada da biblioteca publicada no npm.
├── App.tsx          Demo viva combinando os componentes (tela "Hoje").
└── index.css        Diretivas do Tailwind + tokens de tema (light/dark) + import das
                     fontes (Fraunces, Poppins).
```

Cada componente vive em sua própria pasta com três arquivos:
`Componente.tsx`, `Componente.stories.tsx` e `index.ts` (barrel export).

## Tokens semânticos

`tokens/colors.ts` expõe duas camadas, no mesmo espírito da coleção "Cor" no Figma:

- `palette` — primitivos crus (`roxo`, `grafite`, `salvia`…), nomeados como no Figma.
- `semantic` — papéis (`primary`, `textSecondary`, `success`…) que apontam para a palette.

**Componentes devem consumir apenas os tokens semânticos** (via classes Tailwind como
`bg-primary`, `text-text-secondary`, `border-border`) — nunca a palette diretamente.
Isso significa que a paleta pode mudar (rebrand, dark mode) sem tocar em nenhum componente.

O mesmo padrão vale para espaçamento (`spacing`), raio (`radius`) e sombra (`shadows`):
os valores vêm de `tokens/*.ts` e são expostos ao Tailwind em `tailwind.config.ts`.

## Dark mode

Não vem do Figma — o arquivo só define um tema claro. Infraestrutura própria:

- `tokens/colors.ts` (`semanticDark`) define um conjunto **deliberadamente restrito** de
  overrides escuros: só tokens neutros (superfície, borda, texto, desabilitado) e a
  família `*OnSurface` (cor de marca usada como texto direto sobre a superfície) mudam
  por tema. Fills de marca e tintas `*Subtle`/`*Strong` (Chip, Card concluído) mantêm
  um valor só, porque seu contraste interno não depende do tema da página — só do
  próprio fundo, que não muda. Cada valor tem sua razão de contraste comentada no código.
- Variáveis CSS (`index.css`) + `withOpacity()` (`tailwind.config.ts`) fazem as classes
  existentes (`bg-surface`, `text-text-secondary`…) mudarem de cor sob `.dark` em
  `<html>`, sem precisar de `dark:` em nenhum componente.
- `hooks/useTheme.ts` + `<ThemeToggle />`: alternância persistida (localStorage) com
  fallback para `prefers-color-scheme` e script anti-flash em `index.html`.
- Toolbar do Storybook (`.storybook/preview.tsx`) para pré-visualizar qualquer story
  nos dois temas.

## Assets

`src/assets/` tem os assets reais exportados do Figma em 2026-09-09 (fotos do Egg Card,
ícone do app, wordmark) — usados pelo Storybook e pela demo (`npm run dev`), mas
**deliberadamente fora do pacote publicado no npm** (7,9MB, seria +27× o tamanho do
pacote hoje). Quem instala via `npm install vale-design-system` continua fornecendo sua
própria `imageSrc` para `EggCard`, como já era documentado. Se quiser usar as fotos
reais fora deste repositório, copie `src/assets/companions/` e `src/assets/brand/`.

## Acessibilidade

- Todo componente interativo usa uma primitiva Radix por baixo (foco, Escape, roles ARIA
  e `aria-*` corretos vêm de fábrica) em vez de reimplementar teclado/ARIA na mão.
- Nenhum estado é só visual: `disabled` é o atributo nativo, `error` vira `aria-invalid` +
  `aria-describedby` no `Input`, `selected` vira `aria-current="page"` no `NavItem`.
- Foco visível global (`:focus-visible`) em `index.css` — nunca removido sem substituto.
- Alvo de toque mínimo de 44×44px (`min-h-touch`/`min-w-touch`) nos componentes interativos,
  documentando a regra de acessibilidade do Figma (Foundations → Accessibility).
- O Storybook roda com `@storybook/addon-a11y` (`test: "error"` em `.storybook/preview.tsx`),
  então qualquer PR que adicionar uma story com violação de acessibilidade falha visivelmente
  no painel de Accessibility.
- Todo componente tem um teste `jest-axe` (`toHaveNoViolations`) no CI — a mesma checagem do
  addon do Storybook, mas rodável sem navegador (ver "Testes" abaixo).

## Testes

`npm test` roda Vitest + Testing Library + jest-dom + jest-axe (jsdom, sem navegador).
Cada componente tem um `Componente.test.tsx` ao lado do seu `.tsx`, cobrindo:

- **Renderização e interação** — o que um usuário realmente vê/faz (clicar, digitar,
  abrir/fechar), não detalhes de implementação.
- **Comportamento de acessibilidade** que o próprio componente promete no seu doc comment
  (`aria-current`, `aria-invalid`+`aria-describedby`, `disabled` nativo…) — não só que ele
  existe, mas que reage certo a props/interação.
- **`jest-axe`** em cada variante relevante — captura os mesmos problemas que o addon de
  a11y do Storybook, só que sem precisar abrir o navegador.

Dois arquivos testam infraestrutura em vez de um componente:
- `src/lib/utils.test.ts` — regressão direta do bug do `cn()` documentado em `utils.ts`
  (classes de tamanho de fonte sendo confundidas com cor de texto).
- `src/tokens/colors.test.ts` — calcula contraste WCAG de verdade (fórmula da própria
  spec, não uma lib externa) para cada par texto/fundo em `semantic`/`semanticDark`.
  Foi assim que os três bugs de contraste do dark mode foram achados nesta sessão —
  este teste existe pra eles não voltarem.

```bash
npm test              # roda uma vez (CI)
npm run test:watch    # modo watch, pra desenvolvimento
npm run test:coverage # com relatório de cobertura (v8)
```

## Como rodar

```bash
npm install

# Storybook — catálogo de componentes com Foundations + Components
npm run storybook

# Vite — demo viva combinando os componentes numa tela
npm run dev

# Build de produção da demo (dist/ a partir de index.html)
npm run build

# Build da biblioteca publicável (dist/index.js, index.cjs, index.d.ts, style.css)
npm run build:lib

# Publicar uma nova versão no npm (roda build:lib via prepublishOnly)
npm version patch   # ou minor/major
npm publish
```

## Do Figma para o código — mapeamento

| Figma (Components)     | Código                                    | Camada    |
|-------------------------|--------------------------------------------|-----------|
| Button                  | `components/atoms/Button`                  | átomo     |
| Input                   | `components/atoms/Input`                   | átomo     |
| Chip                    | `components/atoms/Chip`                    | átomo     |
| Toggle                  | `components/atoms/Toggle`                  | átomo     |
| Progress Bar            | `components/atoms/ProgressBar`              | átomo     |
| Progress Ring           | `components/atoms/ProgressRing`             | átomo     |
| Number Block            | `components/atoms/NumberBlock`              | átomo     |
| Nav Item                | `components/atoms/NavItem`                  | átomo     |
| *(não vem do Figma)*    | `components/atoms/ThemeToggle`              | átomo     |
| Card                    | `components/molecules/Card`                 | molécula  |
| Month Strip             | `components/molecules/MonthStrip`           | molécula  |
| Egg Card                | `components/molecules/EggCard`              | molécula  |
| Navbar                  | `components/organisms/Navbar`               | organismo |
| Modal                   | `components/organisms/Modal`                | organismo |

Cada mapeamento também é documentado no cabeçalho JSDoc do respectivo arquivo `.tsx`,
com o link de volta para a seção correspondente no Figma.
