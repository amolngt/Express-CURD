const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/mytestdb",{userNewUrlParser:true},(err)=>{
    if(err){
        console.log("mongoose err"+err);
    }else{
        console.log("mongoose connected");
    }
});
