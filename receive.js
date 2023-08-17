import amqp from 'amqplib/callback_api.js';

amqp.connect('amqp://yourusername:yourpassword@localhost:5672', {},function(err1, con) {
    if(err1) throw err1;

    con.createChannel(function(err2, channel) {
        if(err2) throw err2;

        const queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.consume(queue, function(msg) {
            console.log('[x] Received %s', msg.content.toString());
        }, { noAck: true })
    })
})