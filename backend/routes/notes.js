const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//  ROUTE 1: Getting all the notes using GET"api/notes/fetchnotes" .login requried
router.get("/fetchnotes", fetchuser, async (req, res) => {
  // findOne null return kardega find empt array return karega
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ROUTE 2: Adding  new notes using POST"api/notes/addnote".login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid Email").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Validating if any error has occurred due to above conditions are mismatch
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      let note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
// ROUTE 3: Update an existing node PUT"api/notes/updatenote".login required
// Put request  is use for updating
router.put(
  "/updatenote/:noteid",
  fetchuser,
  async (req, res) => {
    try {
       //Find if the note to be updated even exists or not
      let note=await Note.findById(req.params.noteid);
      if(!note){
        return res.status(404).send("No such note exists")
      }
      const { title, description, tag } = req.body;
      // es new note object mai dalenge
      let newNote={};
      if(title)newNote.title=title;
      if(description)newNote.description=description;
      if(tag)newNote.tag=tag;
     
      // Now checking that this user even have the authorization to update the note or not
      
      if(note.user.toString()!=req.user.id){
        return res
         .status(401)
         .send("You are unauthorized to edit");
      }
       note = await Note.findByIdAndUpdate(req.params.noteid, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete(
  "/deletenote/:noteid",
  fetchuser,
  async (req, res) => {
    try {
       //Find if the note to be updated even exists or not
      let note=await Note.findById(req.params.noteid);
      if(!note){
        return res.status(404).send("No such note exists")
      }
      // Now checking that this user even have the authorization to update the note or not
      if(note.user.toString()!=req.user.id){
        return res
         .status(401)
         .send("You are unauthorized to delete this note");
      }
       note = await Note.findByIdAndDelete(req.params.noteid)
        res.json({ "Sucess":"Note has been sucessfully deleted","note":note });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
module.exports = router;
