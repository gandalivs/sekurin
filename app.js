var express = require('express');
var bodyParser = require('body-parser');
var registerRoute = require('./routes/register.route');
var formData = require('express-form-data');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/uploads', express.static('uploads'));

// for parsing multipart/form-data
app.use(formData.parse());
app.get('/', (req, res) => {
    res.json({ test: `hello node` });
});
app.use('/', (req, res, next) => {
    next();
});
app.use('/register', registerRoute);

var port = 3000;
app.listen(port, () => console.log(`server run at port ${port}`));