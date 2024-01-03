const express = require('express');
const app = express();
const bodyParser = require('body-parser'),
  methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static('public'));

let topBooks = [
    {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      author: 'J.K. Rowling'
    },
    {
      title: 'Lord of the Rings',
      author: 'J.R.R. Tolkien'
    },
    {
      title: 'Twilight',
      author: 'Stephanie Meyer'
    }
  ];
  
  //  # 0 GET requests
  app.get('/', (req, res) => {
    res.send('Welcome to my movie club!');
  });

  app.get('//movies/[title]', (req, res) => {
    res.json(user.find( (user) =>
      { return user.name === req.params.name }));
  });

  
 


  // #1 Return a list of ALL movies to the user
  app.get('/movies', (req, res) => {
    res.send('Successful GET request returning data on all the movies');
  });

  // #2 Return   data   (description,   genre,   director,   image   URL,   whether   it’s   featured   or   not)   about   a  single   movie   by   title   to   the   user
  app.get('/movies/:Title', (req, res) => {
    res.send('Successful GET request returning data on all the movies');
  });
  // #3 Return   data   about   a   genre   (description)   by   name/title   (e.g.,   “Thriller”)
  app.get('/movies/genres/ ', (req, res) => {
    res.send('Successful GET request returning data on all the movies');
  });



 
// #4 Return   data   about   a   director   (bio,   birth   year,   death   year)   by   name 
  app.get('	/movies/directors/', (req, res) => {
    res.send('Successful GET request returning data on all the director');
  });

  //   #5 POST request to add new user
  app.post('/users', (req, res) => {
    let newusers = req.body;
  
    if(newusers.name) {
      const message = 'Missing "name" in request body';
      res.status(400).send(message);
    } else {
      newusers.id = uuid.v4();
      user.push(newusers);
      res.status(201).send(newusers);
    }
  });

  // #6 Allow   users   to   update   their   user   info   (username,   password,   email,   date   of   birth)
  app.get('/movies', (req, res) => {
    res.send('Successful GET request returning data on all the movies');
  });




// serves the docuemntation html page
  app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
  });

  // #8 Allow   users   to   remove   a   movie   from   their   list   of   favorites
  app.get('/movies', (req, res) => {
    res.send('Successful GET request returning data on all the movies');
  });

  // #9 Allow   existing   users   to   deregister

app.get('/movies', (req, res) => {
    res.send('Successful GET request returning data on all the movies');
  });



  
  // app.delete('/students/:id', (req, res) => {
  //   let student = students.find((student) => { return student.id === req.params.id });
  // });

 // listen for requests
  app.listen(8080, () => {
      console.log('Your app is listening on port 8080.');
  });