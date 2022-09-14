"use strict";

process.env.NODE_ENV = 'local';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const db = require("../config/database");

chai.should();
chai.use(chaiHttp);

describe("endpoints", () => {
    it('[GET] "/" - get endpoints', (done) => {
        chai.request(server)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.equal(200);
                res.body.should.be.an("object");
                res.body.data.endpoints.should.be.an("array");
                res.body.data.endpoints.length.should.be.above(0);

                done();
            })
    })
})
describe("documents", () => {
    before(async () => {
        const database = await db.getDb();
        database.db.dropCollection("docs");
    });

    it('[GET] "/docs" - get empty documents', (done) => {
        chai.request(server)
            .get("/docs")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.equal(200);
                res.body.should.be.an("object");
                res.body.data.should.be.an("array");
                res.body.data.length.should.be.equal(0);

                done();
        })
    });

    it('[POST] "/docs" - create document', (done) => {
        const document = {
            _id: "5ce819935e539c343f141ece",
            title: "Test document",
            content: "Test content"
        }
        chai.request(server)
            .post("/docs")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(document)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.status.should.be.equal(201);
                res.body.should.be.an("object")
                res.body.data._id.should.be.equal(document._id);
                res.body.data.title.should.be.equal(document.title);
                res.body.data.title.should.be.equal(document.title);
                res.body.data.content.should.be.equal(document.content);

                done();
            });
    });

    it('[GET] "/docs" - populated documents', (done) => {
        chai.request(server)
            .get("/docs")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.equal(200);
                res.body.should.be.an("object");
                res.body.data.should.be.an("array");
                res.body.data.length.should.be.equal(1);

                done();
            })
    });
});