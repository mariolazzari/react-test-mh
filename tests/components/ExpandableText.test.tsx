import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText component", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const shortText = "Short text";
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render ExpandableText component", () => {
    const { container } = render(<ExpandableText text={shortText} />);
    expect(container).toBeInTheDocument();
  });

  it("should render ExpandableText with full text if less than 255 chars", () => {
    render(<ExpandableText text={shortText} />);

    expect(screen.getByText(/short/i)).toBeInTheDocument();
  });

  it("should render ExpandableText with truncated text if greater than 255 chars", () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    // check show more button
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
  });

  it("should expand ExpandableText when show more button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.queryByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it("should collapse ExpandableText when show less button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const moreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(moreButton);

    const lessButton = screen.getByRole("button", { name: /less/i });
    await user.click(lessButton);

    expect(screen.queryByText(truncatedText)).toBeInTheDocument();
    expect(moreButton).toHaveTextContent(/more/i);
    expect(lessButton).toHaveTextContent(/more/i);
  });
});
