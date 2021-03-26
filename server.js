const express = require('express');
const app = express();
const port = 3000;
// import connect mongodb
const connect = require('./config/connect');
connect.connect();
//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// import middleware
const verifyLogin = require('./src/middleware/loginMidd');
// import control
const catController = require('./src/controller/catControl');
const postController = require('./src/controller/postControl');
const authController = require('./src/controller/authControl');

//router cate
app.get('/cate', catController.getListAll);
app.get('/listone/:cateId', catController.getListOne);
app.post('/cate', catController.createCate);
app.delete('/cate/:cateId', catController.deleteCate);
app.patch('/cate/:cateId', catController.updateCate);
// router post
app.get('/getList', postController.getListPost);
app.get('/getDetail/:postId', postController.getDetail);
app.post('/createPost', postController.createPost);
app.patch('/disable/:postId', postController.disablePost);
app.patch('/update/:postId', postController.updatePost);
app.delete('/delete/:postId', postController.deletePost);
//router login
app.get('/getUser', verifyLogin, authController.getUser);
app.post('/createUser', authController.createUser);
app.post('/login', authController.login);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
