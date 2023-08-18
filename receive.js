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
  if (err1) throw err1;

  con.createChannel(function (err2, channel) {
    if (err2) throw err2;

    const queue = "task_queue";

    channel.assertQueue(queue, {
      durable: true,
    });
    channel.prefetch(1);
    channel.consume(
      queue,
      function (msg) {
        const message = msg.content.toString();
        const milSec = (message.split(".").length - 1) * 1000;

        console.log("[x] Received %s", message);

        setTimeout(() => {
          console.log("[x] Done");
          channel.ack(msg);
        }, milSec);
      },
      { noAck: false },
    );
  });
});
