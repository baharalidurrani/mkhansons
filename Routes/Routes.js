const express = require('express');
const Router = express.Router();
const Home = require('../Controllers/HomeController');
const Api = require('../Controllers/ApiController');
const Add = require('../Controllers/AddController');


//API route
Router.get('/api', Api.get);

//Home route
Router.get('/', Home.get);

Router.get('/add', Add.get);


//////////////////not found
Router.all('*', function (req, res) {
    res.send('NotFound');
});

module.exports = Router;