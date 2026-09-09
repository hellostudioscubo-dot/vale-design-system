import type { Meta, StoryObj } from "@storybook/react";
import { palette, semantic } from "@/tokens/colors";

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-20 w-full rounded-card border border-border"
        style={{ backgroundColor: hex }}
      />
      <div className="font-body text-legenda">
        <p className="font-semibold text-text-primary">{name}</p>
        <p className="text-text-secondary">{hex}</p>
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Raw palette — Figma variable collection "Cor". */
export const Palette: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6 md:grid-cols-6">
      {Object.entries(palette).map(([name, hex]) => (
        <Swatch key={name} name={name} hex={hex} />
      ))}
    </div>
  ),
};

/** Role-based tokens components should actually consume. */
export const Semantic: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6 md:grid-cols-6">
      {Object.entries(semantic).map(([name, hex]) => (
        <Swatch key={name} name={name} hex={hex} />
      ))}
    </div>
  ),
};
