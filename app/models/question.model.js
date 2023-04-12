module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    type: String,
    courses: String,
    subject: String,
    systems: String,
    topic: String,
    totalPoint: { type: Number, default: 0 },
    question: [Object],
  });

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Question = mongoose.model('questions', schema);
  return Question;
};
