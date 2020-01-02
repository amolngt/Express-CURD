var express=require('express');
var router=express.Router()
var usermodel=require('../model/users');
var mongo = require('mongodb');
router.use(express.json())

router.get('/',(req,res)=>{
    if (!req.isAuthenticated()) { 
        res.redirect('/auth/login');
      }
    usermodel.findUsersByAdmin(req.app.locals.db,req.session.passport.user).then(function(result){
        res.render('employee/allusers',{result});
    })
    
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
    // const _id = new mongo.ObjectID(req.session.passport.user);

    data={
        email:req.body.email,
        name:req.body.name,
        mobileno:req.body.mobileno,
        isAdmin:false,
        adminid:req.session.passport.user
    }
    usermodel.insertUser(req.app.locals.db,data).then(function(err,result){    
        console.log(result)    
        res.redirect('/users')
    })
})

router.get('/edit/:id',(req,res)=>{
    if (!req.isAuthenticated()) { 
        res.redirect('/auth/login');
    }    
    const _id = new mongo.ObjectID(req.params.id);
    usermodel.findUser(req.app.locals.db,_id).then(function(data){
        res.render('employee/addoredit',{data:data});
    })
})

router.post('/update',(req,res)=>{
    if (!req.isAuthenticated()) { 
        res.redirect('/auth/login');
      }
    const _id = new mongo.ObjectID(req.body.userid);
     
    data={
        email:req.body.email,
        name:req.body.name,
        mobileno:req.body.mobileno,
        isAdmin:false,
        adminid:req.session.passport.user
    }
    usermodel.updateUser(req.app.locals.db,_id,data).then(function(err,result){    
        console.log(result)    
        res.redirect('/users')
    })
})

router.get('/delete/:id',(req,res)=>{
    if (!req.isAuthenticated()) { 
        res.redirect('/auth/login');
      }
    const _id = new mongo.ObjectID(req.params.id);     
    usermodel.deleteUser(req.app.locals.db,_id).then(function(err,result){            
        res.redirect('/users')
    })
})

// router.get('/tasks/:id',(req,res)=>{
//     if (!req.isAuthenticated()) { 
//         res.redirect('/auth/login');
//     }    
//     const _id = new mongo.ObjectID(req.params.id);
//     usermodel.findTasks(req.app.locals.db,_id).then(function(data){
//         res.render('employee/mytasks',{data:data});
//     })
// })

router.post('/addtask',(req,res)=>{
    if (!req.isAuthenticated()) { 
        res.redirect('/auth/login');
      }
    data={
        taskname:req.body.taskname,
        description:req.body.description,
        userid:req.body.userid
    }
    usermodel.insertTaskForUser(req.app.locals.db,data).then(function(err,result){    
        console.log(result)    
        res.redirect('/users')
    })
})
module.exports=router;