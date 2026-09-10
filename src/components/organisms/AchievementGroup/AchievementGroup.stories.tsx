import type { Meta, StoryObj } from "@storybook/react";
import { AchievementGroup } from "./AchievementGroup";
import { AchievementListItem } from "@/components/molecules/AchievementListItem";
import { CertificateIcon, PublicationIcon } from "@/icons";

const meta = {
  title: "Components/Organisms/AchievementGroup",
  component: AchievementGroup,
  parameters: { layout: "centered" },
  render: (args) => (
    <div className="w-80">
      <AchievementGroup {...args} />
    </div>
  ),
} satisfies Meta<typeof AchievementGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const August2026: Story = {
  args: {
    month: "Agosto 2026",
    children: (
      <>
        <AchievementListItem icon={<CertificateIcon />} title="UX Fundamentals" meta="12 ago 2026 · Certificado" />
        <AchievementListItem
          icon={<PublicationIcon />}
          title="Post sobre growth no LinkedIn"
          meta="5 ago 2026 · Publicação"
        />
      </>
    ),
  },
};
