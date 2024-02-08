
const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const {createQuestion,updateQuestion, editQuestionCtrl} = require('../../controller/questionController');
const Question = require('../../model/Question');
const Exam = require('../../model/Exam');
const questionRoutes = express.Router();
questionRoutes.post("/addquestion",authMiddleware,createQuestion);
questionRoutes.post("/updateQuestion",authMiddleware,updateQuestion)
questionRoutes.post("/editquestion/:questionId",authMiddleware,editQuestionCtrl);
questionRoutes.get("/editquestion/:questionId",authMiddleware,async (req,res)=>{
    const {questionId} = req?.params;
    const question = await Question.findById(questionId);
    const exams = await Exam.find({creater:req?.user});
    console.log(question);
    res.render("editQuestion",{user:req?.user,question:question,exams:exams});
});
module.exports = questionRoutes;