import type { Meta, StoryObj } from "@storybook/react";
import { palette, semantic, semanticDark } from "@/tokens/colors";
import { cn } from "@/lib/utils";

function Swatch({
  name,
  hex,
  labelHex,
  captionHex,
}: {
  name: string;
  hex: string;
  /** Override the label colors with a literal hex instead of the
   *  `text-text-primary`/`-secondary` classes — needed for the
   *  `SemanticDark` story below, which renders dark-theme swatches on a
   *  fixed dark wrapper regardless of Storybook's own live theme toggle,
   *  so it can't rely on the `.dark` CSS-var override to do this for it. */
  labelHex?: string;
  captionHex?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-20 w-full rounded-card border border-border"
        style={{ backgroundColor: hex }}
      />
      <div className="font-body text-legenda">
        <p className={cn("font-semibold", !labelHex && "text-text-primary")} style={labelHex ? { color: labelHex } : undefined}>
          {name}
        </p>
        <p className={cn(!captionHex && "text-text-secondary")} style={captionHex ? { color: captionHex } : undefined}>
          {hex}
        </p>
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

/**
 * Dark theme overrides — not from Figma (the source file only defines a
 * light theme). Only the tokens whose role is "page/card background,
 * border or body text" get a dark value; every token not listed here
 * (brand fills, `*Subtle`/`*Strong` tints) intentionally keeps its light
 * value in both themes — see the doc comment on `semanticDark` in
 * src/tokens/colors.ts for why, and the contrast ratios each pair here
 * was checked against.
 */
export const SemanticDark: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6 rounded-card bg-[#241C33] p-6 md:grid-cols-6">
      {Object.entries(semanticDark).map(([name, hex]) => (
        <Swatch
          key={name}
          name={name}
          hex={hex}
          labelHex={semanticDark.textPrimary}
          captionHex={semanticDark.textSecondary}
        />
      ))}
    </div>
  ),
};
