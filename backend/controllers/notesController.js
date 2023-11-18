const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');

//Get all the notes, GET /notes:
const getAllNotes = asyncHandler(async(req, res) => {

});

//Add a note, POST /notes:
const addANote = asyncHandler(async(req, res) => {

});

//Update a note, PATCH /notes:
const updateANote = asyncHandler(async(req, res) = {

});

//Delete a note, DELETE /notes:
const deleteANote = asyncHandler(async(req, res) => {

});

module.exports = {
    getAllNotes,
    addANote,
    updateANote,
    deleteANote
};


