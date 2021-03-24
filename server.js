const express = require('express');
const app = express();
const port = 3000;
// import connect mongodb
const connect = require('./config/connect');
connect.connect();
//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// import control
const catController = require('./src/controller/catControl');
const postController = require('./src/controller/postControl');

//router
app.get('/cate', catController.getCate);
app.get('/post', postController.getPost);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
