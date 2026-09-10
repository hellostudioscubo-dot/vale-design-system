import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { OnboardingCourseFormScreen } from "./OnboardingCourseFormScreen";

const meta = {
  title: "Templates/OnboardingCourseFormScreen",
  component: OnboardingCourseFormScreen,
  parameters: { layout: "fullscreen" },
  args: {
    onSubmit: () => {},
    onSkip: () => {},
    onCourseNameChange: () => {},
    onCourseHoursChange: () => {},
  },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OnboardingCourseFormScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { courseName: "", courseHours: "", isValid: false },
};

export const Filled: Story = {
  args: { courseName: "UI Boost — Design Mobile", courseHours: "9 horas", isValid: true },
};

/** Interactive — typing in either field enables the CTA. */
export const Interactive: Story = {
  args: { courseName: "", courseHours: "", isValid: false },
  render: function Render() {
    const [name, setName] = useState("");
    const [hours, setHours] = useState("");
    return (
      <OnboardingCourseFormScreen
        courseName={name}
        onCourseNameChange={setName}
        courseHours={hours}
        onCourseHoursChange={setHours}
        isValid={name.trim().length > 0 && hours.trim().length > 0}
        onSubmit={() => {}}
        onSkip={() => {}}
      />
    );
  },
};
