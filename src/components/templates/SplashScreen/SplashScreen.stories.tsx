import type { Meta, StoryObj } from "@storybook/react";
import { SplashScreen } from "./SplashScreen";
import { screenImages } from "@/assets/screens";
import { logo } from "@/assets/brand";

const meta = {
  title: "Templates/SplashScreen",
  component: SplashScreen,
  parameters: { layout: "fullscreen" },
  args: {
    backgroundImageSrc: screenImages.splashScene,
    logoSrc: logo.branco,
    loadingValue: 65,
  },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SplashScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AlmostLoaded: Story = { args: { loadingValue: 95 } };
