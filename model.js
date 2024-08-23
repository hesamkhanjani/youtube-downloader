import amqp from 'amqplib/callback_api.js'





function sendToDownloader(url){

amqp.connect('amqp://localhost' , (err , connection)=>{
    if(err){throw err}

    connection.createChannel((err , channel)=>{

        const queue = 'downloader'

        channel.assertQueue(queue , {
            durable: false
        })
        channel.sendToQueue(queue , Buffer.from(url))
    })

    setTimeout(()=>{
        connection.close();
    } , 500)
})
}


amqp.connect('amqp://localhost' , (err , connection)=>{
    if(err){ throw err }

    connection.createChannel((err , channel)=>{
        if(err){ throw err }

        const queue = 'giveLink'

        channel.assertQueue(queue , {
            durable: false
        })
        channel.consume(queue , (msg)=>{
            sendToDownloader(msg.content.toString())


            
        },{
            noAck: true
        })
    })

})
