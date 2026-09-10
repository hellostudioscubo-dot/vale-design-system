import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { AchievementGroup } from "./AchievementGroup";
import { AchievementListItem } from "@/components/molecules/AchievementListItem";
import { CertificateIcon } from "@/icons";

describe("AchievementGroup", () => {
  it("renders the month as a heading", () => {
    render(
      <AchievementGroup month="Agosto 2026">
        <AchievementListItem icon={<CertificateIcon />} title="UX Fundamentals" meta="12 ago 2026" />
      </AchievementGroup>,
    );
    expect(screen.getByRole("heading", { name: "Agosto 2026" })).toBeInTheDocument();
  });

  it("renders its items inside a real list", () => {
    render(
      <AchievementGroup month="Agosto 2026">
        <AchievementListItem icon={<CertificateIcon />} title="UX Fundamentals" meta="12 ago 2026" />
        <AchievementListItem icon={<CertificateIcon />} title="UI Design Avançado" meta="8 jul 2026" />
      </AchievementGroup>,
    );
    expect(screen.getByRole("list").children).toHaveLength(2);
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <AchievementGroup month="Agosto 2026">
        <AchievementListItem icon={<CertificateIcon />} title="UX Fundamentals" meta="12 ago 2026" />
      </AchievementGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
