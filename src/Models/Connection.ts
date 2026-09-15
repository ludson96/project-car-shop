/* eslint-disable no-console */
import mongoose from 'mongoose';
import 'dotenv/config';

const connectToDatabase = async (mongoDatabaseURI = process.env.MONGO_URI) => {
  // 1. Se foi informada uma URI explícita (ex: Atlas, Docker ou .env), tenta conectar nela primeiro
  if (mongoDatabaseURI) {
    try {
      return await mongoose.connect(mongoDatabaseURI, { serverSelectionTimeoutMS: 5000 });
    } catch (err) {
      console.log(`Failed to connect to ${mongoDatabaseURI}. Falling back to in-memory MongoDB...`);
    }
  }

  // 2. Fallback resiliente: Inicia servidor MongoDB embutido (em memória)
  console.log('Starting embedded in-memory MongoDB server...');
  const { MongoMemoryServer } = await import('mongodb-memory-server');
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log(`Embedded MongoDB connected successfully at ${uri}`);

  return mongoose.connect(uri);
};

export default connectToDatabase;