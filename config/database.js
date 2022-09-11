require('dotenv').config()

const mongo = require('mongodb').MongoClient;

const database = {
    getDb: async function getDb() {
        let uri = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@jsramverk.wqwu4vl.mongodb.net/?retryWrites=true&w=majority`;

    if (process.env.NODE_ENV === 'test') {
        uri = "mongodb://localhost:27017/test";
    }

    const client = await mongo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db("editor");
    const collection = await db.collection("docs");

    return { client: client, db: db, collection: collection };
    }
}


module.exports = database;