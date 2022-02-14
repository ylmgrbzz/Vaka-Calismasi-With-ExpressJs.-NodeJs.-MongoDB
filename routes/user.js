const router = require('express').Router();
const User = require('../models/User');
const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/customError');

//create user
router.post('/create', asyncErrorWrapper(async (req, res) => {
    const { name, surname, gender, birthdate } = req.body;
    const createUser = await User.create({
        name,
        surname,
        gender,
        birthdate
    });
    res.status(200).json({
        success: true,
        message: createUser
    })
}));

//update user
router.put('/:id', asyncErrorWrapper(async (req, res,next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json({
            success: true,
            message: updatedUser
        })
    } catch (err) {
        return next(new CustomError('Please Provide a valid id.',404))
    }
})
)
//delete user
router.delete('/:id', asyncErrorWrapper(async (req, res,next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        await user.remove();

        return res.status(200).json({
            success: true,
            message: "User deleted."
        });
    } catch (err) {
        return next(new CustomError('Please Provide a valid id.',404))
    }
}));

//get all users
router.get('/', asyncErrorWrapper(async (req, res) => {
    try {
        const createdAt = req.query.createdAt;
        const users = await User.find({
            createdAt: createdAt
        });

        res.status(200).json({
            success: true,
            message: users
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Users Not Found"
        })
    }
}));

module.exports = router