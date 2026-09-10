import type { Meta, StoryObj } from "@storybook/react";
import { StepDots } from "./StepDots";

const meta = {
  title: "Components/Atoms/StepDots",
  component: StepDots,
  parameters: { layout: "centered" },
  args: { step: 1, totalSteps: 4 },
} satisfies Meta<typeof StepDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Step1: Story = {};
export const Step3: Story = { args: { step: 3 } };
export const LastStep: Story = { args: { step: 4 } };
