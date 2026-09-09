import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import type { ComponentProps } from "react";
import { Modal } from "./Modal";

function renderModal(overrides: Partial<ComponentProps<typeof Modal>> = {}) {
  const onOpenChange = vi.fn();
  const onAction = vi.fn();
  const utils = render(
    <Modal
      open
      onOpenChange={onOpenChange}
      title="Parabéns!"
      description="Mais 25 minutos dedicados a você."
      actionLabel="Encerrar tempo de foco"
      onAction={onAction}
      {...overrides}
    />,
  );
  return { ...utils, onOpenChange, onAction };
}

describe("Modal", () => {
  it("renders nothing when closed", () => {
    render(
      <Modal
        open={false}
        onOpenChange={vi.fn()}
        title="Parabéns!"
        description="D"
        actionLabel="Fechar"
        onAction={vi.fn()}
      />,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders as a modal dialog with title and description when open", () => {
    renderModal();
    const dialog = screen.getByRole("dialog", { name: "Parabéns!" });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Mais 25 minutos dedicados a você.")).toBeInTheDocument();
  });

  it("calls onAction when the primary action is clicked", async () => {
    const user = userEvent.setup();
    const { onAction } = renderModal();

    await user.click(screen.getByRole("button", { name: "Encerrar tempo de foco" }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("calls onOpenChange(false) when the close button is clicked", async () => {
    const user = userEvent.setup();
    const { onOpenChange } = renderModal();

    await user.click(screen.getByRole("button", { name: "Fechar" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onOpenChange(false) on Escape (Radix Dialog default behavior)", async () => {
    const user = userEvent.setup();
    const { onOpenChange } = renderModal();

    await user.keyboard("{Escape}");

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("has no a11y violations", async () => {
    // Radix Dialog renders its content into a portal on document.body, a
    // sibling of RTL's own container — scanning `container` here would
    // silently check nothing.
    renderModal();
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
