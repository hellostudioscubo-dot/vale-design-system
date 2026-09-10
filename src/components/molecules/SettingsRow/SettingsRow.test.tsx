import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { SettingsRow } from "./SettingsRow";
import { Toggle } from "@/components/atoms/Toggle";

describe("SettingsRow", () => {
  it("renders the label and value as visible text", () => {
    render(
      <ul>
        <SettingsRow label="Cor" value="Lilás" onClick={vi.fn()} />
      </ul>,
    );
    expect(screen.getByText("Cor")).toBeInTheDocument();
    expect(screen.getByText("Lilás")).toBeInTheDocument();
  });

  it("renders as a real button when onClick is passed with no control", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <ul>
        <SettingsRow label="Cor" value="Lilás" onClick={onClick} />
      </ul>,
    );

    await user.click(screen.getByRole("button", { name: "Cor Lilás" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("hosts a control (e.g. Toggle) without wrapping it in a second interactive element", () => {
    render(
      <ul>
        <SettingsRow label="Som ambiente" control={<Toggle label="Som ambiente" hideLabel />} />
      </ul>,
    );
    expect(screen.getByRole("switch", { name: "Som ambiente" })).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders the description line when provided", () => {
    render(
      <ul>
        <SettingsRow
          label="Aviso ao terminar"
          description="Som e vibração"
          control={<Toggle label="Aviso ao terminar" hideLabel />}
        />
      </ul>,
    );
    expect(screen.getByText("Som e vibração")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <ul>
        <SettingsRow label="Cor" value="Lilás" onClick={vi.fn()} />
        <SettingsRow label="Som ambiente" control={<Toggle label="Som ambiente" hideLabel />} />
      </ul>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
