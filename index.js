const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MLAB || 'mongodb://localhost:27017/mkhansons';

//if using the local .env
//then start the server using this command:
//env $(cat .env) nodemon

//problem with git commands

//setting template engine
app.set('view engine', 'ejs');
//static files
app.use(express.static('./views/assets'));

//middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

//connection with mongoose
mongoose.Promise = global.Promise;
mongoose.connect(URI, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database Connnected');
}).catch((err) => {
    console.log(err);
});

//start web server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

//fetch routes
app.use(require('./Routes/Routes'));