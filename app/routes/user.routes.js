module.exports = (app) => {
  const user = require('../controllers/users.controller.js');

  var router = require('express').Router();

  // Create a new Tutorial
  router.post('/', user.create);
  // Create a new Tutorial
  router.post('/note/:id', user.createNote);
  router.post('/omitted/:id', user.createOmitted);
  router.put('/correct/:id/:id3', user.createCorrect);
  router.post('/mark/:id', user.createMark);
  router.post('/unused/:id', user.createUnused);

  /**Correct Secation*/
  ///////////////////////////////////////////////////////////////////////////
  router.get('/correct/:id', user.findUserCorrect);
  router.put('/matchcorrect/:id/:id3', user.matchcorrect);
  router.put('/pullcorrect/:id/:idp', user.pullUsercorrect);
  router.put('/correct/:id/:id3', user.createcorrect);

  //////////////////////////////////////////////////////////////////////////

  /**Incorrect Secation*/
  ////////////////////////////////////////////////////////////////////////////
  // router.get('/incorrect/:id', user.findUserIncorect);
  router.put('/match/:id/:id3', user.matchIncorrect);
  router.put('/pullincorrect/:id/:idp', user.pullUserIncorrect);
  router.put('/incorrect/:id/:id3', user.createIncorrect);
  ////////////////////////////////////////////////////////////////////////////

  /**Omitted Secation*/
  ////////////////////////////////////////////////////////////////////////////
  router.get('/incorrect/:id', user.findUserIncorect);
  router.put('/matchomitted/:id/:id3', user.matchomitted);
  router.put('/pullomitted/:id/:idp', user.pullUserIncorrect);
  router.put('/createomitted/:id/:id3', user.createomitted);
  ////////////////////////////////////////////////////////////////////////////
  // Retrieve all Tutorials
  router.get('/findomitted/:id', user.findOmitted);
  router.get('/findIncorrect/:order', user.findQustions);

  // Retrieve all Tutorials
  router.get('/', user.findAll);

  // Retrieve all Tutorials
  router.get('/note/:id', user.findNote);
  // Retrieve all Tutorials

  router.get('/myquizes/:id', user.findQuizez);
  // find  all re
  router.get('/myquizes/resalut/:id', user.findResalut);

  // Retrieve all published Tutorials
  router.get('/published', user.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get('/:id', user.findOne);

  // Update a Tutorial with id
  router.put('/:id', user.update);

  router.post('/endquize/:id', user.endQuize);

  // ub
  router.put('/modifiy/:id', user.published);

  // update Without Delete
  router.put('/recovery/:id', user.recovery);

  // Delete a Tutorial with idy

  router.delete('/:id', user.delete);

  // Create a new Tutorial
  router.delete('/', user.deleteAll);
  router.put('/note/:id/:labelId', user.deleteNote);

  app.use('/api/user', router);
};
