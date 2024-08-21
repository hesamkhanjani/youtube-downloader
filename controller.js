import express from "express"
const app = express()
const PORT = process.env.PORT || 1000

app.set("views" , "./view")
app.set("view engine" , "ejs")

app.get('/' , (req,res)=>{

    res.
})




app.listen(PORT , ()=> {console.log(`app run on ${PORT}.`)})





