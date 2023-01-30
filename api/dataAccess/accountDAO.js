// const client = require('../config/MongoDb');
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGOURI);
const userDAO = require("./userDao");

module.exports = class AccountDAO{
  static async createAccount(account){
    try {
      await client.connect();
      const db = client.db('Bank');
      const response = await db.collection('Accounts').insertOne(account);
      return response;
    } catch (e) {
      throw new Error(e);
    } finally{
      client.close();
    }
  }
  static async getAllAcounts(){
    try {
      await client.connect();
      const db = client.db('Bank');
      const accounts = await db.collection('Accounts').find().toArray();
      return accounts;
    } catch (e) {
      throw new Error(e);
    } finally{
      client.close();
    }
  }

  static async getAcount(accNumber){
    try {
      await client.connect();
      const db = client.db('Bank');
      const account = await db.collection('Accounts').findOne({accountNumber:accNumber})

      if(!account){
        throw new Error("There is no account with this account number")
      }

      return account;
    } catch (e) {
      throw new Error(e);
    } finally{
      client.close();
    }
  }

  static async withdraw(accNumber, amount){
    try {
      await client.connect();
      const db = client.db('Bank');
      const account = await db.collection('Accounts').findOne({accountNumber:accNumber})

      if(!account){
        return new Error("There is no account with this account number")
      }

      const balance = account.money - parseInt(amount);
      if(balance < 0){
        throw new Error("Insufficient Balance");
      }

      const user = userDAO.getUser(account.userId);
      const response = await db.collection('Accounts').updateOne({accountNumber:accNumber}, {$set:{money:balance}})
      return {response,balance,user};
    } catch (e) {
      throw new Error(e);
    } finally{
      client.close();
    }
  }

  static async deposit(accNumber, amount){
    try {
      await client.connect();
      const db = client.db('Bank');
      const account = await db.collection('Accounts').findOne({accountNumber:accNumber})

      if(!account){
        throw new Error("There is no account with this account number")
      }

      const balance = account.money + parseInt(amount);
      
      const user = userDAO.getUser(account.userId);
      const response = await db.collection('Accounts').updateOne({accountNumber:accNumber}, {$set:{money:balance}})
      return {response,balance,user};
    } catch (e) {
      throw new Error(e);
    } finally{
      client.close();
    }
  }
}