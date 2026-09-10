import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "curso", label: "Curso" },
  { value: "carreira", label: "Ação de carreira" },
];

const meta = {
  title: "Components/Atoms/SegmentedControl",
  component: SegmentedControl,
  parameters: { layout: "centered" },
  args: { label: "Tipo de item", options, value: "curso", onValueChange: () => {} },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-80">
        <SegmentedControl {...args} value={value} onValueChange={setValue} />
      </div>
    );
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CareerSelected: Story = { args: { value: "carreira" } };
