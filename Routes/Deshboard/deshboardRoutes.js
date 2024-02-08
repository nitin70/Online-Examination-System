const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const Exam = require('../../model/Exam');
const Question = require('../../model/Question');
const deshboardRoutes = express.Router();
deshboardRoutes.get("/index",authMiddleware,async(req,res)=>{
    const exams = await Exam.find({creater:req?.user});
    const questions = await Question.find({creater:req?.user});
    console.log(exams,"\n",questions);
    res.render("index",{user:req?.user,exams:exams,questions:questions});
});
deshboardRoutes.get("/addexam",authMiddleware,(req,res)=>{
    
    res.render("addExamForm",{user:req?.user});
});
deshboardRoutes.get("/addexam",authMiddleware,(req,res)=>{
    
    res.render("addExamForm",{user:req?.user});
});
deshboardRoutes.get("/addquestion",authMiddleware,async (req,res)=>{
    const exams = await Exam.find({creater:req?.user});
    if (exams.length == 0) {
        res.redirect("/addexam");
    }
    else
    res.render("questionForm",{user:req?.user,exams:exams});
});

deshboardRoutes.get("/questions",authMiddleware,async (req,res)=>{
    const questions = await Question.find({creater:req?.user});
    //console.log(questions);
    res.render("questions",{user:req?.user,questions:questions});
});
deshboardRoutes.get("/exams",authMiddleware,async (req,res)=>{
    try {
        const exams = await Exam.find({creater:req?.user});
    //console.log(questions);
    res.render("exams",{user:req?.user,exams:exams});
    } catch (error) {
        res.json(error)
    }
});

module.exports = deshboardRoutes;