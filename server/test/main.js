let chai = require("chai");
let chaiHttp = require("chai-http");
const Profile = require("../models/Profile");
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
let server = require("../app").set("NODE_ENV", "test");
let should = chai.should();

chai.use(chaiHttp);

let testProfile = {
  firstName: "Mocha",
  lastName: "Tester",
  keySkills: [
    "Python",
    "Javascript",
    "Team-building",
    "Unity",
    "MERN",
    "C",
    "Haskell",
    "SQL",
  ],
  linkToProfile: "mocha.tester",
  isNewUser: false,
};

let postTestProfile = {
  firstName: "Testing",
  lastName: "Successful",
  linkToProfile: "testing.successful",
  keySkills: [],
  isNewUser: true,
};

let testToken;
let testAuthUser;

before((done) => {
  // Give time for Mongoose to establish connection to MongoDB.
  setTimeout(done, 5000);
});

// Parent block
describe("Backend API Tests", () => {
  // Allow time for MongoDB to take a breather between requests.
  beforeEach((done) => setTimeout(done, 300));

  describe("Authorisation Tests", () => {
    it("should not auth a random visitor", (done) => {
      chai
        .request(server)
        .get("/api/auth/user")
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("should not auth any random token", (done) => {
      chai
        .request(server)
        .get("/api/auth/user")
        .set("x-auth-token", "random_non-empty_string")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("error");
          done();
        });
    });

    it("should not auth valid but expired token", (done) => {
      chai
        .request(server)
        .get("/api/auth/user")
        .set(
          "x-auth-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNmY2MDRmM2NkMzEwMjZiMDg3MzQ0MCIsImlhdCI6MTYwMTEzNDY3MiwiZXhwIjoxNjAxMTM0ODAwfQ.EFrFMAPgRAMqEuaDhrjQhRHKtcFGxNyUtFiy19dWZ88"
        )
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("error");
          done();
        });
    });

    it("should not allow login with any random input", (done) => {
      chai
        .request(server)
        .post("/api/auth/login")
        .send({ email: "randomemail@gmail.com", password: "admin" })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("error");
          done();
        });
    });

    it("should deny registration of an email that already exists", (done) => {
      chai
        .request(server)
        .post("/api/auth/register")
        .send({
          name: "Mocha Tester",
          email: "mochatester@cae.com",
          password: "mochatesterpassword",
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("error");
          done();
        });
    });

    it("should login the user with correct credentials", (done) => {
      chai
        .request(server)
        .post("/api/auth/login")
        .send({ email: "mochatester@cae.com", password: "mochatesterpassword" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("user");
          res.body.should.have.property("token");
          testToken = res.body.token;
          testAuthUser = res.body.user;
          done();
        });
    });
  });

  describe("Database Routes Tests", () => {
    it("should return a list of profiles", (done) => {
      chai
        .request(server)
        .get("/api/mongo/profiles")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("Array");
          done();
        });
    });

    it("should update a profile with new information, when authorised", (done) => {
      chai
        .request(server)
        .post("/api/mongo/p-update/" + testAuthUser.pid)
        .set("x-auth-token", testToken)
        .send(testProfile)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("Object");
          res.body.should.have.property("firstName");
          done();
        });
    });

    it("should return a specific profile based on its individual link", (done) => {
      chai
        .request(server)
        .get("/api/mongo/p/mocha.tester")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("Object");
          res.body.should.have.property("firstName", "Mocha");
          res.body.should.have
            .property("keySkills")
            .that.is.an("Array")
            .to.have.length(8);
          done();
        });
    });

    // it("should reset the test profile for the future", (done) => {
    //   chai
    //     .request(server)
    //     .post("/api/mongo/p-update/" + testAuthUser.pid)
    //     .set("x-auth-token", testToken)
    //     .send(postTestProfile)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.an("Object");
    //       res.body.should.have.property("firstName", "Testing");
    //       res.body.should.have
    //         .property("keySkills")
    //         .that.is.an("Array")
    //         .to.have.length(0);
    //       done();
    //     });
    // });
  });
});
