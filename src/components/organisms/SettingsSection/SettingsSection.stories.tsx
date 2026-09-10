import type { Meta, StoryObj } from "@storybook/react";
import { SettingsSection } from "./SettingsSection";
import { SettingsRow } from "@/components/molecules/SettingsRow";
import { Toggle } from "@/components/atoms/Toggle";

const meta = {
  title: "Components/Organisms/SettingsSection",
  component: SettingsSection,
  parameters: { layout: "centered" },
  render: (args) => (
    <div className="w-80">
      <SettingsSection {...args} />
    </div>
  ),
} satisfies Meta<typeof SettingsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Session: Story = {
  args: {
    title: "SESSÃO",
    children: (
      <>
        <SettingsRow label="Duração da sessão" value="25 min" onClick={() => {}} />
        <SettingsRow
          label="Som ambiente"
          control={<Toggle label="Som ambiente" hideLabel defaultChecked />}
        />
        <SettingsRow
          label="Aviso ao terminar"
          description="Som e vibração"
          control={<Toggle label="Aviso ao terminar" hideLabel defaultChecked />}
        />
      </>
    ),
  },
};
