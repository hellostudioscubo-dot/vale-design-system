import type { Meta, StoryObj } from "@storybook/react";
import { LoadingBar } from "./LoadingBar";

const meta = {
  title: "Components/Atoms/LoadingBar",
  component: LoadingBar,
  parameters: { layout: "centered" },
  args: { value: 65, max: 100, label: "Carregando..." },
  decorators: [
    (Story) => (
      <div className="w-[280px] rounded-card bg-surface-muted p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoadingBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AlmostDone: Story = { args: { value: 90 } };
export const JustStarted: Story = { args: { value: 5 } };
