import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("should render user name", () => {
    const user: User = {
      id: 1,
      name: "Mario",
    };

    render(<UserAccount user={user} />);

    const name = screen.getByText(user.name);
    expect(name).toBeInTheDocument();
  });

  it("should render edit button for admin user", () => {
    const user: User = {
      id: 1,
      name: "Mario",
      isAdmin: true,
    };

    render(<UserAccount user={user} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should render edit button for user", () => {
    const user: User = {
      id: 1,
      name: "Mario",
    };

    render(<UserAccount user={user} />);

    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
