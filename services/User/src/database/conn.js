import {MongoClient} from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGO_URL, {
  forceServerObjectId: true,
});

async function connectToServer() {
  await mongoClient.connect();
}

function getDb(dbName = 'user_service_db') {
  return mongoClient.db(dbName);
}

function close() {
  mongoClient.close();
}

export default {connectToServer, getDb, close};
