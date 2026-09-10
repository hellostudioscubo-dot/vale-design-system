import type { Meta, StoryObj } from "@storybook/react";
import { SettingsRow } from "./SettingsRow";
import { Toggle } from "@/components/atoms/Toggle";
import { ExportIcon } from "@/icons";

const meta = {
  title: "Components/Molecules/SettingsRow",
  component: SettingsRow,
  parameters: { layout: "centered" },
  render: (args) => (
    <ul className="w-80 divide-y divide-border rounded-card border border-border bg-surface">
      <SettingsRow {...args} />
    </ul>
  ),
} satisfies Meta<typeof SettingsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Opens a picker — value + implicit chevron. */
export const WithValue: Story = {
  args: { label: "Cor", value: "Lilás", onClick: () => {} },
};

/** Hosts an already-interactive control. */
export const WithToggle: Story = {
  args: {
    label: "Som ambiente",
    control: <Toggle label="Som ambiente" hideLabel defaultChecked />,
  },
};

/** A description line under the label, alongside a toggle. */
export const WithDescriptionAndToggle: Story = {
  args: {
    label: "Aviso ao terminar",
    description: "Som e vibração",
    control: <Toggle label="Aviso ao terminar" hideLabel defaultChecked />,
  },
};

/** A plain action row — no value, no control, just onClick. */
export const ActionRow: Story = {
  args: {
    label: "Exportar meus dados",
    control: <ExportIcon className="text-text-secondary" />,
    onClick: () => {},
  },
};

export const Section: Story = {
  args: { label: "Duração da sessão", value: "25 min", onClick: () => {} },
  render: () => (
    <ul className="w-80 divide-y divide-border rounded-card border border-border bg-surface">
      <SettingsRow label="Duração da sessão" value="25 min" onClick={() => {}} />
      <SettingsRow
        label="Som ambiente"
        control={<Toggle label="Som ambiente" hideLabel defaultChecked />}
      />
      <SettingsRow
        label="Aviso ao terminar"
        description="Som e vibração"
        control={<Toggle label="Aviso ao terminar" hideLabel />}
      />
    </ul>
  ),
};
