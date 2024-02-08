const mongoose = require("mongoose");
const questionSchema = mongoose.Schema({
    question: {
        required: [true, "Exam name is required"],
        type: String,
      },
    options: {
        type: [String],
        required:[true,"Options are required"]
    },
    answer : {
        required: [true,"Correct option is required"],
        type:Number
    },
    creater: {
      required:[true,"User Name is required"],
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
        
  }
},
{
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
}
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;