const expressAsyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

const userRegisterCtrl = expressAsyncHandler(async(req,res)=>{
    const {email} = req?.body;
    if (!email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {
      res.redirect("/register");
    }
    const userExist = await User.findOne({ email: req?.body?.email });
    if (userExist) {
      res.render("register",{message:"User already exist"});
      //throw new Error(" ");
    }
    try {      
      const user = await User.create({
        name: req?.body?.name,
        email: req?.body?.email,
        password: req?.body?.password,
      });
      if (user) {
        const token = generateToken(user)
        res.cookie('admin', token);
        res.redirect("/index");
      }
    } catch (error) {
      res.json(error);
    }
});
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  const userFound = await User.findOne({ email });
  //Check if password is match
  if (userFound && (await userFound.isPasswordMatched(password))) {
    const token = generateToken(userFound)
        res.cookie('admin', token);
        res.redirect("/index");
  } else {
    res.status(401);
    res.render("login",{message:"Invalid Crudentials"});
  }
});
const logoutUserCtrl = expressAsyncHandler(async(req,res)=>{
  res.clearCookie('admin');
  res.redirect("/login");
})
module.exports = {userRegisterCtrl,loginUserCtrl,logoutUserCtrl}