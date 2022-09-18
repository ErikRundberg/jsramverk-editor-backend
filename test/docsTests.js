"use strict";

process.env.NODE_ENV = 'local';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const database = require("../config/database");

const testDocument = {
    _id: "5ce819935e539c343f141ece",
    title: "Test document",
    content: "Test content"
}

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
    before(() => {
        return new Promise(async (resolve) => {
            const db = await database.getDb();

            db.db.listCollections(
                { name: "local" }
            )
                .next()
                .then(async function (info) {
                    if (info) {
                        await db.collection.drop();
                    }
                })
                .catch(function (err) {
                    console.error(err);
                })
                .finally(async function () {
                    await db.client.close();
                    resolve();
                });
        });
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
        chai.request(server)
            .post("/docs")
            .send(testDocument)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.status.should.be.equal(201);
                res.body.should.be.an("object")
                res.body.data._id.should.be.equal(testDocument._id);
                res.body.data.title.should.be.equal(testDocument.title);
                res.body.data.title.should.be.equal(testDocument.title);
                res.body.data.content.should.be.equal(testDocument.content);

                done();
            });
    });
});
