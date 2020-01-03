function checkAlreadyexists(db,username) {
    return new Promise(function(resolve, reject) {    
    db.collection('users').find({'username':username,'isAdmin':true}).toArray(function(err, result) {        
        resolve(result);        
        });
    });
}
    
function insertUser(db,data) {
    return new Promise(function(resolve, reject) {
    db.collection('users').insertOne(data,function(err, result) {
        resolve(result);        
        });
    
    });
}

function findUser(db,userid) {
    return new Promise(function(resolve, reject) {
    db.collection('users').find({'_id':userid}).toArray(function(err, result) {        
        resolve(result);        
        });
    });
}

function findUsersByAdmin(db,userid,search) {
    if(typeof search == "string" ){
        return new Promise(function(resolve, reject) {            
            db.collection('bulktest').find({'mobileno':{ "$regex" : '^'+search , "$options" : "i"}}).limit(100).toArray(function(err,result) {
                resolve(result);        
                });
            });
    }else{   
        return new Promise(function(resolve, reject) {
        db.collection('users').find({'adminid':userid}).toArray(function(err, result) {
           
            resolve(result);        
            });
        });
    }
}

function updateUser(db,userid,data) {    
    return new Promise(function(resolve, reject) {
   
    db.collection("users").update({ "_id": userid }, { $set: data }, function (err, result) {      
        resolve(result);          
    });
});
}
function deleteUser(db,userid) {    
    return new Promise(function(resolve, reject) {
   
    db.collection("users").remove({ "_id": userid }, function (err, result) {
        resolve(result);          
    });
});
}

function findTasks(db,userid) {    
    return new Promise(function(resolve, reject) {
        db.collection('tasks').find({'_id':userid}).toArray(function(err, result) {        
            resolve(result);        
            });
        });
}

module.exports={checkAlreadyexists,insertUser,findUser,findUsersByAdmin,updateUser,deleteUser,findTasks}