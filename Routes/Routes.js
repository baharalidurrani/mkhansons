const express = require('express');
const Router = express.Router();
const Home = require('../Controllers/HomeController');
const Bill = require('../Controllers/BillController');
const AddProduct = require('../Controllers/AddProductController');
const AddCompany = require('../Controllers/AddCompanyController');


//API route
Router.get('/bill', Bill.get);

//Home route
Router.get('/', Home.get);

Router.get('/addp', AddProduct.get);
Router.get('/addc', AddCompany.get);
Router.post('/addc', AddCompany.post);


//////////////////not found
Router.all('*', function (req, res) {
    res.send('NotFound');
});

module.exports = Router;