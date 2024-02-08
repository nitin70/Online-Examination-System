const express = require('express');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const { errorHandler, notFound } = require("./middleware/errorHandler");
const dbConnect = require('./config/dbConnect');
const userRoutes = require('./Routes/User/userRoutes');
const deshboardRoutes = require('./Routes/Deshboard/deshboardRoutes');
const examRoutes = require('./Routes/Exam/examRoutes');
const questionRoutes = require('./Routes/Question/questionRoutes');
const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname+"/public"));
// app.set('trust proxy', 1) // trust first proxy
dbConnect();

app.use("/",userRoutes);
app.use("/",deshboardRoutes);
app.use("/",examRoutes);
app.use("/",questionRoutes);




app.use(notFound);
app.use(errorHandler);


app.listen(3000,()=>{
    console.log("server running on port 3000");
});