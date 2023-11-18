const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');

router.route('/')
.get(noteController.getAllNotes)
.post(noteController.addANote)
.patch(noteController.updateANote)
.delete(noteController.deleteANote);

module.exports = router;