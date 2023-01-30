const amqp = require('amqplib');

let connection,channel;
let transactionExchange = `Transactions`;

async function connectRabbitMQ(){
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    console.log(`Connection to rabbitMQ is successful`);
  } catch (e) {
    console.log(e)
  }
}

async function transactionsChannel(){
  try {
    channel = await connection.createChannel();
    await channel.assertExchange(transactionExchange, 'fanout', {
      durable:false
    })
    return {channel,transactionExchange};
  } catch (e) {
    console.log(e);
  }
}

module.exports = {connectRabbitMQ,transactionsChannel};