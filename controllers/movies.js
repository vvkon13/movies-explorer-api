const Movie = require('../models/movie');
const {
  SUCCESS_CREATING_RESOURCE_CODE,
} = require('../utils/constants');

const ValidationError = require('../errors/ValidationErr');
const NotFoundError = require('../errors/NotFoundErr');

const errorHandlerMovies = (err) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return new ValidationError('Данные фильма не прошли валидацию.');
  }
  return err;
};

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      next(errorHandlerMovies(err));
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(SUCCESS_CREATING_RESOURCE_CODE).send(movie))
    .catch((err) => {
      next(errorHandlerMovies(err));
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.user._id;
  Movie.findOne({ movieId, owner })
    .then((movie) => {
      if (movie) {
        return Movie.deleteOne(movie)
          .then((element) => res.send(element))
          .catch((err) => {
            next(errorHandlerMovies(err));
          });
      }
      throw new NotFoundError('Фильм с указанным ID не найден.');
    })
    .catch((err) => {
      next(errorHandlerMovies(err));
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
  errorHandlerMovies,
};
