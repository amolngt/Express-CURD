var express=require('express');
var router=express.Router()
const Joi=require('joi')
router.use(express.json())
var cust=[{
    id:1,name:'a1'},
    {id:2,name:'a2'},
    {id:3,name:'a3',
}]
router.get('/',(req,res)=>{
    res.send("hiiisss")
});

router.get('/api/cust',(req,res)=>{

    res.send(cust)
})

router.get('/api/cust/:id',(req,res)=>{
    let result=cust.find(c=> c.id===parseInt(req.params.id))
    if(!result) res.status(404).send("not found")
    res.send(result)
})

router.post("/api/cust",(req,res)=>{
    
    const result1=Joi.validate(req.body,schema);
    if(result1.error){
        res.status(404).send(result1.error.details[0].type);
        return
    }

    if(!req.body.name || req.body.name.length<3){
        res.status(404).send("invalid name");
        return;
    }
    const cusst={
        id: cust.length+1,
        name:req.body.name
    }
    cust.push(cusst);
    res.send(cust)
})

function validatefunc(custname){
    var schema={
        name:Joi.string().min(3).required()
    }
    return Joi.validate(custname,schema)
}
router.put('/api/cust/:id',(req,res)=>{
    const rr=cust.find(c=> c.id==parseInt(req.params.id));
    if(!rr){
        res.send("not foundss");
        return
    }
    const valid=validatefunc(req.body)
    if(valid.error){
        res.send("invalid");
        return;
    }

rr.name=req.body.name;
res.send(cust);
})

router.delete('/api/cust/:id',(req,res)=>{
    const rr=cust.find(c=> c.id==parseInt(req.params.id));
    const getindex=cust.indexOf(rr)
    cust.splice(getindex,1)
    res.send(cust);
})

module.exports=router;