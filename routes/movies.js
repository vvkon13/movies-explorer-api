const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { MOVIE_VALIDATION_OBJECT } = require('../utils/constants');

router.get('/', getMovies);

router.post('/', celebrate(MOVIE_VALIDATION_OBJECT), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }).unknown(true),
}), deleteMovie);

module.exports = router;
