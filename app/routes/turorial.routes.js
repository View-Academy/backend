module.exports = (app) => {
   const tutorials = require("../controllers/tutorial.controller.js");
   const auth = require("../middleware/auth");
   const admin = require("../middleware/admin");

   var router = require("express").Router();

   // Create a new Tutorial
   router.post("/", tutorials.create);

   // Retrieve all Tutorials
   router.get("/",[auth,admin], tutorials.findAll);

   // Retrieve all published Tutorials
   router.get("/published", tutorials.findAllPublished);

   // Retrieve a single Tutorial with id
   router.get("/:id", tutorials.findOne);

   // Update a Tutorial with id
   router.put("/:id", tutorials.update);

   // ub
   router.put("/modifiy/:id", tutorials.published);

   // Delete a Tutorial with id
   router.delete("/:id", tutorials.delete);

   // Create a new Tutorial
   router.delete("/", tutorials.deleteAll);

   app.use("/api/tutorials", router);
};
