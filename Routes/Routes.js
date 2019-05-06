const express = require('express');
const Router = express.Router();
const Home = require('../Controllers/HomeController');
const Bill = require('../Controllers/BillController');
const AddProduct = require('../Controllers/AddProductController');
const AddCompany = require('../Controllers/AddCompanyController');
const Summary = require('../Controllers/SummaryController');
const UpdateProduct = require('../Controllers/UpdateProductController');
const DeleteProduct = require('../Controllers/DeleteProductController');

//API route
// Router.get('/bill', Bill.get);
Router.post('/bill', Bill.post);

//Home route
Router.get('/', Home.get);

Router.get('/addp', AddProduct.get);
Router.post('/addp', AddProduct.post);

Router.get('/addc', AddCompany.get);
Router.post('/addc', AddCompany.post);

Router.get('/sum', Summary.get);

Router.get('/updatep', UpdateProduct.get);
Router.post('/updatep', UpdateProduct.post);

Router.get('/deletep', DeleteProduct.get);

//////////////////not found
Router.all('*', function (req, res) {
    res.send('NotFound');
});

module.exports = Router;