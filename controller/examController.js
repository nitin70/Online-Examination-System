const expressAsyncHandler = require("express-async-handler");
const Exam = require("../model/Exam");
const path = require("path");
var fs = require('fs');
const Question = require("../model/Question");

const addExamCtrl = expressAsyncHandler(async(req,res)=>{
    const {examname} = req?.body;
    const imageLocation = "images/"+req.file.filename;
    try {
        const exam = await Exam.create({
            name:examname,
            image:imageLocation,
            creater:req?.user
        });
        if (exam) {
            res.redirect("/addquestion");
        }
        console.log(exam);
    } catch (error) {
        res.json(error);
    }
});
const updateExamCtrl = expressAsyncHandler(async(req,res)=>{
    try {
        const {examId,button} = req.body;
        //console.log(questionId);
        const exam = await Exam.findById(examId);
        let filePath = path.join(__dirname,"../public",exam.image);
        
        //console.log(button);
        //console.log(question);
        if (button=="edit") {
            
            res.redirect(`/editexam/${examId}`);
        }
        else if(button == "delete"){
            const exam = await Exam.findById(examId);
            const questions = exam.questions;
            questions.forEach(async(question) => {
                await Question.findByIdAndDelete(question);    
            });
            await Exam.findByIdAndDelete(examId);
            try {
                fs.unlinkSync(filePath);
            } catch (error) {
                res.json("image missing" ,error)
            }
            res.redirect("/exams");
        }
    
        } catch (error) {
            res.json(error)
        }
});
const editExamCtrl = expressAsyncHandler(async(req,res)=>{
    const {examId} = req?.params;
    const {examname} = req?.body;
    const adress = req?.file?.filename;
    const newImage = "images/"+adress;
    
    
    try {
        const exam = await Exam.findById(examId);
        const oldImage = path.join(__dirname,"../public",exam.image);
        if (adress) {
            await Exam.findByIdAndUpdate(examId,{
                name:examname,
                image:newImage
            });
            try {
                fs.unlinkSync(oldImage);    
            } catch (error) {
                res.json("image is missing")
            }
                
        }else{
            await Exam.findByIdAndUpdate(examId,{
                name:examname,
            });
        }
        res.redirect("/exams");
        
    } catch (error) {
        res.json(error)
    }

});
module.exports = {addExamCtrl,updateExamCtrl,editExamCtrl}