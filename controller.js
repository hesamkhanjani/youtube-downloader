import express from "express"
import bodyParser from "body-parser"
import amqp from "amqplib/callback_api.js"

const app = express()
const PORT = process.env.PORT || 1000
 
app.use(bodyParser.urlencoded({extended: true}))
app.set("views" , "./view")
app.set("view engine" , "ejs")


app.get('/' , (req,res)=>{

    res.render("index" , {message: "Give me url video page"})
    res.end()
})


app.post('/' , (req,res)=>{
    sendUrl(req.body.sended_url)
    res.redirect('/')
    res.end()
})

function sendUrl(url){
    amqp.connect('amqp://localhost' , (err , connection)=>{
        if (err){ throw err}
        connection.createChannel((err , channel)=>{
            if(err){throw err}
            const queue = 'giveLink'

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


app.listen(PORT , ()=> { console.log(`app run on ${PORT}.`) })





