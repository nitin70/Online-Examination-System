const expressAsyncHandler = require("express-async-handler");
const Question = require("../model/Question");
const Exam = require("../model/Exam");


const createQuestion = expressAsyncHandler(async(req,res)=>{
    const {examname,question,option1,option2,option3,option4,answer} = req?.body;
    const option = [option1,option2,option3,option4];
    
    try {
        const ques = await Question.create({
            question:question,
            options:option,
            answer:answer,
            creater:req?.user
        });
        
        let newExam = await Exam.findOne({creater:req.user,name:examname});
        //console.log(newExam);
        newExam.questions.push(ques?.id);
        newExam.save();
        res.redirect("/addquestion")
    
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

const updateQuestion = expressAsyncHandler(async(req,res)=>{
    try {
        const {questionId,button} = req.body;
        //console.log(questionId);
        const question = await Question.findById(questionId);
        console.log(button);
        //console.log(question);
        if (button=="edit") {
            
            res.redirect(`/editquestion/${questionId}`);
        }
        else if(button == "delete"){
            await Question.findByIdAndDelete(questionId);
           
            res.redirect("/questions");
        }
    
        } catch (error) {
            console.log(error);
            res.redirect("/")
        }
});

const editQuestionCtrl = expressAsyncHandler(async(req,res)=>{
    const {questionId} = req?.params;
    const {question,option1,option2,option3,option4,answer} = req?.body;
    try {
        await Question.findByIdAndUpdate(questionId,{
            question:question,
            option1:option1,
            option2:option2,
            option3:option2,
            option4:option4,
            answer:answer
        });
        res.redirect("/questions");
    } catch (error) {
        res.json(error)
    }

});

module.exports = {createQuestion,updateQuestion,editQuestionCtrl};