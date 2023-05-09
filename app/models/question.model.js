module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    id2:Number,
    type: String,
    courses: String,
    subject: String,
    systems: String,
    topic: String,
    totalPoint: { type: Number, default: 0 },
    question: [Object, { timestamps: true }],
  });



  const Question = mongoose.model('questions', schema);
  return Question;
};
