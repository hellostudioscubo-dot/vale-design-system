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

STATUS ATUAL: o projeto já está com Foundations + Components completos e
verificados (build + Storybook rodando limpos, sem erros de TypeScript,
sem violações de acessibilidade). Já tem commit inicial no git
(sem remote configurado ainda).

O que já existe:
- src/tokens/ — colors.ts, spacing.ts, radius.ts, shadows.ts, typography.ts,
  portados 1:1 dos valores reais do Figma (cores em hex exatas, escala de
  espaçamento 4/8/12/16/20/24/32/48, raios 8/12/999, 3 sombras, 10 estilos
  de texto em Fraunces + Poppins)
- src/foundations/ — primitivo <Text variant="..."/> + stories de docs
  (Colors, Typography, Spacing, Radius, Shadows)
- src/icons/ — 9 ícones SVG (traço 1.5px, grade 24x24)
- src/components/ — Atomic Design, 13 componentes com Storybook cada:
  - atoms: Button, Input, Chip, Toggle, ProgressBar, ProgressRing,
    NumberBlock, NavItem
  - molecules: Card, MonthStrip, EggCard
  - organisms: Navbar, Modal
- Todos os componentes interativos usam Radix UI por baixo (Dialog, Switch,
  Progress, Label, Collapsible) para acessibilidade real (ARIA, foco,
  teclado), não reimplementada na mão.
- .storybook/preview.ts está configurado com @storybook/addon-a11y rodando
  em "error" mode, mas restrito a WCAG 2.1 AA (não AAA — ver nota abaixo).

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

O que NÃO está feito ainda (próximos passos possíveis):
- Assets reais (fotos dos dragões/ovo, ícone do app, logo) não estão no
  código — EggCard recebe `imageSrc` como prop, quem consome o design
  system precisa fornecer as imagens.
- Navbar não tem uma Component Property de "aba ativa" no sentido Figma
  (a seleção é via prop `selectedKey`, o que já resolve o caso de uso, mas
  não replica 1:1 a estrutura de variantes do Figma).
- Sem dark mode (o Figma só definiu tema claro).
- Sem testes automatizados (unit/visual regression) além do addon de a11y.
- Sem remote git configurado — só o commit inicial local.
- Storybook/build não estão publicados em lugar nenhum (é só local).

Comandos:
- `npm run storybook` — catálogo de componentes (porta 6006)
- `npm run dev` — demo viva (tela "Hoje" combinando os componentes)
- `npm run build` — build de produção
- `npm run build-storybook` — Storybook estático

Por favor, [DESCREVA AQUI O QUE VOCÊ QUER FAZER AGORA].
```

## 4. Nota sobre "conectar no VS Code"

Cada sessão do Claude Code é independente — a sessão que criou este projeto
(rodando fora do VS Code) não consegue "entrar" na janela do VS Code que
você for abrir. O prompt acima existe exatamente pra resolver isso: uma
sessão nova, iniciada dentro do terminal do VS Code (ou pela extensão do
Claude Code pro VS Code), lê esse contexto e continua o trabalho sem você
precisar reexplicar nada.
