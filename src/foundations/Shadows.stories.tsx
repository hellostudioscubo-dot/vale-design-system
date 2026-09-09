import type { Meta, StoryObj } from "@storybook/react";
import { shadows } from "@/tokens/shadows";

const meta = {
  title: "Foundations/Shadows",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div className="flex gap-10 bg-surface-muted p-10">
      {Object.entries(shadows)
        .filter(([token]) => token !== "none")
        .map(([token, value]) => (
          <div key={token} className="flex flex-col items-center gap-3">
            <div
              className="h-20 w-20 rounded-card bg-surface"
              style={{ boxShadow: value }}
            />
            <span className="font-body text-legenda text-text-secondary">
              sombra/{token}
            </span>
          </div>
        ))}
    </div>
  ),
};
