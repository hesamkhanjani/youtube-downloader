import express from "express"
import bodyParser from "body-parser"
const app = express()
const PORT = process.env.PORT || 1000

app.use(bodyParser.urlencoded({extended: true}))

app.set("views" , "./view")
app.set("view engine" , "ejs")


app.get('/' , (req,res)=>{

    res.render("index" , {message: "hello every one"})
})


app.post('/post' , (req,res)=>{
    console.log(req.body)
})



app.listen(PORT , ()=> { console.log(`app run on ${PORT}.`) })





