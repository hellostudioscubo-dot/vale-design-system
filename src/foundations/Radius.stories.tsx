import type { Meta, StoryObj } from "@storybook/react";
import { radius } from "@/tokens/radius";

const meta = {
  title: "Foundations/Radius",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      {Object.entries(radius).map(([token, value]) => (
        <div key={token} className="flex flex-col items-center gap-2">
          <div
            className="h-20 w-20 border-2 border-primary bg-primary-subtle"
            style={{ borderRadius: value }}
          />
          <span className="font-body text-legenda text-text-secondary">
            raio/{token} — {value}
          </span>
        </div>
      ))}
    </div>
  ),
};
