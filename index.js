const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MLAB || 'mongodb://127.0.0.1:27017/mkhansons';

//if using the local .env
//then start the server using this command:
//env $(cat .env) nodemon

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
var connectWithRetry = function () {
    return mongoose.connect(URI, {
        useNewUrlParser: true
    }).then(() => {
        console.log('Mongo Connnected');
    }).catch((err) => {
        console.error('Failed to connect to Mongo - retrying in 5 sec', err);
        setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

//start web server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

//fetch routes
app.use(require('./Routes/Routes'));