import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

//Components
import useAuth from "./Hooks/useAuth";
import TrackSearchResult from "./Components/TrackSearchResult";
import Player from "./Components/Player";
import styles from "./styles";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setLyrics("");
    setPlayingTrack(track);
    setSearch("");
  }

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    // Do not query songs until the finish of typing
    if (cancel) return;

    spotifyApi.searchTracks(search).then(res => {
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            albumName: track.album.name,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  useEffect(() => {
    // Do not query the lyrics if it is not playing a track
    if (!playingTrack) return;

    axios
      .get(
        process.env.REACT_APP_ENVIRONMENT === "development"
          ? "http://localhost:3001/lyrics"
          : `${process.env.REACT_APP_SERVER_URL}/lyrics`,
        {
          params: {
            track: playingTrack.title,
            artist: playingTrack.artist,
          },
        }
      )
      .then(res => {
        setLyrics(res.data.lyrics);
      });
  });

  return (
    <Container
      className="d-flex flex-column py-2"
      style={{ height: "100vh", maxWidth: "1000px" }}
    >
      <Form.Control
        type="search"
        placeholder="Search songs or artists"
        value={search}
        style={styles}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div
            className="text-center d-flex align-items-center justify-content-center"
            style={{
              ...styles,
              whiteSpace: "pre",
              borderRadius: "10px",
            }}
          >
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
}
