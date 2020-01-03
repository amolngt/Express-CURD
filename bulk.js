var mongojs = require('mongojs');
db = mongojs('localhost/mytestdb');
data=[];
data1={}
const bulktest = db.collection('bulktest');
for (var i = 0; i < 100000 ;i++) {
    email='test'+i+'@gmail.com';
    mobno='9'+Math.floor(Math.random() * 900000000);
    data1={'name':"test",'email':email,"mobileno":mobno,"isAdmin" : false,"adminid" : "5e0db1337aa3d1165c17a801"};
    console.log(data1);
    data.push(data1);
}
try {
    bulktest.insertMany(data);
 } catch (e) {
    print (e);
 }
