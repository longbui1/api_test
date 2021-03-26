const localStorage = require('localStorage');

const verifyLogin = (req, res, next) => {
    const getLocal = localStorage.getItem('Role');
    if (!getLocal) return res.status(400).send('Asset Denied');

    try {
        if (getLocal !== 'Root') {
            return res.status(400).send('khong du quyen');
        }
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

module.exports = verifyLogin;
