module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    id:String,
    type: String,
    courses: String,
    subject: String,
    systems: String,
    topic: String,
    totalPoint: { type: Number, default: 0 },
    question: [Object, { timestamps: true }],
  });

  schema.method('toJSON', function () {
    
    return object;
  });

  const Question = mongoose.model('questions', schema);
  return Question;
};
