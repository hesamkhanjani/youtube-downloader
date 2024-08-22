import amqp from 'amqplib/callback_api.js'

amqp.connect('amqp://localhost' , (err , connection)=>{
    if(err){ throw err }

    connection.createChannel((err , channel)=>{
        if(err){ throw err }

        const queue = 'giveLink'

        channel.assertQueue(queue , {
            durable: false
        })
        channel.consume(queue , (msg)=>{
            console.log(msg.content.toString())


            
        },{
            noAck: true
        })
    })

})