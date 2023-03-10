// const client = require('../config/MongoDb');
const { MongoClient,ObjectId } = require('mongodb');
const client = new MongoClient(process.env.MONGOURI);

module.exports = class userDAO{
  static async createUser(user){
    try {
      await client.connect();
      const db = client.db('Bank');
      const data = await db.collection('Users').insertOne(user);
      return data;
    } catch (e) {
      throw new Error(e);
    } finally{
      client.close();
    }
  }
  static async getAllUsers(){
    try {
      await client.connect();
      const db = client.db('Bank');
      const users = await db.collection('Users').find().toArray();
      return users;
    } catch (e) {
      throw new Error(e);
    } finally{
      client.close();
    }
  }

  static async getUser(id){
    try {
      await client.connect();
      const db = client.db('Bank');
      const user = await db.collection('Users').findOne({_id:ObjectId(id)});
      return user;
    } catch (e) {
      throw new Error(e);
    } finally{
      client.close();
    }
  }
}