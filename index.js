const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  methodOverride = require("method-override");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

app.get("/", (req, res) => {
  res.send("Welcome to my movie club");
});

// get all movies
app.get("/movies", (req, res) => {
  res.send("Successful GET request returning data on all the movies");
});

// get movie(s) by genre
app.get(
  "/movies/genres/:genreName",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => 
  {
    res.send("Successful GET request Return data about a genre (description) by name/title (e.g., “Thriller”);");
  });

// Get movie(s) by director
app.get(
  "/movies/directors/:director",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => 
    {
      res.send("Successful GET request Return data about a director (bio, birth year, death year) by name;;");
    });
   

// Get all users
app.get(
  "/users",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => 
  {
    res.send("Successful GET request Allow new users to register;");
  });


//Get user by id
app.post(
  "/users/id/:id",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => 
  {
    res.send("Successful POST request Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later); ;");
  });

app.post(
  "/users",
  // [
    // check('Username', 'Username is required').isLength({ min: 1 }),
    // check(
    //   'Username',
    //   'Username contains non alphanumeric characters - not allowed.'
    // ).isAlphanumeric(),
    // check('Password', 'Password is required').not().isEmpty(),
    // check('Email', 'Email does not appear to be valid').isEmail(),
  // ],
  (req, res) => 
  {
  });

app.put(
  "/users/:Username",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => 
  {
    res.send("Successful PUT request Allow users to update their user info (username); ;");
  });



app.delete(
  "/users/:Username/movies/:MovieID",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => 
  {
    res.send("Successful delete request Allow existing users to deregister (showing only a text that a user email has been removed—more on this later). ;");
  });
// Remove movie from user's favorites array




// require("./auth")(router);
// app.use("/");

app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});

// In case of server issue
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});
