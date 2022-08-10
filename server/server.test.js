const supertest = require("supertest");
require("dotenv").config();

const app = require("./index");

const port = process.env.NODE_ENV === "test" ? 3000 : process.env.PORT;

describe("server", () => {
  describe("get / endpoint", () => {
    it("should return 200", async () => {
      const response = await supertest(app).get("/");

      expect(response.status).toBe(200);

      expect(response.text).toContain(
        `<h1>Go to <a href="http://localhost:${port}" target="_blank">http://localhost:${port}</a> and enjoy Spotify with lyrics</h1>`
      );
    });
  });

  describe("post /login endpoint", () => {
    it("should return error when the code is invalid", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ code: "XXXXXXXXXXX" });

      expect(response.status).toBe(400);

      expect(response.body.body.error_description).toBe("Invalid authorization code")
    });
  });

  describe("post /refresh endpoint", () => {
    it("should return error when the refreshToken is invalid", async () => {
      const response = await supertest(app)
        .post("/refresh")
        .send({ refreshToken: "XXXXXXXXXXX" });

      expect(response.status).toBe(400);

      expect(response.body.body.error_description).toBe("Invalid refresh token")
    });
  });

  describe("get /lyrics endpoint", () => {
    it("should return the lyrics given a track and an artist", async () => {
      const response = await supertest(app)
        .get("/lyrics").query({track: "porcelain", artist: "moby"})

      expect(response.status).toBe(200);

      expect(response.text).toContain("lyrics")
    });
  });
});
