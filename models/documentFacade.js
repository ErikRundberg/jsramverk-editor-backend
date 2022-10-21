const { ObjectId } = require("mongodb");
const dbConfig = require("../config/database");

let database;

const documentFacade = {
    saveDoc: async function saveDocument(doc) {
        try {
            database = await dbConfig.getDb("docs");
            if (doc._id) {
                if (doc._id !== ObjectId.type) {
                    doc._id = ObjectId(doc._id);
                }
                await database.collection.updateOne({ _id: doc._id }, { $set: {
                    title: doc.title,
                    content: doc.content,
                }});
                return doc;
            }
            const result = await database.collection.insertOne({...doc, allowedUsers: [doc.allowedUsers]});

            return {
                _id: result.insertedId,
                title: doc.title,
                content: doc.content,
                allowedUsers: [doc.allowedUsers],
                editor: doc.editor
            };
        }
        catch (e) {
            return {
                status: 500,
                errors: {
                    title: "Database error",
                    detail: e.message,
                    source: "/docs"
                }
            };
        }
        finally {
            await database.client.close();
        }
    },
    openDoc: async function openDocument(id) {
        try {
            database = await dbConfig.getDb("docs");
            if (id !== ObjectId.type) {
                id = ObjectId(id);
            }
            const filter = { _id: id };
            const keyObject = await database.collection.findOne(filter);

            if (keyObject) {
                return keyObject;
            }
        } catch (e) {
            return {
                status: 500,
                errors: {
                    title: "Database error",
                    detail: e.message,
                    source: `/docs/id/${id}`
                }
            };
        } finally {
            await database.client.close();
        }
    },
    getDocs: async function getDocs(email=undefined, editor = undefined) {
        try {
            database = await dbConfig.getDb("docs");
            if (email === undefined) {
                return await database.collection.find().toArray();
            }
            return await database.collection.find({
                $and: [
                    { editor: editor },
                    { $or: [ { allowedUsers: "*" }, { allowedUsers: email } ]}
                ]}).toArray();
        } catch (e) {
            return {
                status: 500,
                errors: {
                    title: "Database error",
                    detail: e.message,
                    source: "/docs/:email"
                }
            };
        } finally {
            await database.client.close();
        }
    },
    addUser: async function addUser(body) {
        try {
            database = await dbConfig.getDb("docs");

            return await database.collection.updateOne(
                { _id: ObjectId(body._id) },
                { $push: { allowedUsers: body.email }}
            );
        } catch (e) {
            return {
                status: 500,
                errors: {
                    title: "Database error",
                    detail: e.message,
                    source: "/docs/add"
                }
            };
        } finally {
            await database.client.close();
        }
    }
}

module.exports = documentFacade;
