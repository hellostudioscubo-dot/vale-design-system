# Contexto do projeto — cole isso pro Claude Code ao retomar

> Como usar: abra este projeto no VS Code, abra um terminal integrado, rode
> `claude`, e cole o bloco "Prompt de retomada" abaixo como primeira mensagem.
> Isso poupa reexplicar o projeto do zero em cada sessão nova.

## 1. Abrir o projeto no VS Code

```bash
cd C:\Users\isabel.cardoso\vale-design-system
code .
```

(Se o comando `code` não existir no seu terminal: abra o VS Code normalmente
→ File > Open Folder → selecione `vale-design-system`.)

## 2. Iniciar o Claude Code dentro do VS Code

Abra um terminal integrado no VS Code (`` Ctrl+` ``) e rode:

```bash
claude
```

(O CLI já está instalado nesta máquina — `claude --version` → 2.1.143.)

## 3. Prompt de retomada — cole isso na primeira mensagem

```
Estou desenvolvendo o "Vale Design System" (React + TypeScript + Tailwind),
baseado no arquivo Figma "Vale — App de estudos"
(https://www.figma.com/design/CiJCwsSvwdxtorWL8uUHQQ — páginas Foundations
node-id=394-2 e Components node-id=394-8, que eu mesma organizei com o Claude
antes de gerar este código).

STATUS ATUAL (atualizado 2026-09-09): Foundations + Components completos e
verificados, MAIS dark mode, assets reais e publicação no npm. Remote
GitHub configurado. Build + Storybook rodando limpos, sem erros de
TypeScript, sem violações de acessibilidade.

- Remote: https://github.com/hellostudioscubo-dot/vale-design-system
  (branch main, sincronizada).
- Publicado no npm: https://www.npmjs.com/package/vale-design-system
  (`npm install vale-design-system`). `npm run build:lib` gera
  dist/index.js (ESM), dist/index.cjs, dist/index.d.ts, dist/style.css.
  Verificado ponta a ponta (`npm pack` + instalar o tarball num projeto
  separado e importar dos dois jeitos, require e import).

O que já existe:
- src/tokens/ — colors.ts, spacing.ts, radius.ts, shadows.ts, typography.ts,
  portados 1:1 dos valores reais do Figma (cores em hex exatas, escala de
  espaçamento 4/8/12/16/20/24/32/48, raios 8/12/999, 3 sombras, 10 estilos
  de texto em Fraunces + Poppins). colors.ts também tem `semanticDark`
  (dark mode, não vem do Figma — ver item 4 nos bugs/decisões abaixo).
- src/foundations/ — primitivo <Text variant="..."/> + stories de docs
  (Colors, Typography, Spacing, Radius, Shadows, Logo)
- src/icons/ — 9 ícones SVG (traço 1.5px, grade 24x24) + SunIcon/MoonIcon
  (dark mode toggle, não vêm do Figma)
- src/assets/ — assets reais exportados do Figma (companions/: 18 fotos do
  Egg Card; brand/: favicon.svg + wordmark em 3 cores). NÃO entram no
  pacote npm publicado (7,9MB — decisão explícita da usuária, ver README
  "Assets"). Só usados pelo Storybook e pela demo.
- src/hooks/useTheme.ts — dark mode toggle persistido, não vem do Figma.
- src/components/ — Atomic Design, 14 componentes com Storybook cada:
  - atoms: Button, Input, Chip, Toggle, ProgressBar, ProgressRing,
    NumberBlock, NavItem, ThemeToggle (não vem do Figma)
  - molecules: Card, MonthStrip, EggCard
  - organisms: Navbar, Modal
- Todos os componentes interativos usam Radix UI por baixo (Dialog, Switch,
  Progress, Label, Collapsible) para acessibilidade real (ARIA, foco,
  teclado), não reimplementada na mão.
- .storybook/preview.tsx (renomeado de .ts pra suportar JSX do decorator de
  tema) está configurado com @storybook/addon-a11y rodando em "error" mode,
  restrito a WCAG 2.1 AA (não AAA), mais uma toolbar de tema (light/dark).

Bugs reais encontrados e corrigidos durante a verificação (documentados
nos comentários do código, vale saber pra não reintroduzir):
1. O helper cn() (tailwind-merge) confundia classes de tamanho de fonte
   customizadas (text-auxiliar, text-corpo...) com classes de cor de texto
   (text-primary, text-text-inverse...) por compartilharem o prefixo
   "text-", e descartava a cor real. Corrigido em src/lib/utils.ts com
   extendTailwindMerge() registrando nossos tokens de fontSize no grupo
   certo. Isso afetava a cor do texto em TODO componente — se voltar a
   acontecer, é o primeiro lugar a checar.
2. As cores `success` (sálvia) e `achievement` (dourado) são decorativas
   no próprio Figma — não são seguras como cor de texto pequeno (contraste
   ~2:1, abaixo do mínimo AA de 4.5:1). Criei `successStrong` (verde escuro
   novo, não vem do Figma) e reaproveitei `warningStrong` (mel-queimado, que
   já existia no Figma) como as versões seguras pra texto. Ver
   src/tokens/colors.ts.
3. tsc emitiu .js/.d.ts por engano dentro de src/tokens/ e na raiz do
   projeto (tailwind.config.js, vite.config.js) numa configuração antiga
   de tsconfig, e esses arquivos compilados ficaram sombreando os .ts reais
   — nenhuma edição de token surtia efeito até eu achar e apagar esses
   arquivos soltos. tsconfig.json e tsconfig.node.json já estão com
   `noEmit: true` pra isso não voltar a acontecer.
4. Dark mode (2026-09-09): três bugs reais de contraste, achados pelo addon
   de a11y do Storybook, não só teoria. (a) `Card` variant="completed" usa
   uma tinta estática clara (bg-success-subtle) mas título/subtítulo usavam
   os tokens neutros de texto, que passaram a variar por tema — no dark
   mode ficou texto claro sobre fundo claro. (b) `Button` variant="primary"
   usa `text-text-inverse` (branco) sobre `bg-primary` (roxo, estático) —
   fazer textInverse variar por tema pôs texto escuro sobre roxo escuro
   (1.94:1, falha AA). (c) Vários componentes usavam `primary`/
   `successStrong`/`warningStrong` como cor de texto direto sobre a
   superfície da página (NavItem selecionado, Button secundário/texto,
   Input erro, NumberBlock ênfase, MonthStrip concluído) — essas cores só
   foram calibradas pra fundo claro; no dark mode caíam pra ~2:1. Criada a
   família `*OnSurface` (primaryOnSurface/successOnSurface/warningOnSurface)
   especificamente pra esse papel — ver doc comment em semantic/semanticDark
   em src/tokens/colors.ts pro raciocínio completo de quando cada família
   deve ou não variar por tema.
5. Build de biblioteca (2026-09-09): o output CJS (`dist/index.cjs.js`)
   voltava `{}` vazio de `require()` sem erro nenhum — package.json já
   tinha `"type": "module"`, então o Node tratava até um arquivo CommonJS
   como ESM por causa da extensão `.js` genérica. Só apareceu testando o
   build de verdade (`require()` do arquivo), não só checando os tipos.
   Corrigido nomeando a saída `.cjs` (sem `.js`) em vite.config.lib.ts.

O que NÃO está feito ainda (próximos passos possíveis):
- Navbar não tem uma Component Property de "aba ativa" no sentido Figma
  (a seleção é via prop `selectedKey`, o que já resolve o caso de uso, mas
  não replica 1:1 a estrutura de variantes do Figma).
- Sem testes automatizados (unit/visual regression) além do addon de a11y.
- Storybook estático (build-storybook) não está publicado em lugar nenhum
  além do próprio build local — só o pacote em si está no npm.

Comandos:
- `npm run storybook` — catálogo de componentes (porta 6006)
- `npm run dev` — demo viva (tela "Hoje" combinando os componentes)
- `npm run build` — build de produção da demo
- `npm run build-storybook` — Storybook estático
- `npm run build:lib` — build da biblioteca publicável no npm
- `npm publish` — publica uma nova versão (precisa `npm login` antes; pede
  OTP/2FA no navegador — sempre rodar num terminal de verdade, não em
  segundo plano, pra ver a URL de autenticação)

Por favor, [DESCREVA AQUI O QUE VOCÊ QUER FAZER AGORA].
```

## 4. Nota sobre "conectar no VS Code"

Cada sessão do Claude Code é independente — a sessão que criou este projeto
(rodando fora do VS Code) não consegue "entrar" na janela do VS Code que
você for abrir. O prompt acima existe exatamente pra resolver isso: uma
sessão nova, iniciada dentro do terminal do VS Code (ou pela extensão do
Claude Code pro VS Code), lê esse contexto e continua o trabalho sem você
precisar reexplicar nada.
