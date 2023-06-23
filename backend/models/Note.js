const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    //Aise user likhne se user vale database ke foreign key pass ho jayegi 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('notes', NotesSchema);