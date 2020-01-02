var express=require('express');
var router=express.Router()
var usermodel=require('../model/users');
router.use(express.json())

router.get('/',(req,res)=>{
    if (!req.isAuthenticated()) { 
        res.redirect('/auth/login');
      }
    res.render('employee/allusers');
});
router.get('/add',(req,res)=>{
    if (!req.isAuthenticated()) { 
        res.redirect('/auth/login');
      }
    res.render('employee/addoredit');
});
router.post('/add',(req,res)=>{
    if (!req.isAuthenticated()) { 
        res.redirect('/auth/login');
      }

        const users = req.app.locals.users;
        const _id = ObjectID(req.session.passport.user);
        console.log(_id)
        users.findOne({ _id }, (err, results) => {
            if (err) {
                throw err
                ;
            }
        })
            console.log(users)
    data={
        email:req.body.email,
        name:req.body.name,
        mobileno:req.body.mobileno,
        isAdmin:false
    }
    console.log(data)
    usermodel.insertUser(req.app.locals.db,data).then(function(err,result){
        console.log(result)
        res.redirect('/users')
    })
    
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