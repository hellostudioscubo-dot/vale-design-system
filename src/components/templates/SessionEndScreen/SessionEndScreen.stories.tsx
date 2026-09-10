import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SessionEndScreen } from "./SessionEndScreen";
import { screenImages } from "@/assets/screens";

const meta = {
  title: "Templates/SessionEndScreen",
  component: SessionEndScreen,
  parameters: { layout: "fullscreen" },
  args: {
    companionImageSrc: screenImages.sessionEndCard,
    companionImageAlt: "Faísca comemorando",
    learnerName: "Isabel",
    minutes: 25,
    courseName: "UI Boost | Design Mobile",
    onYes: () => {},
    onNo: () => {},
  },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SessionEndScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { noteValue: "", onNoteChange: () => {} },
};

export const Interactive: Story = {
  args: { noteValue: "", onNoteChange: () => {} },
  render: function Render() {
    const [note, setNote] = useState("");
    return (
      <SessionEndScreen
        companionImageSrc={screenImages.sessionEndCard}
        companionImageAlt="Faísca comemorando"
        learnerName="Isabel"
        minutes={25}
        courseName="UI Boost | Design Mobile"
        noteValue={note}
        onNoteChange={setNote}
        onYes={() => {}}
        onNo={() => {}}
      />
    );
  },
};
