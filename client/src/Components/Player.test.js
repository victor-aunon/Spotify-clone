import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Player from "./Player";

describe("Player", () => {
  test("should not render when accessToken is null", () => {
    render(<Player accessToken={null} trackUri="XXXX"/>)
    expect(screen.queryByRole("div")).not.toBeInTheDocument()
  });
});
