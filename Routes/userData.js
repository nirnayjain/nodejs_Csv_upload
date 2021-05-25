const express=require('express')
const router=express.Router()
const User=require('../model/User')
const csv=require('csvtojson')

var multer  = require('multer');
    var upload = multer({ dest: 'uploads/' });

router.post('/uploadCSV',upload.single('CSV'),async(req,res)=>{
   var details=[]
   csv()  
.fromFile(req.file.path)  
.then((jsonObj)=>{  
    console.log(jsonObj)
    details=jsonObj
   
}).then(()=>{
User.insertMany(details).then(function(){
    console.log("Data inserted") 
    res.send("Ok")
   
})
}).catch((error)=>{console.log((error))})
})
//Creating one
router.post('/createOne',express.json(),async(req,res)=>{
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age
    })
    try{
        const newUser=await user.save()
        res.status(201).json(newUser)
    }
    catch(err){
       res.status(400).json({message:err.message})
   }

})
//Getting one
router.get('/getOne/:id',getUser,(req,res)=>{
  
    res.send(res.user)

})
//Getting all

router.get('/getAll',async(req,res)=>{
   try{
       const user=await User.find()
       res.send(user)
   }
   catch(err){
       res.status(500).json({message:err.message})
   }
})
//Updating one
router.patch('/update/:id',getUser,express.json(),async(req,res)=>{
    
        if(req.body.name!=null)
        {
            res.user.name=req.body.name
        }
        
        if(req.body.email!=null)
        {
            res.user.email=req.body.email
        }
          if(req.body.phone!=null)
        {
            res.user.phone=req.body.phone
        }
          if(req.body.age!=null)
        {
            res.user.age=req.body.age
        }
        try{
          const updatedUser=await res.user.save();
          res.json(updatedUser)
        }
        catch(err)
        {
            res.status(400).json({message:err.message})
        }
    

})

//Deleting one
router.delete('/delete/:id',getUser,async(req,res)=>{
    try{
        await res.user.remove();
        res.json({message:"User deleted"})
        
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }

})
async function getUser(req,res,next){
    let user;
try{
    user=await User.findById(req.params.id)
    if(user==null)
   return res.status(404).json({message:"Cannot find User"})
}
catch(err){
    return res.status(500).json({message:err.message})

}
res.user=user;
next();
}


module.exports=router