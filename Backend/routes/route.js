module.exports=app=>{
    const express=require('express');
    const router=express.Router();
    const data=require('../controllers/controller')

    router.post('/',data.login);
    router.post('/login',data.login);
    router.post('/register',data.register);
    router.get('/home',data.getHome);
    router.post('/home',data.postHome);


    app.use('/',router);
}