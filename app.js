const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');

var registerRoute = require('./routes/register.route');
var userRoute = require('./routes/user.route');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('foto'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.json({ test: `hello node` });
});
app.use('/', (req, res, next) => {
    next();
});
app.use('/register', registerRoute);
app.use('/user', userRoute);

var port = 3000;
app.listen(port, () => console.log(`server run at port ${port}`));