require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {
  errors,
  celebrate,
} = require('celebrate');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const { PORT, USER_VALIDATION_OBJECT, USER_VALIDATION_OBJECT_NO_NAME } = require('./utils/constants');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundErr');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate(USER_VALIDATION_OBJECT_NO_NAME), login);
app.post('/signup', celebrate(USER_VALIDATION_OBJECT), createUser);
app.use(auth);
app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);
app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
app.listen(PORT, () => {
});
