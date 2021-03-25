// model
const Cate = require('../model/cateModel');
const valiCate = require('./../../lang/cate.json').vn;

//post Category
const createCate = async (req, res) => {
    // if (req.body.name == req.body.name) {
    //     return res.status(400).send({
    //         message: 'Name trung',
    //     });
    // }

    // const { error } = validateCate(req.body);

    // if (error) return response.status(422).send(error.details[0].message);

    // check validate name
    const checkNameExist = await Cate.findOne({ name: req.body.name });
    if (checkNameExist) return res.status(402).send({ message: 'Trùng tên' });

    const cate = new Cate({
        name: req.body.name,
        description: req.body.description,
    });

    if (!cate.name || !cate.description) {
        return res.status(400).json({ status: false, data: valiCate.empty });
    }

    if (cate.name.length < 6 || cate.description.length < 6) {
        return res
            .status(400)
            .json({ status: false, data: valiCate.length_min });
    }

    if (cate.name.length > 255 || cate.description.length > 255) {
        return res
            .status(400)
            .json({ status: false, data: validate.length_max });
    }

    // let catename = req.body.name;

    // var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    // if (catename.match(format)) {
    //     return res.status(400).send('Không được chưa kí tự đặc biệt 1');
    // } else {
    //     return res.send('Không được chưa kí tự đặc biệt');
    // }

    //save
    cate.save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Không lưu được !',
            });
        });
};

//list all
const getListAll = async (req, res) => {
    Cate.find()
        .then((cates) => {
            res.send(cates);
        })
        .catch((err) => {
            res.status(500).send({
                message: err,
            });
        });
};

//list one
const getListOne = async (req, res) => {
    // const cateId = req.body._id;
    Cate.findById(req.params.cateId)
        .then((cate) => {
            if (!cate) {
                res.status(400).send({
                    message: 'Không tìm thấy id: ' + req.params.cateId,
                });
            }
            // if (!req.params.cateId) {
            //     res.status(400).send({
            //         message: 'khong ton tai',
            //     });
            // }
            else res.send(cate);
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
                message: 'Không tồn tại',
            });
        });
};

//update Category
const updateCate = async (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).send({
            message: 'Dữ liệu không được để trống !',
        });
    }

    if (req.body.name.length < 6 || req.body.description.length < 6) {
        return res
            .status(400)
            .json({ status: false, data: valiCate.length_min });
    }

    if (req.body.name.length > 255 || req.body.description.length > 255) {
        return res
            .status(400)
            .json({ status: false, data: validate.length_max });
    }

    // const checkNameExist = await Cate.findOne({ name: req.body.name });
    // if (checkNameExist) return res.status(402).send({ message: 'Tên trùng' });

    // let cateName = req.params.name;
    // let cateDescription = req.params.description;

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
                res.status(400).send({
                    message: 'Không tìm thấy id : ' + req.params.cateId,
                });
            } else res.send(cate);
            // res.send({ message: 'Update succesfully !' });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Id không tồn tại',
            });
        });
};

//delete Category
const deleteCate = async (req, res) => {
    Cate.findByIdAndDelete(req.params.cateId)
        .then((cate) => {
            if (!cate) {
                res.status(500).send({
                    message: 'Không tìm thấy id : ' + req.params.cateId,
                });
            } else
                res.send({
                    message: 'Xóa thành công !',
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Id không tồn tại !',
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
