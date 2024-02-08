const mongoose = require("mongoose");
const examSchema = mongoose.Schema({
    name: {
        required: [true, "Exam name is required"],
        type: String,
      },
    questions: {
        type: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Question",
            }
          ]
    },
    creater: {
      required:[true,"User Name is required"],
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
        
  },
  image:{
    required:[true, "Image is required"],
    type: String
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

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;