/**
 * Main entry point of the application.
 *
 * @file index.js
 */

const mongoose = require('mongoose');

/**
 * User model
 *
 * @typedef {Object} User
 * @property {string} Birthday - The user's Birthday
 * @property {string} Username - The user's name
 * @property {string} Email - The user's email address
 */
let userSchema = mongoose.Schema({
	Username: { type: String, required: true },
	Password: { type: String, required: true },
	Email: { type: String, required: true },
	Birthday: Date,
	FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, Ref: 'Movie' }],
});

userSchema.statics.hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};
userSchema.methods.validatePassword = function (password) {
	return bcrypt.compareSync(password, this.Password);
};

let directorSchema = mongoose.Schema({
	Name: { String },
	Bio: { String },
	//Year
	Birth: { type: Date },
	Death: { type: Date },
});

/**
 * Movie model
 *
 * @typedef {Object} Movie
 * @property {string} Title - The movie title
 * @property {string} Description - A description of the movie
 * @property {Object} Genre - The genre of the movie
 * @property {string} Genre.Name - The name of the genre
 * @property {string} Genre.Description - A description of the genre
 * @property {Object} Director - The director of the movie
 * @property {string} Director.Name - The name of the director
 * @property {string} Director.Bio - A biography of the director
 * @property {string[]} Actors - An array of actors in the movie
 * @property {string} ImagePath - The path to an image of the movie
 * @property {boolean} Featured - Whether the movie is featured or not
 */
let movieSchema = mongoose.Schema({
	Title: { type: String, required: true },
	Description: { type: String, required: true },
	Genre: {
		Name: String,
		Description: String,
	},
	Director: {
		Name: String,
		Bio: String,
	},
	Actors: [String],
	ImagePath: String,
	Featured: Boolean,
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Director = mongoose.model('Directors', directorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
const bcrypt = require('bcrypt');
