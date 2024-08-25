import { render, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import TermsAndConditions from "../../src/components/TermsAndConditions";

describe("TermsAndConditions", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button"),
    };
  };

  it("should render component", () => {
    const { heading, checkbox, button } = renderComponent();

    expect(heading).toHaveTextContent("Terms & Conditions");
    expect(checkbox).not.toBeChecked();
    expect(button).toHaveTextContent(/submit/i);
    expect(button).toBeDisabled();
  });

  it("should enable button when checkbox is checked", async () => {
    // Arrange
    const { checkbox, button } = renderComponent();
    expect(checkbox).toBeInTheDocument();

    // Act
    // raise click event on checkbox
    const user = userEvents.setup();
    await user.click(checkbox);

    // Assert
    // check button
    expect(button).toBeEnabled();
  });
});
