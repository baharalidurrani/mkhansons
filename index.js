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
//db connections with retry events
const options = {
    useNewUrlParser: true,
    autoReconnect: true,
};
var db = mongoose.connection;
db.on('connected', function () {
    console.log('Mongo connected at ' + URI);
});
db.on('disconnected', function () {
    console.log('Mongo disconnected!');
    setTimeout(() => mongoose.connect(URI, options), 5000);
});
db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});
db.on('error', function (error) {
    console.error('Mongo not connecting, ' + error);
    mongoose.disconnect();
});
mongoose.connect(URI, options);

//start web server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

//fetch routes
app.use(require('./Routes/Routes'));