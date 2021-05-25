var express=require('express')
var app=express()
var mongoose=require("mongoose")
const userData=require('./Routes/userData')
var multer  = require('multer');
var basicAuth=require('./basicAuth')
    var upload = multer({ dest: 'uploads/' });
require('dotenv').config()

const mongooseConnect=async()=>{
    try{
        const connection=await mongoose.connect(process.env.MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log("MongoDB  connected")
    }
    catch(error)
    {
        console.log(error)
    }
   
}
mongooseConnect()
app.use(basicAuth)
 app.use("/api",userData)

const port=process.env.PORT||3000
 app.listen(port,()=>console.log(`Server running in port ${port} `))
