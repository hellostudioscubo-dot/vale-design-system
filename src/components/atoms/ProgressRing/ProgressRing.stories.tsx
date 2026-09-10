import type { Meta, StoryObj } from "@storybook/react";
import { ProgressRing } from "./ProgressRing";

const meta = {
  title: "Components/Atoms/ProgressRing",
  component: ProgressRing,
  parameters: { layout: "centered" },
  args: { value: 65, max: 100, valueLabel: "24:31", caption: "Sessão 1" },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AlmostDone: Story = { args: { value: 95 } };

/** "Sessão em foco" — the full-screen 240px countdown on its dark takeover background. */
export const FocusSessionTimer: Story = {
  args: {
    value: 25,
    max: 25,
    size: 240,
    strokeWidth: 8,
    valueLabel: "25:00",
    caption: "Sessão 1",
    valueVariant: "timer",
    tone: "onDark",
  },
  decorators: [
    (Story) => (
      <div className="rounded-card bg-primary-pressed p-10">
        <Story />
      </div>
    ),
  ],
};
