process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

const testUser = "test@user.ax";
const testDocument = {
    _id: "5ce819935e539c343f141ece",
    title: "Test document",
    content: "Test content",
    allowedUsers: [testUser],
    editor: "doc",
}

chai.should();
chai.use(chaiHttp);
const api = chai.request(server).keepOpen();

const getDocuments = (description, length) => {
    it(description, (done) => {
        api.get(`/docs/${testUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.eq(200);
                res.body.should.be.an("object");
                res.body.data.should.be.an("array");
                res.body.data.length.should.be.eq(length);

                done();
            });
    });
}

describe("endpoints", () => {
    it('[GET] "/" - get endpoints', (done) => {
        api.get("/")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.eq(200);
                res.body.should.be.an("object");
                res.body.data.endpoints.should.be.an("array");
                res.body.data.endpoints.length.should.be.above(0);

            done();
        })
    })
})

describe("documents", () => {
    describe('Verify that database is empty', () => {
        getDocuments('[GET] "/docs" - Total documents is 0', 0);
    });

    describe('Create new document and delete it', () => {
        it('[POST] "/docs" - Creating document', (done) => {
            api.post("/docs")
                .send(testDocument)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.status.should.be.eq(201);
                    res.body.should.be.an("object")
                    res.body.data._id.should.be.eq(testDocument._id);
                    res.body.data.title.should.be.eq(testDocument.title);
                    res.body.data.content.should.be.eq(testDocument.content);
                    res.body.data.allowedUsers.should.be.an("array");
                    res.body.data.allowedUsers.length.should.be.eq(1);
                    res.body.data.editor.should.be.eq(testDocument.editor);

                done();
            });
        });

        // getDocuments('[GET] "/docs" - Total documents is 1', 1);
        //
        // it('[GET] "/docs/id/:id" - Get specific document', (done) => {
        //     api.get(`/docs/id/${testDocument._id}`)
        //         .end((err, res) => {
        //             console.log(res.body);
        //             res.should.have.status(200);
        //             res.body.status.should.be.eq(200);
        //             res.body.should.be.an("object");
        //             res.body.data._id.should.be.eq(testDocument._id);
        //             res.body.data.title.should.be.eq(testDocument.title);
        //             res.body.data.content.should.be.eq(testDocument.content);
        //             res.body.data.allowedUsers.should.be.an("array");
        //             res.body.data.allowedUsers.length.should.be.eq(1);
        //             res.body.data.editor.should.be.eq(testDocument.editor);
        //
        //         done();
        //     });
        // });
        //
        // it('[DELETE] "/docs" - Delete the document', (done) => {
        //     api.del("/docs")
        //         .send({_id: testDocument._id})
        //         .end((err, res) => {
        //             console.log(res.body);
        //             res.should.have.status(200);
        //             res.body.status.should.be.eq(200);
        //             res.body.should.be.an("object");
        //             res.body.data.acknowledged.should.be.eq(true);
        //             res.body.data.deletedCount.should.be.eq(1);
        //         done();
        //     });
        // });

        getDocuments('[GET] "/docs" - Total documents is 0 again', 0);
    });
});
