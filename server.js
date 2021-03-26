const express = require('express');
const app = express();
const port = 3001;
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
app.get('/getListCate', catController.getListAll);
app.get('/getDetailCate/:cateId', catController.getListOne);
app.post('/createCate', verifyLogin, catController.createCate);
app.delete('/deleteCate/:cateId', verifyLogin, catController.deleteCate);
app.patch('/updateCate/:cateId', verifyLogin, catController.updateCate);
// router post
app.get('/getList', postController.getListPost);
app.get('/getDetail/:postId', postController.getDetail);
app.post('/createPost', verifyLogin, postController.createPost);
app.patch('/disable/:postId', verifyLogin, postController.disablePost);
app.patch('/enable/:postId', verifyLogin, postController.enablePost);
app.patch('/update/:postId', verifyLogin, postController.updatePost);
app.delete('/delete/:postId', verifyLogin, postController.deletePost);
//router login
app.get('/getUser', verifyLogin, authController.getUser);
app.post('/createUser', authController.createUser);
app.post('/login', authController.login);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
