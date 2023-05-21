const db = require('../models');
const serves = require('../services/serversUser');
const User = db.user;
const Question = db.question;
// Create and Save a new daet
exports.create = (req, res) => {
  // Validate request

  //   if (!req.body.name) {
  //     res.status(400).send({ message: 'Content can not be empty!' });
  //     return;
  //   }
  // Create a daet
  const user = new User({
    name: req.body.name ? req.body.name : 'abuhawwas',
    email: req.body.email ? req.body.email : 'amer.com',
    phone: req.body.phone ? req.body.phone : '079',
    password: req.body.password ? req.body.password : '555',
    isSuperAdmain: req.body.isSuperAdmain ? req.body.isSuperAdmain : false,
    isAdmain: req.body.isAdmain ? req.body.isAdmain : false,
    myCourses: req.body.myCourses ? req.body.myCourses : [],
    previousQuiz: req.body.previousQuiz ? req.body.previousQuiz : [],
    noteQuiz: req.body.noteQuiz ? req.body.noteQuiz : [],
    Omitted: req.body.Omitted ? req.body.Omitted : [],
    Incorrect: req.body.Incorrect ? req.body.Incorrect : [],
    correct: req.body.correct ? req.body.correct : [],
    Mark: req.body.Mark ? req.body.Mark : [],
    unused: req.body.unused ? req.body.unused : [],
    allMyQustion: req.body.allMyQustion ? req.body.allMyQustion : [],
  });
  // const token = user.token();
  // user.auth = token;
  // Save locatins in the database
  user
    .save(user)
    .then((data) => {
      // res.header("Authorization", token).send(data);
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the user',
      });
    });
};

// Retrieve all calenders from the database.
exports.findAll = async (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  await User.find(condition)
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving user.......',
      });
    });
};

// Find a single calenders with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  await User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
// Find a single calenders with an id
exports.findQuizez = async (req, res) => {
  const id = req.params.id;

  await User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data.previousQuiz);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
exports.findResalut = async (req, res) => {
  const id = req.params.id;
  await User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data.previousQuiz[0].yourScore);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};

exports.findNote = async (req, res) => {
  const id = req.params.id;
  await User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data.noteQuiz);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
exports.findOmitted = async (req, res) => {
  const id = req.params.id;
  const ido = req.params.ido;
  await User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data.Omitted);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};

// exports.findIncorrect = async (req, res) => {
//   const id = req.params.idI;
//   await Question.find(id)
//     .then((data) => {
//       if (!data)
//         res.status(404).send({
//           message: 'Not found user with id ' + id,
//         });
//       else res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Error retrieving user with id=' + id,
//       });
//     });
// };

exports.findQustions = (req, res) => {
  const ids = req.params.order;

  Question.find({ id2: { $in: ids } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Cashs.......',
      });
    });
};

