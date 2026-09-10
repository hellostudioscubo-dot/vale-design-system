import type { Meta, StoryObj } from "@storybook/react";
import { OnboardingIntroScreen } from "./OnboardingIntroScreen";
import { companionImages } from "@/assets/companions";

const meta = {
  title: "Templates/OnboardingIntroScreen",
  component: OnboardingIntroScreen,
  parameters: { layout: "fullscreen" },
  args: { onSkip: () => {}, onContinue: () => {} },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-hidden bg-surface-muted">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OnboardingIntroScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Onboarding 1 de 4". */
export const StepOne: Story = {
  args: {
    step: 1,
    title: "Estudar depois do trabalho é difícil...",
    subtitle: "Não é falta de vontade. É falta de energia.",
    illustration: (
      <div className="flex h-full items-center justify-center bg-gradient-to-b from-primary-subtle to-surface-muted">
        <img src={companionImages.egg["Lilás"]} alt="" aria-hidden className="w-2/3 rounded-card" />
      </div>
    ),
  },
};

/** "Onboarding 2 de 4". */
export const StepTwo: Story = {
  args: {
    step: 2,
    title: "Aqui você vê uma tarefa por vez...",
    subtitle: "O resto fica guardado até chegar a hora.",
    illustration: (
      <div className="flex h-full items-center justify-center bg-gradient-to-b from-primary-subtle to-surface-muted">
        <div className="w-56 rounded-card border border-border bg-surface p-4 shadow-media">
          <div className="mb-3 h-5 w-16 rounded-chip bg-primary-subtle" />
          <div className="mb-2 h-3 w-40 rounded-full bg-primary/40" />
          <div className="h-6 w-full rounded-button bg-warning" />
        </div>
      </div>
    ),
  },
};
