import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FocusSessionScreen } from "./FocusSessionScreen";
import { companionImages } from "@/assets/companions";

const meta = {
  title: "Templates/FocusSessionScreen",
  component: FocusSessionScreen,
  parameters: { layout: "fullscreen" },
  args: {
    onBack: () => {},
    onArchive: () => {},
    sessionLabel: "Sessão 1",
    progressMax: 25,
    companionImageSrc: companionImages.hatchling["Lilás"],
    companionImageAlt: "Faísca crescendo",
    growthMessage: "Enquanto você estuda, seu dragão está crescendo.",
    onTogglePlay: () => {},
    onEnd: () => {},
  },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FocusSessionScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Sessão em foco pausada". */
export const Paused: Story = {
  args: { isPlaying: false, timeLabel: "25:00", progressValue: 0 },
};

/** "Sessão em foco dar play". */
export const Playing: Story = {
  args: { isPlaying: true, timeLabel: "24:31", progressValue: 1 },
};

export const Interactive: Story = {
  args: { isPlaying: false, timeLabel: "25:00", progressValue: 0 },
  render: function Render() {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
      <FocusSessionScreen
        onBack={() => {}}
        onArchive={() => {}}
        timeLabel={isPlaying ? "24:31" : "25:00"}
        sessionLabel="Sessão 1"
        progressValue={isPlaying ? 1 : 0}
        progressMax={25}
        companionImageSrc={companionImages.hatchling["Lilás"]}
        companionImageAlt="Faísca crescendo"
        growthMessage="Enquanto você estuda, seu dragão está crescendo."
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((v) => !v)}
        onEnd={() => {}}
      />
    );
  },
};
