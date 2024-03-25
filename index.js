const mongoose = require('mongoose');
const Models = require('./models.js');
const passport = require('passport');
require('./passport.js');
const PORT = process.env.PORT || 3030;

const Movies = Models.Movie;
const Users = Models.User;
// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect('mongodb+srv://jatakay1998:tNpfd8JJVLvPTQu3@cluster0.xrbeyjg.mongodb.net/movieapi', { useNewUrlParser: true, useUnifiedTopology: true });


const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  methodOverride = require("method-override");

const app = express();
const { check, validationResult } = require('express-validator');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* rest of code goes here*/
let auth = require('./auth.js')(app); 


app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static("public"));

let topBooks = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
  },
  {
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    title: "Twilight",
    author: "Stephanie Meyer",
  },
];

// serves the docuemntation html page
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// Confirm API is Active
app.get("/", (req, res) => {
  res.send("Welcome to the Movie application");
});

// get all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.find()
  .then((movies) => {
  res.status(201).json(movies);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
  });

// get one movie by Title
app.get('/Movies/:Title',  passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

//  Post new user to register
app.post('/users',// Validation logic here for request
//you can either use a chain of methods like .not().isEmpty()
//which means "opposite of isEmpty" in plain english "is not empty"
//or use .isLength({min: 5}) which means
//minimum value of 5 characters are only allowed
[
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], async (req, res) => {

  // check the validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// get Genre description
app.get('/movies/genres/:Genre', passport.authenticate('jwt', { session: false }),  async (req, res) => {
  await Movies.find({ "Genre.Name": req.params.Genre })
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get details about the director
app.get('/movies/directors/:Director',passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.find({ "Director.Name": req.params.Director })
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
// Get all users
app.get('/users',passport.authenticate('jwt', { session: false }) , async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Update user information
app.put('/users/:Username',passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err);
  })

});

// Allow users to add a movie their List of Favorites
app.put('/users/:Username/movies/:MovieID',passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }) // This line makes sure that the updated document is returned
 .then((updatedUser) => {
  console.log(updatedUser)
   res.json(updatedUser);
 })
 .catch((err) => {
   console.error(err);
   res.status(500).send('Error:'  + err);
 });
});


// Allow users to remove a movie their List of Favorites
app.delete('/users/:Username/movies/:MovieID',passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $pull: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err);
  });
});

// Remove user from user's list

app.delete('/users/:Username',passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
// require("./auth")(router);
// app.use("/");

app.listen(PORT, () => {
  console.log("Your app is listening on port 8080");
});

// In case of server issue
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});
