const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const localStorage = require('localStorage');
const { loginValidator } = require('../middleware/validateLogin');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//sign token
function generateAccessToken(role) {
    return jwt.sign(role, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

const createUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role,
        status: true,
    });
    try {
        // // check data empty
        // if (!post.title || !post.description || !post.content) {
        //     return res
        //         .status(400)
        //         .json({ status: false, data: errPost.missing_data });
        // }
        // // check  selectCate if null set unCate default
        // if (post.selectCate.length === 0) {
        //     const getIdUnCat = await Cate.findOne({ name: 'unCate' });
        //     post.selectCate = getIdUnCat._id;
        // }
        // create new post
        const saveUser = await user.save();
        // return to data
        return res.status(200).json({ status: true, data: saveUser });
    } catch (err) {
        console.log(err);
    }
};

const login = async (req, res) => {
    const { error } = loginValidator(req.body);

    if (error) return res.status(422).send(error.details[0].message);

    //tao user moi
    const user = await User.findOne({ email: req.body.email });
    //check user email
    if (!user)
        return res.status(422).send('Email hoặc mật khẩu không chính xác');

    //hash password nguoc
    const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    //check password
    if (!checkPassword)
        return res.status(422).send(' mật khẩu không chính xác');

    //send token using jwt
    const token = generateAccessToken({ role: user.role });
    return res.send(localStorage.setItem('auth', token));
};

const getUser = async (req, res) => {
    try {
        const user = await User.find();
        // return to data
        return res.status(200).json({ status: true, data: user });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getUser,
    createUser,
    login,
};
