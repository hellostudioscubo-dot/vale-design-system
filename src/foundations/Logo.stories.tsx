import type { Meta, StoryObj } from "@storybook/react";
import { faviconUrl, logo } from "@/assets/brand";

const meta = {
  title: "Foundations/Logo",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Marca Vale — Figma: Foundations → Logo. Ícone do app e wordmark, exportados " +
          "em 2026-09-09 (node 424:44). O wordmark é servido como PNG com fundo " +
          "transparente (a exportação em SVG do Figma trouxe um retângulo de fundo " +
          "indevido nesse nó específico — ver src/assets/brand/index.ts).",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconAndWordmark: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <span className="font-body text-auxiliar font-semibold text-text-primary">Ícone</span>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <img src={faviconUrl} alt="" width={64} height={64} className="rounded-card" />
            <span className="font-body text-legenda text-text-secondary">Ícone do app</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-body text-auxiliar font-semibold text-text-primary">Wordmark</span>
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-32 w-64 items-center justify-center rounded-card border border-border bg-surface p-4">
              <img src={logo.grafite} alt="Vale" className="h-full w-auto max-w-full object-contain" />
            </div>
            <span className="font-body text-legenda text-text-secondary">
              Grafite — uso padrão sobre claro
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-32 w-64 items-center justify-center rounded-card border border-border bg-surface p-4">
              <img src={logo.roxo} alt="Vale" className="h-full w-auto max-w-full object-contain" />
            </div>
            <span className="font-body text-legenda text-text-secondary">
              Roxo — com destaque de marca
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex h-32 w-64 items-center justify-center rounded-card p-4"
              style={{ backgroundColor: "#241C33" }}
            >
              <img src={logo.branco} alt="Vale" className="h-full w-auto max-w-full object-contain" />
            </div>
            <span className="font-body text-legenda text-text-secondary">
              Branco — reverso sobre fundo escuro
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
};
