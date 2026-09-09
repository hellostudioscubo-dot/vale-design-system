import { useState } from "react";
import { Button, Input, Chip, Toggle, ProgressBar, ProgressRing, NumberBlock } from "@/components/atoms";
import { Card, MonthStrip } from "@/components/molecules";
import { Navbar, Modal } from "@/components/organisms";
import { Text } from "@/foundations";
import { HomeIcon, PlanIcon, CareerIcon, ValeIcon } from "@/icons";

const navItems = [
  { key: "hoje", icon: <HomeIcon />, label: "Hoje" },
  { key: "plano", icon: <PlanIcon />, label: "Plano" },
  { key: "carreira", icon: <CareerIcon />, label: "Carreira" },
  { key: "vale", icon: <ValeIcon />, label: "Vale" },
];

/**
 * Live demo composing the design system into a small "Hoje" screen —
 * a sanity check that every component works together, outside Storybook.
 */
export default function App() {
  const [tab, setTab] = useState("hoje");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-6 p-6">
      <header className="flex flex-col gap-1">
        <Text variant="tituloG">Vale Design System</Text>
        <Text variant="auxiliar">
          Componentes gerados a partir do Figma (Foundations + Components).
        </Text>
      </header>

      <section className="flex items-center justify-between rounded-card border border-border bg-surface p-4 shadow-leve">
        <NumberBlock value={12} label="dias seguidos" />
        <ProgressRing value={65} max={100} valueLabel="24:31" caption="Sessão 1" />
        <NumberBlock value={3} label="certificados" emphasis />
      </section>

      <MonthStrip month="Agosto" itemCount={2}>
        <Card
          track={{ label: "Imersão", tone: "primary" }}
          title="Fundamentos de Growth"
          subtitle="Módulo 2 de 6 · 15 min restantes"
          variant="expanded"
          onContinue={() => setModalOpen(true)}
        />
        <Card
          track={{ label: "Currículo", tone: "achievement" }}
          title="Storytelling para portfólio"
          subtitle="Concluído em 12 de agosto"
          variant="completed"
        />
      </MonthStrip>

      <section className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4 shadow-leve">
        <Text variant="corpoM">Plano semanal</Text>
        <ProgressBar value={40} max={100} label="Progresso" />
        <div className="flex flex-wrap gap-2">
          <Chip tone="primary">Imersão</Chip>
          <Chip tone="success">IA Creative</Chip>
          <Chip tone="warning">Portfólio</Chip>
        </div>
        <Input label="Nome completo" placeholder="Seu nome completo" />
        <Toggle label="Notificações" defaultChecked />
        <Button onClick={() => setModalOpen(true)}>Continuar</Button>
      </section>

      <Navbar items={navItems} selectedKey={tab} onSelect={setTab} className="mt-auto" />

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Parabéns!"
        description="Mais 25 minutos dedicados a você. Isso já é o suficiente por hoje."
        actionLabel="Encerrar tempo de foco"
        onAction={() => setModalOpen(false)}
      />
    </div>
  );
}
