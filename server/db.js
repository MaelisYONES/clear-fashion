// JavaScript source code
const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = 'mongodb+srv://clear_fashion:webapp@clearfashion.xalba.mongodb.net/CLEARFASHION?retryWrites=true&w=majority'
const MONGODB_DB_NAME = 'CLEARFASHION'

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

async function connect() {
    try {
        const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        client.db(MONGODB_DB_NAME)
        console.log('Connected to database ')
    }
    catch (err) {
        console.error(`Error connecting to the database. \n${err}`);
    }

}


connect()

