import type { Meta, StoryObj } from "@storybook/react";
import { ProgressScreen } from "./ProgressScreen";

const meta = {
  title: "Templates/ProgressScreen",
  component: ProgressScreen,
  parameters: { layout: "fullscreen" },
  args: { onBack: () => {}, onArchive: () => {} },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Progresso primeiro acesso" — a single metric, no trend yet. */
export const FirstAccess: Story = {
  args: {
    metrics: [{ value: "25min", caption: "investidas até aqui" }],
  },
};

/** "Progresso - acesso após ter feito algumas horas de estudos". */
export const AfterSomeStudying: Story = {
  args: {
    metrics: [
      {
        value: "23h",
        caption: "investidas até aqui",
        trend: [
          { label: "jun", value: 4 },
          { label: "jul", value: 14 },
          { label: "ago", value: 23 },
        ],
      },
      {
        value: "3 de 33",
        caption: "itens concluídos",
        trend: [
          { label: "jun", value: 1 },
          { label: "jul", value: 2 },
          { label: "ago", value: 3 },
        ],
      },
      {
        value: "maio de 2027",
        caption: "previsão de término, no seu ritmo atual",
        trend: [
          { label: "jun", value: 12 },
          { label: "jul", value: 8 },
          { label: "ago", value: 5 },
        ],
      },
    ],
  },
};
