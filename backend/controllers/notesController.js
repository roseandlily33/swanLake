const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');
const { red } = require('@material-ui/core/colors');

//Get all the notes, GET /notes:
const getAllNotes = asyncHandler(async(req, res) => {
    const notes = await Note.find().lean();
    if(!notes?.length){
        return res.status(400).json({message: 'Could not find any notes'})
    }
    res.status(200).json(notes);
});

//Add a note, POST /notes:
const addANote = asyncHandler(async(req, res) => {
    const {user, title, text} = req.body;
    if(!user || !title || !text){
        return res.status(400).json({message: 'Fields are required'})
    }
    const newNote = {user, title, text};
    let completed = await Note.create(newNote);
    if(!completed){
        res.status(400).json({message: 'Could not create the note'})
    } else {
        res.status(200).json({message: 'Note has been completed'})
    }
});

//Update a note, PATCH /notes:
const updateANote = asyncHandler(async(req, res) => {
    const {id, user, title, text, completed} = req.body;
    const note = Note.findByIdAndUpdate(id);
    if(note){
        note.user = user;
        note.title = title;
        note.text = text;
        note.completed = completed;
        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.json({message: 'The note can not be found and updated'})
    }
});

//Delete a note, DELETE /notes:
const deleteANote = asyncHandler(async(req, res) => {
    const {id} = req.body;
    const deletedNote = Note.findByIdAndDelete(id).exec();
    if(deletedNote){
        res.status(200).json({message: 'Note has been deleted'})
    } else {
        res.status(409).json({message: 'Note can not be deleted'})
    }
});

module.exports = {
    getAllNotes,
    addANote,
    updateANote,
    deleteANote
};


