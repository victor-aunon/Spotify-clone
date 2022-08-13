import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import TrackSearchResult from "./TrackSearchResult";

describe("TrackSearchResult", () => {
  const mockChooseTrack = jest.fn();
  const track = {
    albumUrl:
      "https://i.scdn.co/image/ab67616d0000485173b063d18cd9be91eb12284a",
    albumName: "Play",
    title: "Porcelain",
    artist: "Moby",
  };

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<TrackSearchResult track={track} chooseTrack={mockChooseTrack} />);
  });

  test("should render TrackSearchResult", () => {
    const image = screen.getByRole("img");
    expect(image).toBeDefined();
    expect(image.alt).toBe(track.albumName);
    expect(image.src).toBe(track.albumUrl);
    expect(image).toHaveStyle("height: 68px");

    const divTitle = screen.getByText(track.title);
    expect(divTitle).toBeDefined();
    const divArtist = screen.getByText(track.artist);
    expect(divArtist).toBeDefined();
  });

  test("should click TrackSearchResult", () => {
    const divTitle = screen.getByText(track.title);
    fireEvent.click(divTitle)
    expect(mockChooseTrack).toHaveBeenCalledTimes(1)
  });
});
