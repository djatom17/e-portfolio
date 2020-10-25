let mongoose = require("mongoose");
let User = require("../models/User");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app").set("NODE_ENV", "test");
let should = chai.should();

chai.use(chaiHttp);

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

    // it("should not login correct email but wrong password", (done) => {
    //   chai
    //     .request(server)
    //     .post("/api/auth/login")
    //     .send({ email: "testaccount@cae.com", password: "adminpassword" })
    //     .end((err, res) => {
    //       res.should.have.status(401);
    //       res.body.should.have.property("error");
    //       done();
    //     });
    // });

    // it("should correctly auth valid user and provide token", (done) => {
    //   chai
    //     .request(server)
    //     .post("/api/auth/login")
    //     .send({ email: "testaccount@cae.com", password: "testpassword123" })
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.have.property("token");
    //       res.body.should.have.property("user");
    //       done();
    //     });
    // });
  });

  describe("Database Tests", () => {});
});
