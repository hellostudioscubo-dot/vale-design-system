import type { Meta, StoryObj } from "@storybook/react";
import { SettingsScreen } from "./SettingsScreen";
import { SettingsSection } from "@/components/organisms/SettingsSection";
import { SettingsRow } from "@/components/molecules/SettingsRow";
import { Toggle } from "@/components/atoms/Toggle";
import { ExportIcon } from "@/icons";

const meta = {
  title: "Templates/SettingsScreen",
  component: SettingsScreen,
  parameters: { layout: "fullscreen" },
  args: { onBack: () => {}, onArchive: () => {} },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SettingsScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: (args) => (
    <SettingsScreen {...args}>
      <SettingsSection title="PERSONAGEM">
        <SettingsRow label="Nome do dragão" value="Fagulha" onClick={() => {}} />
        <SettingsRow label="Cor" value="Lilás" onClick={() => {}} />
      </SettingsSection>

      <SettingsSection title="SESSÃO">
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
      </SettingsSection>

      <SettingsSection title="NOTIFICAÇÕES">
        <SettingsRow
          label="Lembrete diário"
          control={<Toggle label="Lembrete diário" hideLabel defaultChecked />}
        />
      </SettingsSection>

      <SettingsSection title="ACESSIBILIDADE">
        <SettingsRow label="Reduzir movimento" value="Segue o sistema" onClick={() => {}} />
        <SettingsRow label="Tema" value="Automático" onClick={() => {}} />
      </SettingsSection>

      <SettingsSection title="CONTA">
        <SettingsRow label="Entrar ou criar conta" onClick={() => {}} />
        <SettingsRow
          label="Exportar meus dados"
          control={<ExportIcon className="text-text-secondary" />}
          onClick={() => {}}
        />
      </SettingsSection>
    </SettingsScreen>
  ),
};
