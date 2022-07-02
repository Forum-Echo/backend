import { MongoClient } from 'mongodb';

const db_url = `mongodb+srv://admin:TWBYJ6KA7o5WZGFx@forumecho.pgc3t9e.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(db_url);

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
  return await target_database.collection(target_collection).deleteMany(filter);
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
