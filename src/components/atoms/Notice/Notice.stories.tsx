import type { Meta, StoryObj } from "@storybook/react";
import { Notice } from "./Notice";

const meta = {
  title: "Components/Atoms/Notice",
  component: Notice,
  parameters: { layout: "centered" },
  args: { children: "Enquanto você estuda, seu dragão está crescendo." },
  render: (args) => (
    <div className="w-80">
      <Notice {...args} />
    </div>
  ),
} satisfies Meta<typeof Notice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
