import { render, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import TermsAndConditions from "../../src/components/TermsAndConditions";

describe("TermsAndConditions", () => {
  it("should render component", () => {
    render(<TermsAndConditions />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Terms & Conditions");

    // check initial state
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // check disabled button
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/submit/i);
    expect(button).toBeDisabled();
  });

  it("should enable button when checkbox is checked", async () => {
    // Arrange
    render(<TermsAndConditions />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();

    // Act
    // raise click event on checkbox
    const user = userEvents.setup();
    await user.click(checkbox);

    // Assert
    // check button
    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
  });
});
