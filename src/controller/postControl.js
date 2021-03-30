// model
const Post = require('../model/postModel');
const Cate = require('../model/cateModel');
// lang
const errPost = require('../../lang/post.json').vn;
const { postValidator } = require('../middleware/validatePost');

// list post
const getListPost = async (req, res) => {
    try {
        const post = await Post.find();
        // return to data
        return res.status(200).json({ status: true, data: post });
    } catch (error) {
        console.log(error);
    }
};

// detail post
const getDetail = async (req, res) => {
    let postId = req.params.postId;
    try {
        // check length objectId
        if (postId.length !== 24) {
            return res
                .status(400)
                .json({ status: false, data: errPost.id_not_found });
        }
        // search buy id
        const post = await Post.findById(postId);
        // post null return bug
        if (!post) {
            return res.status(400).json({ status: false, data: {} });
        }
        // return to data
        return res.status(200).json({ status: true, data: post });
    } catch (error) {
        console.log(error);
    }
};

// post blog
const createPost = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        selectCate: req.body.selectCate,
        description: req.body.description,
        content: req.body.content,
        status: true,
        createdAt: new Date().toISOString(),
    });
    try {
        // check data empty
        if (!post.title || !post.description || !post.content) {
            return res
                .status(400)
                .json({ status: false, data: errPost.missing_data });
        }
        // const { error } = postValidator(req.body);

        // if (error) return res.status(422).send(error.details[0].message);
        // check  selectCate if null set unCate default
        if (post.selectCate.length === 0) {
            const getIdUnCat = await Cate.findOne({ name: 'unCate' });
            post.selectCate = getIdUnCat._id;
        }
        // create new post
        const savePost = await post.save();
        // return to data
        return res.status(200).json({ status: true, data: savePost });
    } catch (err) {
        console.log(err);
    }
};
const enablePost = async (req, res) => {
    const postId = req.params.postId;
    try {
        // check length objectId
        if (postId.length !== 24) {
            return res
                .status(400)
                .json({ status: false, data: errPost.id_not_found });
        }
        // search buy id
        const checkPost = await Post.findById(postId);
        // post null return bug
        if (!checkPost) {
            return res
                .status(400)
                .json({ status: false, data: errPost.post_not_found });
        }
        // disable
        await Post.updateOne(
            { _id: postId },
            {
                $set: {
                    status: true,
                },
            }
        );
        // return to data
        return res.status(200).json({ status: true });
    } catch (err) {
        console.log(err);
    }
};
// disable post
const disablePost = async (req, res) => {
    const postId = req.params.postId;
    try {
        // check length objectId
        if (postId.length !== 24) {
            return res
                .status(400)
                .json({ status: false, data: errPost.id_not_found });
        }
        // search buy id
        const checkPost = await Post.findById(postId);
        // post null return bug
        if (!checkPost) {
            return res
                .status(400)
                .json({ status: false, data: errPost.post_not_found });
        }
        // disable
        await Post.updateOne(
            { _id: postId },
            {
                $set: {
                    status: false,
                    disabledAt: new Date().toISOString(),
                },
            }
        );
        // return to data
        return res.status(200).json({ status: true });
    } catch (err) {
        console.log(err);
    }
};
//update Post
const updatePost = async (req, res) => {
    let postId = req.params.postId;
    let { title, selectCate, description, content } = req.body;
    try {
        // check length objectId
        if (postId.length !== 24) {
            return res
                .status(400)
                .json({ status: false, data: errPost.id_not_found });
        }
        // search buy id
        const checkPost = await Post.findById(postId);
        // post null return bug
        if (!checkPost) {
            return res
                .status(400)
                .json({ status: false, data: errPost.id_not_found });
        }
        // check data input
        // const { error } = postValidator(req.body);

        // if (error) return res.status(422).send(error.details[0].message);

        // update posts
        const post = await Post.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    title: req.body.title,
                    selectCate: req.body.selectCate,
                    description: req.body.description,
                    content: req.body.content,
                    updatedAt: new Date().toISOString(),
                },
            }
        );
        return res.status(200).json({ status: true, data: post });
    } catch (err) {
        console.log(err);
    }
};
// delete post
const deletePost = async (req, res) => {
    let postId = req.params.postId;
    try {
        // check length objectId
        if (postId.length !== 24) {
            return res
                .status(400)
                .json({ status: false, data: errPost.id_not_found });
        }
        // search buy id
        const checkPost = await Post.findById(postId);
        // post null return bug
        if (!checkPost) {
            return res
                .status(400)
                .json({ status: false, data: errPost.post_not_found });
        }
        // delete
        await Post.deleteOne({ _id: postId });
        return res.status(200).json({ status: true });
    } catch (err) {
        res.json({ message: err });
    }
};
module.exports = {
    getListPost,
    getDetail,
    createPost,
    disablePost,
    enablePost,
    updatePost,
    deletePost,
};
