const User = require('../models/User');
const Note = require('../models/Note');
const bcrypt = require('bcrypt');
//Helps to reduce the amount of try catch 
const asyncHandler = require('express-async-handler');

//Get all users, GET /users, Private
const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find().select('-password').lean();
    if(!users?.length){
        return res.status(400).json({message: 'No users'})
    }
    res.json(users); 
})

//Add a user, POST /users, Private
const createNewUser = asyncHandler(async(req, res) => {
    const {username, password, roles} = req.body;
    if(!username || !password || !Array.isArray(roles) || !roles.length){
        return res.status(400).json({message: 'All fields are required'})
    }
    const duplicate = await User.findOne({username}).lean().exec();
    if(duplicate){
        return res.status(409).json({message: 'User is already created'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {username, "password" : hashedPassword, roles};
    const user = await User.create(newUser);
    if(user){
        res.status(201).json({message: `New User ${username}` })
    } else {
        res.status(400).json({message: 'User was not created'})
    }
});

//Update a user, PATCH /users, Private
const updateUser = asyncHandler(async(req, res) => {
    const {id, username, roles, active, password} = req.body;
    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        return res.status(400).json({message: 'All fields are required'})
    }
    const user = await User.findById(id).exec();
    if(!user){
        return res.status(409).json({message: 'User not found'})
    }
    const duplicate = await User.findOne({username}).lean().exec();
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicated user'});
    }
    user.username = username;
    user.roles = roles;
    user.active = active;
    if(password){
        user.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await user.save();
    res.json({message: `Updated user ${updatedUser.username}`})
});

//Delete a user, DELETE /users, Private
const deleteUser = asyncHandler(async(req, res) => {
    const {id} = req.body;
    if(!id){
        return res.status(400).json({message: 'User id is required'});
    }
    const note = await Note.findOne({user: id}).lean().exec();
    if(note){
        return res.status(400).json({message: 'User has notes'})
    }
    const user = await User.findById(id).exec();
    if(!user){
        return res.status(400).json({message: 'User not found'})
    } 
    const result = await user.deleteOne();
    const reply = `Username ${result.username} with Id ${result._id} has been deleted`;
    res.json(reply);
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};
