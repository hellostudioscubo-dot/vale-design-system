import type { Meta, StoryObj } from "@storybook/react";
import { LinkChip } from "./LinkChip";
import { PlanIcon, CertificateIcon } from "@/icons";

const meta = {
  title: "Components/Atoms/LinkChip",
  component: LinkChip,
  parameters: { layout: "centered" },
} satisfies Meta<typeof LinkChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Progress: Story = {
  args: { icon: <PlanIcon width={18} height={18} />, children: "Progresso" },
};

export const Achievements: Story = {
  args: { icon: <CertificateIcon width={18} height={18} />, children: "Conquistas" },
};

export const Group: Story = {
  args: { icon: <PlanIcon width={18} height={18} />, children: "Progresso" },
  render: () => (
    <div className="flex gap-3">
      <LinkChip icon={<PlanIcon width={18} height={18} />}>Progresso</LinkChip>
      <LinkChip icon={<CertificateIcon width={18} height={18} />}>Conquistas</LinkChip>
    </div>
  ),
};
