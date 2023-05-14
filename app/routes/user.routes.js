module.exports = (app) => {
   const user = require("../controllers/users.controller.js");

   var router = require("express").Router();

   // Create a new Tutorial
   router.post("/", user.create);
   // Create a new Tutorial
   router.post("/note/:id", user.createNote);

   // Retrieve all Tutorials
   router.get("/", user.findAll);

   // Retrieve all Tutorials
   router.get("/note/:id", user.findNote);
   // Retrieve all Tutorials
   router.get("/myquizes/:id", user.findQuizez);
    // find  all re
   router.get("/myquizes/resalut/:id", user.findResalut);

   // Retrieve all published Tutorials
   router.get("/published", user.findAllPublished);

   // Retrieve a single Tutorial with id
   router.get("/:id", user.findOne);

   // Update a Tutorial with id
   router.put("/:id", user.update);

   router.post("/endquize/:id", user.endQuize);

   // ub
   router.put("/modifiy/:id", user.published);

   // update Without Delete
   router.put("/recovery/:id", user.recovery);

   // Delete a Tutorial with idy
   
   router.delete("/:id", user.delete);

   // Create a new Tutorial
   router.delete("/", user.deleteAll);
   router.put("/note/:labelId", user.deleteNote);


   

   app.use("/api/user", router);
};
