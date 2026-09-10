import type { Meta, StoryObj } from "@storybook/react";
import { VaultScreen } from "./VaultScreen";
import { screenImages } from "@/assets/screens";
import { HomeIcon, PlanIcon, CareerIcon, ValeIcon } from "@/icons";

const navbarItems = [
  { key: "hoje", icon: <HomeIcon />, label: "Hoje" },
  { key: "plano", icon: <PlanIcon />, label: "Plano" },
  { key: "carreira", icon: <CareerIcon />, label: "Carreira" },
  { key: "vale", icon: <ValeIcon />, label: "Vale" },
];

const meta = {
  title: "Templates/VaultScreen",
  component: VaultScreen,
  parameters: { layout: "fullscreen" },
  args: {
    sceneImageSrc: screenImages.valeScene,
    sceneImageAlt: "O vale onde seu dragão vive",
    greeting: "Boa noite, Isabel.",
    onSettingsClick: () => {},
    onProgressClick: () => {},
    onCertificatesClick: () => {},
    navbarItems,
    selectedNavKey: "vale",
    onNavSelect: () => {},
  },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VaultScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Vale primeiro acesso" — a single stat, no achievement notice yet. */
export const FirstAccess: Story = {
  args: { stats: [{ value: "25min", label: "investidos" }] },
};

/** "Vale (tela) - acesso após ter feito algumas horas de estudos". */
export const AfterSomeStudying: Story = {
  args: {
    stats: [
      { value: "23h", label: "investidas" },
      { value: 3, label: "certificados" },
      { value: 2, label: "publicações" },
    ],
    achievementNotice: {
      title: "Conquista desbloqueada!",
      description: "Não esqueça de compartilhar sua conquista no LinkedIn.",
    },
  },
};
