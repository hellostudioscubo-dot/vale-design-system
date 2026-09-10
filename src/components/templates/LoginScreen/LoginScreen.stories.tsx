import type { Meta, StoryObj } from "@storybook/react";
import { LoginScreen } from "./LoginScreen";

const meta = {
  title: "Templates/LoginScreen",
  component: LoginScreen,
  parameters: { layout: "fullscreen" },
  args: {
    onGoogle: () => {},
    onApple: () => {},
    onEmail: () => {},
    onContinueWithoutAccount: () => {},
  },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
