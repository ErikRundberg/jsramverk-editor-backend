const { ObjectId } = require("mongodb");
const dbConfig = require("../config/database");

let database;

const documentFacade = {
    saveDoc: async function saveDocument(doc) {
        try {
            database = await dbConfig.getDb();
            if (doc._id) {
                if (doc._id !== ObjectId.type) {
                    doc._id = ObjectId(doc._id);
                }
                await database.collection.updateOne({ _id: doc._id }, { $set: {
                    title: doc.title,
                    content: doc.content
                }});
                return doc;
            }
            const result = await database.collection.insertOne(doc);
            return {
                _id: result.insertedId,
                ...doc
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
            database = await dbConfig.getDb();
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
                    source: `/docs/${id}`
                }
            };
        } finally {
            await database.client.close();
        }
    },
    getDocs: async function getDocs() {
        try {
            database = await dbConfig.getDb();
            return await database.collection.find().toArray();
        } catch (e) {
            return {
                status: 500,
                errors: {
                    title: "Database error",
                    detail: e.message,
                    source: "/docs/all"
                }
            };
        } finally {
            await database.client.close();
        }
    }
}

module.exports = documentFacade;