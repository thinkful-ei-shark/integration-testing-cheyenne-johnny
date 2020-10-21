const app = require("../app");
// require test libraries
const supertest = require("supertest");
const { expect } = require("chai");

// begin tests
describe("testing for app module", () => {
  it("should return status 200 and array of apps", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");
      });
  });
  it("testing genere", () => {
    return supertest(app).get("/apps").query({ genre: "action" }).expect(200);
  });
  it("test genre filter", () => {
    return supertest(app)
      .get("/apps")
      .query({ genre: "puzzle" })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");
        let response = true;
        let i = 0;
        while (i < res.body.length - 1) {
          const appAtI = res.body[i];
          console.log(appAtI.Genres);
          console.log(appAtI.Genres.includes("Action"));
          const appAtIPlus1 = res.body[i + 1];
          if (!appAtI.Genres.includes("Action")) {
            response = false;
            break;
          }
          i++;
        }
        expect(response).to.be.true;
      });
  });
});
