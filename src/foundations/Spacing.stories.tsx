import type { Meta, StoryObj } from "@storybook/react";
import { spacing } from "@/tokens/spacing";

const meta = {
  title: "Foundations/Spacing",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {Object.entries(spacing).map(([token, value]) => (
        <div key={token} className="flex items-center gap-4">
          <span className="w-24 font-body text-legenda text-text-secondary">
            espaco/{token}
          </span>
          <div className="h-4 bg-primary" style={{ width: value }} />
          <span className="font-body text-legenda text-text-secondary">{value}</span>
        </div>
      ))}
    </div>
  ),
};
