require('dotenv').config();

const { NODE_ENV, JWT_SECRET_ENV, DB_HOST } = process.env;
const DEV_SECRET = 'SpartakChampion2024';
const DEV_DB_HOST = 'mongodb://127.0.0.1:27017/bitfilmsdb';

const DB = NODE_ENV === 'production' && DB_HOST ? DB_HOST : DEV_DB_HOST;
const JWT_SECRET = NODE_ENV === 'production' && JWT_SECRET_ENV ? JWT_SECRET_ENV : DEV_SECRET;

module.exports = { JWT_SECRET, DB };
