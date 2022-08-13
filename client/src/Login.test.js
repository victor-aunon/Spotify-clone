import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

test("should render Login", () => {
  render(<Login />);
  const title = screen.getByText("Spotify webplayer with lyrics");
  expect(title).toBeDefined();

  const queryString = new URLSearchParams({
    client_id: process.env.REACT_APP_CLIENT_ID,
    response_type: "code",
    redirect_uri: process.env.REACT_APP_ENVIRONMENT !== "production"
    ? "http://localhost:3000"
    : `${process.env.REACT_APP_CLIENT_URL}`,
  }).toString();
  
  const permissions = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state",
  ];
  
  const authUrl = `https://accounts.spotify.com/authorize?${queryString}&scope=${permissions.join("%20")}`;

  const button = screen.getByText("Login with Spotify");
  expect(button).toHaveAttribute("href", authUrl)
});
