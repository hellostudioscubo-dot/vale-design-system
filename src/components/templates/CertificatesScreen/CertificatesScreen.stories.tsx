import type { Meta, StoryObj } from "@storybook/react";
import { CertificatesScreen } from "./CertificatesScreen";
import { CertificateIcon, PublicationIcon, ProjectIcon } from "@/icons";

const meta = {
  title: "Templates/CertificatesScreen",
  component: CertificatesScreen,
  parameters: { layout: "fullscreen" },
  args: { onBack: () => {}, onArchive: () => {} },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CertificatesScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Certificados primeiro acesso". */
export const FirstAccess: Story = {
  args: { groups: [] },
};

/** "Certificados - acesso após ter feito algumas horas de estudos". */
export const AfterSomeStudying: Story = {
  args: {
    summary: "3 certificados · 2 publicações · 1 projeto",
    groups: [
      {
        month: "Agosto 2026",
        items: [
          { icon: <CertificateIcon />, title: "UX Fundamentals", meta: "12 ago 2026 · Certificado" },
          {
            icon: <PublicationIcon />,
            title: "Post sobre growth no LinkedIn",
            meta: "5 ago 2026 · Publicação",
          },
        ],
      },
      {
        month: "Julho 2026",
        items: [
          { icon: <ProjectIcon />, title: "Redesign do portfólio", meta: "20 jul 2026 · Projeto" },
          { icon: <CertificateIcon />, title: "UI Design Avançado", meta: "8 jul 2026 · Certificado" },
        ],
      },
    ],
  },
};
