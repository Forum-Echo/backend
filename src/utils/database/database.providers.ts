import { MongoClient } from 'mongodb';
import { databaseUrl } from '../../environment/environment';

// const databaseUrl = 'mongodb://localhost:27017';
const client = new MongoClient(databaseUrl);

client.connect();

// ----------- DATABASE METHODS ----------- //

// Find
export async function find(filter, target_collection, target_database) {
  return await client
    .db(target_database)
    .collection(target_collection)
    .find(filter)
    .toArray();
}

// Insert
export async function insert(amplifier, target_collection, target_database) {
  return await client
    .db(target_database)
    .collection(target_collection)
    .insertOne(amplifier);
}

// Delete
export async function del(filter, target_collection, target_database) {
  return await client
    .db(target_database)
    .collection(target_collection)
    .deleteMany(filter);
}

//Update
export async function update(
  filter,
  amplifier,
  target_collection,
  target_database,
) {
  return await client
    .db(target_database)
    .collection(target_collection)
    .updateOne(filter, amplifier);
}
