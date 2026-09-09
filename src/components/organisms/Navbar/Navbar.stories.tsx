import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";
import { HomeIcon, PlanIcon, CareerIcon, ValeIcon } from "@/icons";

const items = [
  { key: "hoje", icon: <HomeIcon />, label: "Hoje" },
  { key: "plano", icon: <PlanIcon />, label: "Plano" },
  { key: "carreira", icon: <CareerIcon />, label: "Carreira" },
  { key: "vale", icon: <ValeIcon />, label: "Vale" },
];

const meta = {
  title: "Components/Organisms/Navbar",
  component: Navbar,
  parameters: { layout: "centered" },
  args: { items, selectedKey: "hoje", onSelect: () => {} },
  render: function Render(args) {
    const [selected, setSelected] = useState(args.selectedKey);
    return (
      <div className="w-96">
        <Navbar {...args} selectedKey={selected} onSelect={setSelected} />
      </div>
    );
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
