import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { AchievementListItem } from "./AchievementListItem";
import { CertificateIcon } from "@/icons";

describe("AchievementListItem", () => {
  it("renders title and meta as visible text", () => {
    render(
      <ul>
        <AchievementListItem icon={<CertificateIcon />} title="UX Fundamentals" meta="12 ago 2026 · Certificado" />
      </ul>,
    );
    expect(screen.getByText("UX Fundamentals")).toBeInTheDocument();
    expect(screen.getByText("12 ago 2026 · Certificado")).toBeInTheDocument();
  });

  it("renders as a list item so a wrapping <ul>/<ol> stays valid", () => {
    render(
      <ul>
        <AchievementListItem icon={<CertificateIcon />} title="UX Fundamentals" meta="12 ago 2026" />
      </ul>,
    );
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <ul>
        <AchievementListItem icon={<CertificateIcon />} title="UX Fundamentals" meta="12 ago 2026" />
      </ul>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
