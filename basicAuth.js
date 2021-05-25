var auth=require('basic-auth')
var basicAuth=async (req,res,next)=>{
    const user=await auth(req)
    const username="test"
    const password="123456"
     if(user.name===username &&user.pass===password)
     {
         console.log("Allow")
     next()
     }
     else
     res.status(401).send("Deny")
}
module.exports=basicAuth