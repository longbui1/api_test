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

// router cate
app.get('/cate', catController.getCate);
// router post
app.get('/getList', postController.getListPost);
app.get('/getDetail/:postId', postController.getDetail);
app.post('/createPost', postController.createPost);
app.patch('/disable/:postId', postController.disablePost);
app.patch('/update/:postId', postController.updatePost);
app.delete('/delete/:postId', postController.deletePost);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
