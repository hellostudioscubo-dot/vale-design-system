import type { Meta, StoryObj } from "@storybook/react";
import { NavItem } from "./NavItem";
import { HomeIcon } from "@/icons";

const meta = {
  title: "Components/Atoms/NavItem",
  component: NavItem,
  parameters: { layout: "centered" },
  args: { icon: <HomeIcon />, label: "Hoje" },
  render: (args) => (
    <div className="w-24">
      <NavItem {...args} />
    </div>
  ),
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
