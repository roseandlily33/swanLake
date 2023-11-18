const User = require('../models/User');
const Note = require('../models/Note');
const bcrypt = require('bcrypt');
//Helps to reduce the amount of try catch 
const asyncHandler = require('express-async-handler');

//Get all users, GET /users, Private
const getAllUsers = asyncHandler(async(req, res) => {

})

//Add a user, POST /users, Private
const createNewUser = asyncHandler(async(req, res) => {

});

//Update a user, PATCH /users, Private
const updateUser = asyncHandler(async(req, res) => {

});

//Delete a user, DELETE /users, Private
const deleteUser = asyncHandler(async(req, res) => {

});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};
