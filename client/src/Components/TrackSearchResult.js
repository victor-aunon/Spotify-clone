import React from "react";
import styles from "../styles";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ ...styles, cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img
        src={track.albumUrl}
        style={{ height: "68px", width: "68px", padding: "4px" }}
        alt={track.albumName}
      />
      <div style={{ marginLeft: "1rem" }}>
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
}
