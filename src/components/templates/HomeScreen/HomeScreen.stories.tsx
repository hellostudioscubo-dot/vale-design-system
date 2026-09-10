import type { Meta, StoryObj } from "@storybook/react";
import { HomeScreen } from "./HomeScreen";
import { screenImages } from "@/assets/screens";
import { HomeIcon, PlanIcon, CareerIcon, ValeIcon } from "@/icons";

const navbarItems = [
  { key: "hoje", icon: <HomeIcon />, label: "Hoje" },
  { key: "plano", icon: <PlanIcon />, label: "Plano" },
  { key: "carreira", icon: <CareerIcon />, label: "Carreira" },
  { key: "vale", icon: <ValeIcon />, label: "Vale" },
];

const meta = {
  title: "Templates/HomeScreen",
  component: HomeScreen,
  parameters: { layout: "fullscreen" },
  args: {
    greeting: "Boa noite, Isabel.",
    onSettingsClick: () => {},
    companionImageSrc: screenImages.companionAchievement,
    companionImageAlt: "Faísca, seu dragão",
    navbarItems,
    selectedNavKey: "hoje",
    onNavSelect: () => {},
  },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HomeScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Hoje primeiro acesso" — one card, no stats yet, the companion intro bubble. */
export const FirstAccess: Story = {
  args: {
    cards: [
      {
        key: "1",
        track: { label: "Imersão", tone: "primary" },
        title: "UI Boost — Design Mobile",
        subtitle: "9h estimadas · 3h investidas",
        onContinue: () => {},
      },
    ],
    companionIntro: {
      title: "Esse é o Faísca!",
      description: "Ele é um bebê e vai se desenvolver enquanto você estuda.",
    },
  },
};

/** "Hoje - acesso após ter feito algumas horas de estudos" — stats + two cards. */
export const AfterSomeStudying: Story = {
  args: {
    stats: [
      { value: "23h", label: "estudando" },
      { value: 3, label: "certificados" },
      { value: 2, label: "publicações" },
    ],
    cards: [
      {
        key: "1",
        track: { label: "Imersão", tone: "primary" },
        title: "UI Boost — Design Mobile",
        subtitle: "9h estimadas · 3h investidas",
        onContinue: () => {},
      },
      {
        key: "2",
        track: { label: "Currículo", tone: "achievement" },
        title: "Storytelling para portfólio",
        subtitle: "9h estimadas · 3h investidas",
        onContinue: () => {},
      },
    ],
  },
};
