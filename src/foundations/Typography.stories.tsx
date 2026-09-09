import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Typography";
import { typeScale } from "@/tokens/typography";

const meta = {
  title: "Foundations/Typography",
  component: Text,
  parameters: { layout: "padded" },
  args: { variant: "corpo", children: "Vale — App de estudos" },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** The full type scale, matching Figma Foundations → Typography. */
export const TypeScale: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(Object.keys(typeScale) as (keyof typeof typeScale)[]).map((token) => (
        <div key={token} className="flex items-baseline gap-6 border-b border-border pb-4">
          <span className="w-40 shrink-0 font-body text-legenda text-text-secondary">
            {token}
            <br />
            {typeScale[token].fontSize} · {typeScale[token].fontWeight}
          </span>
          <Text variant={token}>Vale Design System</Text>
        </div>
      ))}
    </div>
  ),
};
