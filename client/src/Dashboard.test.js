import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  const code = "xxxx";

  test("should render input search", () => {
    render(<Dashboard code={code} />);

    const inputSearch = screen.getByPlaceholderText("Search songs or artists");
    expect(inputSearch).toHaveClass("form-control");
  });
});
