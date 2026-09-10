import type { Meta, StoryObj } from "@storybook/react";
import { CompanionBubble } from "./CompanionBubble";

const meta = {
  title: "Components/Molecules/CompanionBubble",
  component: CompanionBubble,
  parameters: { layout: "centered" },
} satisfies Meta<typeof CompanionBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hoje — introducing the companion for the first time. */
export const IntroducingTheCompanion: Story = {
  args: {
    tone: "dark",
    title: "Esse é o Faísca!",
    description: "Ele é um bebê e vai se desenvolver enquanto você estuda.",
  },
};

/** Vale — celebrating an unlocked achievement, over a light/photo backdrop. */
export const AchievementUnlocked: Story = {
  args: {
    tone: "light",
    title: "Conquista desbloqueada!",
    description: "Não esqueça de compartilhar sua conquista no LinkedIn.",
  },
  decorators: [
    (Story) => (
      <div className="rounded-card bg-primary-pressed p-6">
        <Story />
      </div>
    ),
  ],
};
