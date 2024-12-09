<!DOCTYPE html>
<html lang ="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>DOCUMENTATION</title>
    </head>
    <body>
        <h1>Documentation Page</h1>
        <p> "This API will allow users to view movies and add to their favorites". Build a web application with backend component and will give details about
            their Favorite Movies and actors
           </p>
           <br />
    <h2>Supported Requests</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Request</th>
          <th scope="col">URL</th>
          <th scope="col">HTTP Method</th>
          <th scope="col">Request body data format</th>
          <th scope="col">Response body data format</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Get list of movies</td>
          <td>/movies</td>
          <td>GET</td>
          <td>None</td>
          <td>
            An array of JSON objects holding data about all the movies in the
            database
          </td>
        </tr>
        <tr>
          <td>Get list of movies by director</td>
          <td>/movies/directors/[director name]</td>
          <td>GET</td>
          <td>None</td>
          <td>
            An array of JSON objects holding data about all the movies by
            requested director
          </td>
        </tr>
        <tr>
          <td>Get list of movies by genre</td>
          <td>/movies/genres/[genre]</td>
          <td>GET</td>
          <td>None</td>
          <td>
            An array of JSON objects holding data about all the movies by
            requested genre
          </td>
        </tr>
        <tr>
          <td>Get data about a single movie by title</td>
          <td>/movies/[title]</td>
          <td>GET</td>
          <td>None</td>
          <td>
            A JSON object holding data about the requested movie like this:<br />
            { 'id': '######',<br />
            'title': 'Harry Potter and the Sorcerer\'s Stone',<br />
            'director': 'Chris Columbus',<br />
            'release-year': '2001',<br />
            'genre': 'adventure' }
          </td>
        </tr>
        <tr>
          <td>Allow users to update their user info (username, password, email, date of birth)</td>
          <td>/users/[name] </td>
          <td>PUT</td>
          <td> A JSON object holding data about the user to update, structured
            like:<br /><br />{ 'Name': 'John Doe',<br />
            'Username': '[username]',<br />
            'Email': [email@example.com],<br />
            'Birth-date': '1980-1-31' }</td>
          <td>
            A JSON object holding data about the user updated, structured:<br />
            { 'Name': 'John Doe',<br />
            'Username': '[username]',<br />
            'Email': [email@example.com],<br />
            'Birth-date': '1980-1-31' }
          </td>
        </tr>
        <tr>
          <td>Add a user</td>
          <td>/users</td>
          <td>POST</td>
          <td>
            A JSON object holding data about the user to add, structured
            like:<br /><br />{ 'Name': 'John Doe',<br />
            'Username': '[username]',<br />
            'Email': [email@example.com],<br />
            'Birth-date': '1980-1-31' }
          </td>
          
          <td>
            A JSON object holding data about the user that was added, including their assigned id:<br />
            { '_id': '######',<br />
            'Name': 'John Doe',<br />
            'Username': '[username]',<br />
            'Email': [email@example.com],<br />
            'Birth-date': '1980-1-31' }
          </td>
        </tr>
        <tr>
          <td>Add a movie to a user's favorites list by Title</td>
          <td>/users/[name]/movies/[movieID]</td>
          <td>PUT</td>
          <td>None</td>
          <td>
            A text message indicating whether the movie was successfully added
            from the user's favorited movies
          </td>
        </tr>
        <tr>
          <td>Remove a movie from a user's favorites list</td>
          <td>/users/[name]/movies/[movieID]</td>
          <td>DELETE</td>
          <td>None</td>
          <td>
            A text message indicating whether the movie was successfully removed
            from the user's favorited movies
          </td>
        </tr>
        <tr>
          <td>Allow existing users to deregister
          </td>
          <td>/users/[name]</td>
          <td>DELETE</td>
          <td>None</td>
          <td>
            A text message indicating whether the User was successfully removed
          </td>
        </tr>
      </tbody>
    </table>
    </body>
</html>





   
