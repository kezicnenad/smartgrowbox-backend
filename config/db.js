const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
const uri = process.env.MONGO_URI;  // Dohvati URI iz .env datoteke

let db;

const connectToDb = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db();  // Automatski koristi bazu iz URI-ja
  console.log('Connected to MongoDB');
};

const getDb = () => db;

module.exports = { connectToDb, getDb };
