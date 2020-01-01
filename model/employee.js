function getAllUsers(db) {
return new Promise(function(resolve, reject) {

db.collection('users').find({}).toArray(function(err, result) {        
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
module.exports={getAllUsers,insertUser}