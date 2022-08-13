/* eslint-disable no-undef */

describe("SpotifyClone", () => {
  it("Test login, search song and get lyrics", () => {
    // Login button is clickable
    cy.visit("http://localhost:3000");
    cy.contains("Spotify webplayer with lyrics");
    cy.contains("Login with Spotify").click();

    cy.origin("https://accounts.spotify.com", () => {
      const username = Cypress.env("spotify_account");
      const password = Cypress.env("spotify_pass");

      // Enter user and pass in spotify login
      cy.get("#login-username").type(username);
      cy.get("#login-password").type(password);
      cy.get("#login-button").click();
    });

    // Search a song
    cy.get('[placeholder="Search songs or artists"]').type("Porcelain");

    // Get the album thumbnail
    cy.get("img").should(
      "have.attr",
      "src",
      "https://i.scdn.co/image/ab67616d0000485173b063d18cd9be91eb12284a"
    );

    // Click on the artist name
    cy.get("img")
      .should(
        "have.attr",
        "src",
        "https://i.scdn.co/image/ab67616d0000485173b063d18cd9be91eb12284a"
      )
      .parent()
      .contains("Moby")
      .click();

    // Check that the song is being played
    cy.get("div").should("have.class", "PlayerRSWP");

    // Check the lyrics
    cy.get('[placeholder="Search songs or artists"]')
      .next("div")
      .contains("'Cause in my dreams I'm dying all the time");
  });
});
