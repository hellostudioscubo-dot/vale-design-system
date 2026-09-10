import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { CertificatesScreen } from "./CertificatesScreen";
import { CertificateIcon } from "@/icons";

describe("CertificatesScreen", () => {
  it("shows the empty state when there are no achievements yet", () => {
    render(<CertificatesScreen onBack={() => {}} onArchive={() => {}} groups={[]} />);
    expect(
      screen.getByText("Depois que você concluir suas metas de conquistas elas vão aparecer aqui!"),
    ).toBeInTheDocument();
  });

  it("groups achievements by month when there are entries", () => {
    render(
      <CertificatesScreen
        onBack={() => {}}
        onArchive={() => {}}
        groups={[
          {
            month: "Agosto 2026",
            items: [{ icon: <CertificateIcon />, title: "UX Fundamentals", meta: "12 ago 2026" }],
          },
        ]}
      />,
    );
    expect(screen.getByRole("heading", { name: "Agosto 2026" })).toBeInTheDocument();
    expect(screen.getByText("UX Fundamentals")).toBeInTheDocument();
    expect(screen.queryByText(/vão aparecer aqui/)).not.toBeInTheDocument();
  });

  it("has no a11y violations, empty", async () => {
    const { container } = render(
      <CertificatesScreen onBack={() => {}} onArchive={() => {}} groups={[]} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no a11y violations, with achievements", async () => {
    const { container } = render(
      <CertificatesScreen
        onBack={() => {}}
        onArchive={() => {}}
        groups={[
          {
            month: "Agosto 2026",
            items: [{ icon: <CertificateIcon />, title: "UX Fundamentals", meta: "12 ago 2026" }],
          },
        ]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
