import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import styles from "../styles";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  // Do not render the player if there is no accessToken
  if (!accessToken) return null;

  return (
    <div style={{ margin: "0.5rem 0" }}>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={state => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        styles={{
          bgColor: styles.backgroundColor,
          color: "#FFF",
          trackNameColor: "#FFF",
          trackArtistColor: "#AAA",
          sliderColor: "#6ed46a",
          sliderHandleColor: "#FFF",
        }}
      />
    </div>
  );
}
