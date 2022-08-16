# SpotifyClone

A web app made in react. Search for a song or artist and click one of the results. The music will start playing and the lyrics displayed on the screen.

---
## Client

Live version of the web app: https://cozy-belekoy-437771.netlify.app/

### Build it yourself

1. Download the code from the `client` branch of this repository.
2. Run `yarn install` to install the required dependencies.
3. Set the following environment variables:
    - REACT_APP_CLIENT_ID : create an app in https://developer.spotify.com/dashboard/ and copy your **ID**
    - REACT_APP_CLIENT_SECRET : create an app in https://developer.spotify.com/dashboard/ and copy your **SECRET**
    - REACT_APP_ENVIRONMENT: development, production,...
    - REACT_APP_SERVER_URL: the url of the server when the environment is not development

4. Run `yarn start` to start the app.

*The web player is only available for premium Spotify accounts*

---

## Server 

Live version of the server: https://spotify-clone-server-aunon.herokuapp.com/

### Build it yourself

1. Download the code from the `server` branch of this repository.
2. Run `yarn install` to install the required dependencies.
3. Set the following environment variables:
    - CLIENT_ID : create an app in https://developer.spotify.com/dashboard/ and copy your **ID**. Use the same used in the client.
    - CLIENT_SECRET : create an app in https://developer.spotify.com/dashboard/ and copy your **SECRET**. Use the same used in the client.
    - PORT: the port the server is listening. It will run on 3000 by default.
