import express from 'express';
import home from './paths/home.js';
import search from './paths/search.js';
const app = express();

app.use('/', home);

app.use('/search', search);

app.listen(3000);