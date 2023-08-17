import amqp from 'amqplib/callback_api.js';

amqp.connect('amqp://yourusername:yourpassword@localhost:5672', {},function(err1, con) {
    if(err1) {
        throw err1;
    }

    con.createChannel(function(err2, channel) {
        if(err2) {
            throw err2;
        }

        const queue = 'hello';
        const msg = 'Hello world';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log("[x] Sent %s", msg);
    })

    setTimeout(() => {
        con.close();
        process.exit(0);
    }, 500)
})