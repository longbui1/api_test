exports.tryCatchCustom = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            console.log('error', error);
            res.status(500).json({ status: false, data: error.stack });
        });
    };
};
