import type { Meta, StoryObj } from "@storybook/react";
import { AchievementListItem } from "./AchievementListItem";
import { CertificateIcon, PublicationIcon, ProjectIcon } from "@/icons";

const meta = {
  title: "Components/Molecules/AchievementListItem",
  component: AchievementListItem,
  parameters: { layout: "centered" },
  render: (args) => (
    <ul className="w-80">
      <AchievementListItem {...args} />
    </ul>
  ),
} satisfies Meta<typeof AchievementListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Certificate: Story = {
  args: { icon: <CertificateIcon />, title: "UX Fundamentals", meta: "12 ago 2026 · Certificado" },
};

export const Publication: Story = {
  args: {
    icon: <PublicationIcon />,
    title: "Post sobre growth no LinkedIn",
    meta: "5 ago 2026 · Publicação",
  },
};

export const Project: Story = {
  args: { icon: <ProjectIcon />, title: "Redesign do portfólio", meta: "20 jul 2026 · Projeto" },
};
