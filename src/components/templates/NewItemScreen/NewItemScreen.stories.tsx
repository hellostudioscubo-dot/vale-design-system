import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NewItemScreen } from "./NewItemScreen";

const typeOptions = [
  { value: "curso", label: "Curso" },
  { value: "carreira", label: "Ação de carreira" },
];

const tracks = [
  { value: "imersao", label: "Imersão" },
  { value: "ia-creative", label: "IA Creative" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "portfolio", label: "Portfólio" },
  { value: "curriculo", label: "Currículo" },
  { value: "rede", label: "Rede" },
];

const priorities = [
  { value: "critica", label: "Crítica" },
  { value: "alta", label: "Alta" },
  { value: "media", label: "Média" },
  { value: "baixa", label: "Baixa" },
];

const months = [
  { value: "ago", label: "Agosto" },
  { value: "set", label: "Setembro" },
  { value: "out", label: "Outubro" },
];

const meta = {
  title: "Templates/NewItemScreen",
  component: NewItemScreen,
  parameters: { layout: "fullscreen" },
  args: {
    typeOptions,
    tracks,
    priorities,
    months,
    onCancel: () => {},
    onSubmit: () => {},
  },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[844px] w-[390px] overflow-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NewItemScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NewCourse: Story = {
  args: {
    type: "curso",
    onTypeChange: () => {},
    name: "",
    onNameChange: () => {},
    selectedTrack: undefined,
    onSelectTrack: () => {},
    hours: "",
    onHoursChange: () => {},
    month: "set",
    onMonthChange: () => {},
    priority: undefined,
    onSelectPriority: () => {},
    whyNow: "",
    onWhyNowChange: () => {},
  },
};

export const NewCareerAction: Story = {
  args: {
    type: "carreira",
    onTypeChange: () => {},
    name: "Atualizar perfil do LinkedIn",
    onNameChange: () => {},
    selectedTrack: "linkedin",
    onSelectTrack: () => {},
    hours: "2",
    onHoursChange: () => {},
    month: "set",
    onMonthChange: () => {},
    priority: "media",
    onSelectPriority: () => {},
    whyNow: "",
    onWhyNowChange: () => {},
  },
};

/** Interactive — every field is wired to real state. */
export const Interactive: Story = {
  args: {
    type: "curso",
    onTypeChange: () => {},
    name: "",
    onNameChange: () => {},
    onSelectTrack: () => {},
    hours: "",
    onHoursChange: () => {},
    month: "set",
    onMonthChange: () => {},
    onSelectPriority: () => {},
    whyNow: "",
    onWhyNowChange: () => {},
  },
  render: function Render() {
    const [type, setType] = useState("curso");
    const [name, setName] = useState("");
    const [track, setTrack] = useState<string>();
    const [hours, setHours] = useState("");
    const [month, setMonth] = useState("set");
    const [priority, setPriority] = useState<string>();
    const [whyNow, setWhyNow] = useState("");

    return (
      <NewItemScreen
        type={type}
        onTypeChange={setType}
        typeOptions={typeOptions}
        name={name}
        onNameChange={setName}
        tracks={tracks}
        selectedTrack={track}
        onSelectTrack={setTrack}
        hours={hours}
        onHoursChange={setHours}
        months={months}
        month={month}
        onMonthChange={setMonth}
        priorities={priorities}
        priority={priority}
        onSelectPriority={setPriority}
        whyNow={whyNow}
        onWhyNowChange={setWhyNow}
        onCancel={() => {}}
        onSubmit={() => {}}
      />
    );
  },
};
