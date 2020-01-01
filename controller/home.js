var express=require('express');
var router=express.Router()
const Joi=require('joi')
router.use(express.json())
// var cust=[{
//     id:1,name:'a1'},
//     {id:2,name:'a2'},
//     {id:3,name:'a3',
// }]
router.get('/',(req,res)=>{
    var messages ="welcome";
    res.render("employee/home",{ messages })
});

module.exports=router;