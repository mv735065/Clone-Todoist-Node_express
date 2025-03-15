let express=require('express');

let route=express.Router();
let user=require('../controller/user.controller')

route.post('/',user.createUser);

route.get('/',user.getAllUsers);
route.get('/:id',user.getUserById);
route.delete('/:id',user.deleteUserById);
route.delete('/',user.deleteAllUsers);



module.exports=route;