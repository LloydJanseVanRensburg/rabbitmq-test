import amqp from "amqplib/callback_api.js";
import KEYS from "./keys.js";

const {
  RABBIT_MQ_USERNAME,
  RABBIT_MQ_PASSWORD,
  RABBIT_MQ_HOST,
  RABBIT_MQ_PORT,
} = KEYS;
const CONNECTION_STRING = `amqp://${RABBIT_MQ_USERNAME}:${RABBIT_MQ_PASSWORD}@${RABBIT_MQ_HOST}:${RABBIT_MQ_PORT}`;

amqp.connect(CONNECTION_STRING, {}, function (err1, con) {
  if (err1) {
    throw err1;
  }

  con.createChannel(function (err2, channel) {
    if (err2) {
      throw err2;
    }

    const queue = "task_queue";
    const msg = process.argv.slice(2).join(" ") || "Hello world!";

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true,
    });
    console.log("[x] Sent %s", msg);
  });

  setTimeout(() => {
    con.close();
    process.exit(0);
  }, 500);
});
