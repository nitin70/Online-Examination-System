const express = require('express');
const { addExamCtrl, updateExamCtrl, editExamCtrl } = require('../../controller/examController');
const authMiddleware = require('../../middleware/authMiddleware');
const Exam = require('../../model/Exam');
const multer = require("multer");
const examRoutes = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:function (req,file,callback) {
        callback(null,Date.now()+'-'+file.originalname);
    }
});

const upload = multer({ storage: storage })




examRoutes.post("/addexam",authMiddleware,upload.single('image'),addExamCtrl);
examRoutes.post("/updateexam",authMiddleware,updateExamCtrl);
examRoutes.post("/editexam/:examId",authMiddleware,upload.single('image'),editExamCtrl);
examRoutes.get("/editexam/:examId",authMiddleware,async (req,res)=>{
    const {examId} = req?.params;
    
    const exam = await Exam.findById(examId);
    
    res.render("editExam",{user:req?.user,exam:exam});
})
module.exports = examRoutes;