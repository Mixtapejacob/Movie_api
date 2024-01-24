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

// Confirm API is Active
app.get("/", (req, res) => {
  res.send("Welcome to the Movie application");
});

// get all movies
app.get("/movies/", (req, res) => {
  res.send(
    "Successful GET Return data (description, genre, director etc... for all movies"
  );
});

// get one movie by Title
app.get("/movies/:Title", (req, res) => {
  res.send("Successful GET Return one Movie per Title");
});

//  Post new user to register
app.post("/users/", (req, res) => {
  res.send("Successful Post Allow new user to register");
});

// get Genre description
app.get(
  "/movies/genres/:genreName",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(
      "Successful GET request Return data about a genre (description) by name/title (e.g., “Thriller”);"
    );
  }
);

// Get details about the director
app.get(
  "/movies/directors/:director",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(
      "Successful GET request Return data about a director (bio, birth year, death year) by name;;"
    );
  }
);

// Get all users
app.get(
  "/users/",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send("Successful GET request to list all users;");
  }
);

//Update user information
app.put(
  "/users/:username",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(
      "Successful PUT request Allow users to update their user info (username,password etc..); ;"
    );
  }
);

// Allow users to add a movie their List of Favorites
app.put(
  "/users/:Username/movies/:MovieID",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(
      "  Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later);;"
    );
  }
);

// Allow users to remove a movie their List of Favorites
app.delete(
  "/users/:Username/movies/:MovieID",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send("Successfully remove a favorite movie");
  }
);

// Remove user from user's list
app.delete(
  "/users/:Username",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(
      "Successful delete request Allow existing users to deregister (showing only a text that a user email has been removed—more on this later). ;"
    );
  }
);

// require("./auth")(router);
// app.use("/");

app.listen(8080, () => {
  console.log("Your app is listening on port 8080");
});

// In case of server issue
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});
