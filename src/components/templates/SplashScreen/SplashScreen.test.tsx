import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { SplashScreen } from "./SplashScreen";

describe("SplashScreen", () => {
  it("renders the wordmark with its accessible name", () => {
    render(<SplashScreen backgroundImageSrc="/scene.png" logoSrc="/logo.png" loadingValue={50} />);
    expect(screen.getByRole("img", { name: "Vale" })).toBeInTheDocument();
  });

  it("hides the background illustration from assistive tech (purely decorative)", () => {
    // Empty alt already removes it from the "img" role entirely (that's
    // what makes it decorative) — aria-hidden is just belt-and-suspenders,
    // so this has to query by tag, not role, to find it at all.
    const { container } = render(
      <SplashScreen backgroundImageSrc="/scene.png" logoSrc="/logo.png" loadingValue={50} />,
    );
    const background = container.querySelector('img[alt=""]');
    expect(background).toHaveAttribute("aria-hidden");
  });

  it("shows loading progress via the LoadingBar", () => {
    render(<SplashScreen backgroundImageSrc="/scene.png" logoSrc="/logo.png" loadingValue={65} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "65");
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <SplashScreen backgroundImageSrc="/scene.png" logoSrc="/logo.png" loadingValue={65} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
