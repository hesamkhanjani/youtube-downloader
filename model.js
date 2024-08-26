import amqp from 'amqplib/callback_api.js'




function checkQuality(str){
    var list = []
    var comList = []
    var redStr = ''
    var qual = ''

    list = str.split("#@#") 

    switch (list[1].toString()){

        case "1080":
            qual = '137'
            break;
        case "720":
            qual = '136'
            break;
        case "480":
            qual = '135'
            break;
        case "360":
            qual = '134'
            break;

        case "240":
            qual = '133'
            break;

        case "144":
            qual = '160'
            break;
    }

    comList.push(list[0])
    comList.push(qual)
    redStr = comList.join('#@#')

    sendToDownloader(redStr)
}

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
           
            checkQuality(msg.content.toString())


            
        },{
            noAck: true
        })
    })

})
