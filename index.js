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
  res.send("Return a list of ALL movies to the user");
});

// get all movies
app.get("/movies/:movieTitle", (req, res) => {
  res.send("Successful GET Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user;");
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
app.put(
  "/users/movies",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => 
  {
    res.send("Successful PUT request Allow users to update their user info (username); ;");
  });



app.put(
  "/Username",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => 
  {
    res.send("  Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later);;");
  });

  app.put(
    "/users/:Username/movies/:MovieID",
    // passport.authenticate('jwt', { session: false }),
    (req, res) => 
    {
      res.send("Successfully adding a favorite movie");
    });
  // Remove movie from user's favorites array



app.delete(
  "/users/name",
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
