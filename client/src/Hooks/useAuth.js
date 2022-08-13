import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_ENVIRONMENT !== "production"
          ? "http://localhost:3001/login"
          : `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          code,
        }
      )
      .then(res => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        // Clean the code from URL
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        // Once the token is obtained, redirect the user to index
        window.location = "/";
      });
  }, [code]);

  // Refresh the token when it expires
  useEffect(() => {
    // Avoid sending an undefined refreshToken
    if (!refreshToken || !expiresIn) return;
    // Only refresh when the token is about to expire
    const interval = setInterval(() => {
      axios
        .post(
          process.env.REACT_APP_ENVIRONMENT !== "production"
            ? "http://localhost:3001/refresh"
            : `${process.env.REACT_APP_SERVER_URL}/refresh`,
          {
            refreshToken,
          }
        )
        .then(res => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(error => {
          // Once the token is obtained, redirect the user to index
          console.log(error);
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