// Find a single calenders with an id
exports.createNote = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  User.findByIdAndUpdate(
    id,
    {
      $push: {
        noteQuiz: [body],
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
exports.createOmitted = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  User.findByIdAndUpdate(
    { _id: id },
    {
      $push: {
        Omitted: [body],
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
// Correct Seactions Start////////////////////////////////////////////////////////////////////////////////////////
exports.findUserCorrect = async (req, res) => {
  const id = req.params.id;
  const body = [];
  await User.findById(id)
    .then((data) => {
      if (!data)  
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data.correct)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};

exports.pullUsercorrect = async (req, res) => {
  const id = req.params.id;
  const body = req.params.idp;

  User.findByIdAndUpdate(
    { _id: id },
    {
      $pull: {
        correct: body,
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
exports.matchcorrect = async (req, res) => {
  const id = req.params.id;
  const body = req.params.id3;
  User.findById(
    { _id: id },
    function (err, exist) {
      User.find({
        $or: [
          { Incorrect: { $in: [body] } },
          { Omitted: { $in: [body] } },
          { unused: { $in: [body] } },
        ],
      })
        .then((r) => {
          User.findByIdAndUpdate(
            { _id: id },
            {
              $pull: {
                Omitted: body,
                unused: body,
                Incorrect: body,
              },
              $push: {
                correct: body,
              },
            },
            { useFindAndModify: false }
          ).then((data) => {
            if (!data)
              res.status(404).send({
                message: 'Not found user with id ' + id,
              });
            else res.send(data);
          });
        })
        .catch((err) => {
          console.log('sdsadsadsad');
        });
    },

    { useFindAndModify: false }
  )
    .then((data) => {})
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
exports.createcorrect = async (req, res) => {
  const id = req.params.id;
  const body = req.params.id3;

  User.findByIdAndUpdate(
    { _id: id },
    {
      $push: {
        Incorrect: [body],
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
// Correct Seactions End////////////////////////////////////////////////////////////////////////////////////////

// Incorrect Seactions Start /////////////////////////////////////////////////////////

exports.matchIncorrect = async (req, res) => {
  const id = req.params.id;
  const body = req.params.id3;
  User.findById(
    { _id: id },
    function (err, exist) {
      User.find({
        $or: [
          { correct: { $in: [body] } },
          { Omitted: { $in: [body] } },
          { unused: { $in: [body] } },
        ],
      })
        .then((r) => {
          User.findByIdAndUpdate(
            { _id: id },
            {
              $pull: {
                Omitted: body,
                unused: body,
                correct: body,
              },
              $push: {
                Incorrect: body,
              },
            },
            { useFindAndModify: false }
          ).then((data) => {
            if (!data)
              res.status(404).send({
                message: 'Not found user with id ' + id,
              });
            else res.send(data);
          });
        })
        .catch((err) => {
          console.log('sdsadsadsad');
        });
    },

    { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true }
  )
    .then((data) => {})
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
exports.createIncorrect = async (req, res) => {
  const id = req.params.id;
  const body = req.params.id3;

  User.findByIdAndUpdate(
    { _id: id },
    {
      $push: {
        Incorrect: [body],
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
exports.pullUserIncorrect = async (req, res) => {
  const id = req.params.id;
  const body = req.params.idp;

  User.findByIdAndUpdate(
    { _id: id },
    {
      $pull: {
        Incorrect: body,
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
exports.findUserIncorect = async (req, res) => {
  const id = req.params.id;
  await User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data.Incorrect);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};

// Incorrect Seactions End////////////////////////////////////////////////////////////////////////////////////////

// Omitted Seactions Start////////////////////////////////////////////////////////////////////////////////////////
exports.findUseromitted = async (req, res) => {
  const id = req.params.id;
  await User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data.Omitted);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
exports.pullUseromitted = async (req, res) => {
  const id = req.params.id;
  const body = req.params.idp;
  User.findByIdAndUpdate(
    { _id: id },
    {
      $pull: {
        Omitted: body,
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
exports.createomitted = async (req, res) => {
  const id = req.params.id;
  const body = req.params.id3;
  User.findByIdAndUpdate(
    { _id: id },
    {
      $push: {
        Omitted: [body],
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
exports.matchomitted = async (req, res) => {
  const id = req.params.id;
  const body = req.params.id3;
  User.findById(
    { _id: id },
    function (err, exist) {
      User.find({
        $or: [
          { correct: { $in: [body] } },
          { Incorrect: { $in: [body] } },
          { unused: { $in: [body] } },
        ],
      })
        .then((r) => {
          User.findByIdAndUpdate(
            { _id: id },
            {
              $pull: {
                correct: body,
                unused: body,
                Incorrect: body,
              },
              $push: {
                Omitted: body,
              },
            },
            { useFindAndModify: false }
          ).then((data) => {});
        })
        .catch((err) => {
          console.log('sdsadsadsad');
        });
    },

    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
// Omitted Seactions End////////////////////////////////////////////////////////////////////////////////////////

exports.createCorrect = async (req, res) => {
  const id = req.params.id;
  const body = req.params.id3;

  User.findByIdAndUpdate(
    id,
    {
      $push: {
        correct: [body],
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};

exports.createUnused = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  User.findByIdAndUpdate(
    id,
    {
      $push: {
        unused: [body],
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};
exports.createMark = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  User.findByIdAndUpdate(
    id,
    {
      $push: {
        Mark: [body],
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};

exports.endQuize = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  User.findByIdAndUpdate(
    id,
    {
      $push: {
        previousQuiz: body,
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found user with id ' + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      });
    });
};

// Update a calenders by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update calender with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: 'User was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating User with id=' + id,
      });
    });
};

// Delete a calenders with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe calender was not found!`,
        });
      } else {
        res.send({
          message: 'User was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id,
      });
    });
};

// UNDisplay for list without Delete
exports.published = async (req, res) => {
  const id = req.params.id;

  await User.findByIdAndUpdate(
    id,
    {
      $set: {
        published: false,
        updatedAt: new Date(),
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`,
        });
      } else {
        res.send({ message: 'user was updated successfully.' });
        console.log(`user was unDisplay successfully. ${id}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating user with id=' + id,
      });
    });
};

// Display for list
exports.recovery = async (req, res) => {
  const id = req.params.id;

  await User.findByIdAndUpdate(
    id,
    {
      $set: {
        published: true,
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update calender with id=${id}. Maybe calender was not found!`,
        });
      } else {
        res.send({ message: 'calender was updated successfully.' });
        console.log(`calender was Recovery successfully. ${id}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating calender with id=' + id,
      });
    });
};

// Delete all calenders from the database.
exports.deleteAll = async (req, res) => {
  await User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} User were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all User.',
      });
    });
};

// Find all published calenders
exports.findAllPublished = async (req, res) => {
  var selectedData = {
    __v: false,
    _id: false,
    published: false,
  };
  await User.find({ published: true }, selectedData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving calenders.',
      });
    });
};
exports.deleteNote = (req, res) => {
  const id = req.params.id;
  const labelId = req.params.labelId;
  User.update(
    { _id: id },
    {
      $pull: {
        noteQuiz: { labelId: labelId },
      },
    },

    {
      useFindAndModify: false,
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cash with id=${id}. Maybe Cash was not found!`,
        });
      } else {
        res.send({
          message: 'Cash was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Cash with id=' + id,
      });
    });
};
exports.findAllunPublished = async (req, res) => {
  await User.find({ published: false })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving calenders.',
      });
    });
};
