const localStorage = require('localStorage');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyLogin = (req, res, next) => {
    // const authHeader = req.headers['auth-token'];
    // const token = authHeader.split(' ')[1];
    // console.log(token);
    // // if (!token) return res.status(401).send('Asset Denied');

    // try {
    //     // const token = tokenHeader.split(' ')[1];
    //     // console.log(token);
    //     const verified = jwt.verify(
    //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUm9vdCIsImlhdCI6MTYxNjc0NzMxMSwiZXhwIjoxNjE2NzQ5MTExfQ.M4pvC1N7vPbhDux45dbNFV6t2wMgdyc-JDsIXQo5Icw',
    //         'tranducbo'
    //     );
    //     req.user = verified;
    //     next();
    // } catch (err) {
    //     res.status(400).send('Invalid token');
    // }

    const token = localStorage.getItem('auth');
    // console.log(getLocal);
    if (!token) return res.status(400).json('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verified.role !== 'Root') {
            return res
                .status(400)
                .json({ status: true, data: 'khong du quyen' });
        }
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

module.exports = verifyLogin;
