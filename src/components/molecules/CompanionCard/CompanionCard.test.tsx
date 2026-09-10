import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { CompanionCard } from "./CompanionCard";

describe("CompanionCard", () => {
  it("renders the illustration with its accessible alt text", () => {
    render(<CompanionCard imageSrc="/dragao.png" imageAlt="Faísca, seu dragão bebê" />);
    expect(screen.getByRole("img", { name: "Faísca, seu dragão bebê" })).toBeInTheDocument();
  });

  it("omits the stats row when there is no history yet", () => {
    render(<CompanionCard imageSrc="/dragao.png" imageAlt="Faísca" />);
    expect(screen.queryByText("estudando")).not.toBeInTheDocument();
  });

  it("renders one NumberBlock per stat when provided", () => {
    render(
      <CompanionCard
        imageSrc="/dragao.png"
        imageAlt="Faísca"
        stats={[
          { value: "23h", label: "estudando" },
          { value: 3, label: "certificados" },
        ]}
      />,
    );
    expect(screen.getByText("23h")).toBeInTheDocument();
    expect(screen.getByText("certificados")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <CompanionCard
        imageSrc="/dragao.png"
        imageAlt="Faísca"
        stats={[{ value: "23h", label: "estudando" }]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
