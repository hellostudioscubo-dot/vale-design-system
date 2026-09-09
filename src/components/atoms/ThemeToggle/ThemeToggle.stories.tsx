import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "./ThemeToggle";

const meta = {
  title: "Components/Atoms/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Not a Figma component — the source file only defines a light theme. " +
          "Toggles `.dark` on `<html>` and persists the choice (see `useTheme`). " +
          "Use the toolbar's sun/moon control in Storybook to preview any story in dark mode.",
      },
    },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
