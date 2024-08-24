import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("Users list", () => {
  it("should render no users if users array is empty", () => {
    render(<UserList users={[]} />);
    const msg = screen.getByText(/no users/i);
    expect(msg).toBeInTheDocument();
  });

  it("should render users list", () => {
    const users: User[] = [
      { id: 1, name: "Mario", isAdmin: true },
      { id: 2, name: "Mariarosa" },
    ];

    render(<UserList users={users} />);

    users.forEach(user => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
