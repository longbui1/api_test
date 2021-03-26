// model
const Cate = require('../model/cateModel');
const valiCate = require('./../../lang/cate.json').vn;
const { cateValidator } = require('../middleware/validateCate');

//post Category
const createCate = async (req, res) => {
    const { error } = cateValidator(req.body);

    if (error) return res.status(422).send(error.details[0].message);

    const checkNameExist = await Cate.findOne({ name: req.body.name });
    if (checkNameExist)
        return res.status(402).send({ message: 'Name does not exist' });

    const cate = new Cate({
        name: req.body.name,
        description: req.body.description,
    });

    // if (!cate.name || !cate.description) {
    //     return res.status(400).json({ status: false, data: valiCate.empty });
    // }

    // if (cate.name.length < 6 || cate.description.length < 6) {
    //     return res
    //         .status(400)
    //         .json({ status: false, data: valiCate.length_min });
    // }

    // if (cate.name.length > 255 || cate.description.length > 255) {
    //     return res
    //         .status(400)
    //         .json({ status: false, data: valiCate.length_max });
    // }

    // // let catename = req.body.name;

    // var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    // if (cate.name.match(format)) {
    //     return res.status(400).send('Không được chưa kí tự đặc biệt đầu tiên');
    // }
    // } else {
    //     return res.send('Không được chưa kí tự đặc biệt');
    // }

    //save
    cate.save()
        .then((data) => {
            return res.send(data);
        })
        .catch((err) => {
            return res.status(500).send({
                message: 'Save faild !',
            });
        });
};

//list all
const getListAll = async (req, res) => {
    Cate.find()
        .then((cates) => {
            return res.send(cates);
        })
        .catch((err) => {
            return res.status(500).send({
                message: err,
            });
        });
};

//list one
const getListOne = async (req, res) => {
    Cate.findById(req.params.cateId)
        .then((cate) => {
            if (!cate) {
                return res.status(400).send({
                    message: 'Category is not find id : ' + req.params.cateId,
                });
            } else return res.send(cate);
        })
        .catch((err) => {
            // if (err.kind === 'ObjectId') {
            //     return res.status(404).send({
            //         message: 'Cate not found with ' + req.params.cateId,
            //     });
            // }
            // return res.status(500).send({
            //     message: 'Error retrieving cate with id ' + req.params.cateId,
            // });
            return res.status(400).send({
                message: 'Category does not exist !',
            });
        });
};

//update Category
const updateCate = async (req, res) => {
    //check name
    const checkNameExist = await Cate.findOne({ name: req.body.name });
    if (checkNameExist) return res.status(402).send({ message: 'Used name' });

    //validate
    const { error } = cateValidator(req.body);

    if (error) return res.status(422).send(error.details[0].message);

    // if (!req.body.name || !req.body.description) {
    //     return res.status(400).send({
    //         message: 'Input does not empty !',
    //     });
    // }

    // if (req.body.name.length < 6 || req.body.description.length < 6) {
    //     return res
    //         .status(400)
    //         .json({ status: false, data: valiCate.length_min });
    // }

    // if (req.body.name.length > 255 || req.body.description.length > 255) {
    //     return res
    //         .status(400)
    //         .json({ status: false, data: validate.length_max });
    // }

    Cate.findByIdAndUpdate(
        req.params.cateId,
        {
            name: req.body.name,
            description: req.body.description,
            updateAt: new Date().toISOString(),
        },
        { useFindAndModify: false }
    )
        .then((cate) => {
            if (!cate) {
                return res.status(400).send({
                    message: 'Category is not find id : ' + req.params.cateId,
                });
            } else return res.send(cate);
        })
        .catch((err) => {
            return res.status(500).send({
                message: 'Category does not exist',
            });
        });
};

//delete Category
const deleteCate = async (req, res) => {
    Cate.findByIdAndDelete(req.params.cateId)
        .then((cate) => {
            if (!cate) {
                return res.status(500).send({
                    message: 'Category is not find id : ' + req.params.cateId,
                });
            } else
                return res.send({
                    message: 'Delete succesfully !',
                });
        })
        .catch((err) => {
            return res.status(500).send({
                message: 'Category does not exist !',
            });
        });
};

module.exports = {
    createCate,
    deleteCate,
    updateCate,
    getListAll,
    getListOne,
};
