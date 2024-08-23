// import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

describe("Greet", () => {
  it("should render Hello with name if prodided", () => {
    render(<Greet name="Mario" />);
    // screen.debug();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/mario/i);
  });

  it("should render Login button if no name passed", () => {
    render(<Greet />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
