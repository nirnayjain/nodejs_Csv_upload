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
app.get('/',(req,res)=>{
    res.send("Welcome to Node js backend project")
})
// app.use(basicAuth
function authentication(req, res, next) {
    var authheader = req.headers.authorization;
    console.log(req.headers);
 
    if (!authheader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }
 
    var auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
 
    if (user == 'admin' && pass == 'password') {
 
        // If Authorized user
        next();
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
 
}
 
// First step is the authentication of the client
app.use(authentication)
 app.use("/api",userData)

const port=process.env.PORT||3000
 app.listen(port,()=>console.log(`Server running in port ${port} `))
