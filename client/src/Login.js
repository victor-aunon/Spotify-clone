import React from "react";

import { Container } from "react-bootstrap";

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

const AUTH_URL = `https://accounts.spotify.com/authorize?${queryString}&scope=${permissions.join("%20")}`;

export default function Login() {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "100vh" }}
    >
      <h1 style={{ color: "#FFF", margin: "2rem", fontSize: "6vw" }}>
        Spotify webplayer with lyrics
      </h1>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login with Spotify
      </a>
    </Container>
  );
}
