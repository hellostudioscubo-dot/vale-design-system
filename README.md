# Vale Design System

Design system em React + TypeScript + Tailwind CSS, gerado a partir do arquivo
Figma **[Vale — App de estudos](https://www.figma.com/design/CiJCwsSvwdxtorWL8uUHQQ/Vale-%E2%80%94-App-de-estudos?node-id=394-2)**
— páginas **Foundations** e **Components**.

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
│                    portados 1:1 das variáveis/estilos do Figma (Foundations).
├── foundations/     Fundações usáveis em código: primitivo de Tipografia (<Text/>)
│                    + stories de documentação (Colors, Spacing, Radius, Shadows).
├── icons/           Ícones SVG (traço 1.5px, grade 24×24 — Foundations → Icons).
├── components/      Componentes de UI, em Atomic Design:
│   ├── atoms/       Button, Input, Chip, Toggle, ProgressBar, ProgressRing,
│   │                NumberBlock, NavItem — não dependem de outro componente do DS.
│   ├── molecules/   Card, MonthStrip, EggCard — compõem átomos.
│   └── organisms/   Navbar, Modal — compõem átomos/moléculas em blocos completos de tela.
├── lib/             Utilitário `cn()` (clsx + tailwind-merge).
├── App.tsx          Demo viva combinando os componentes (tela "Hoje").
└── index.css        Diretivas do Tailwind + import das fontes (Fraunces, Poppins).
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

## Acessibilidade

- Todo componente interativo usa uma primitiva Radix por baixo (foco, Escape, roles ARIA
  e `aria-*` corretos vêm de fábrica) em vez de reimplementar teclado/ARIA na mão.
- Nenhum estado é só visual: `disabled` é o atributo nativo, `error` vira `aria-invalid` +
  `aria-describedby` no `Input`, `selected` vira `aria-current="page"` no `NavItem`.
- Foco visível global (`:focus-visible`) em `index.css` — nunca removido sem substituto.
- Alvo de toque mínimo de 44×44px (`min-h-touch`/`min-w-touch`) nos componentes interativos,
  documentando a regra de acessibilidade do Figma (Foundations → Accessibility).
- O Storybook roda com `@storybook/addon-a11y` (`test: "error"` em `.storybook/preview.ts`),
  então qualquer PR que adicionar uma story com violação de acessibilidade falha visivelmente
  no painel de Accessibility.

## Como rodar

```bash
npm install

# Storybook — catálogo de componentes com Foundations + Components
npm run storybook

# Vite — demo viva combinando os componentes numa tela
npm run dev

# Build de produção
npm run build
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
| Card                    | `components/molecules/Card`                 | molécula  |
| Month Strip             | `components/molecules/MonthStrip`           | molécula  |
| Egg Card                | `components/molecules/EggCard`              | molécula  |
| Navbar                  | `components/organisms/Navbar`               | organismo |
| Modal                   | `components/organisms/Modal`                | organismo |

Cada mapeamento também é documentado no cabeçalho JSDoc do respectivo arquivo `.tsx`,
com o link de volta para a seção correspondente no Figma.
