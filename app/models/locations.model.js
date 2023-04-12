module.exports = (mongoose) => {
   var schema = mongoose.Schema(
      {
         company_name: String,
         city: String,
         discription: String,
         location: String,
         published: Boolean,
      },
      { timestamps: true }
   );

   schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
   });

   const Locations = mongoose.model("locations", schema);
   return Locations;
};
