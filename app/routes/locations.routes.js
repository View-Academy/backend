module.exports = (app) => {
   const locations = require("../controllers/locations.controller.js");

   var router = require("express").Router();

   // Create a new locations
   router.post("/", locations.create);

   // Retrieve all locations
   router.get("/", locations.findAll);

   // Retrieve all published locations
   router.get("/published", locations.findAllPublished);

   // Retrieve all published locations
   router.get("/unpublished", locations.findAllunPublished);

   // Retrieve a single Tutorial with id
   router.get("/:id", locations.findOne);

   // Update a Tutorial with id
   router.put("/:id", locations.update);

   // update Without Delete
   router.put("/modifiy/:id", locations.published);

   // update Without Delete
   router.put("/recovery/:id", locations.recovery);

   // Delete a Tutorial with id
   router.delete("/:id", locations.delete);

   // Create a new Tutorial
   router.delete("/", locations.deleteAll);

   app.use("/api/locations", router);
};
