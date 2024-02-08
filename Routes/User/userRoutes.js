const express = require('express');
const { userRegisterCtrl, loginUserCtrl, logoutUserCtrl } = require('../../controller/userController');
const userRoutes = express.Router();
userRoutes.get("/register",(req,res)=>{
    if (req.cookies.admin) {
        res.redirect("/index");
    }
    else{
        
    res.render("register",{message:""});

    }
});
userRoutes.post("/register",userRegisterCtrl);
userRoutes.post("/login",loginUserCtrl);
userRoutes.get("/login",(req,res)=>{
    console.log(req.cookies);
    if (req.cookies.admin) {
        res.redirect("/index")
    }
    else{
        res.render("login",{message:""});
    }

    
});
userRoutes.get("/logout",logoutUserCtrl);
module.exports = userRoutes;