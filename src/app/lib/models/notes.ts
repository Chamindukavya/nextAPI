import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title:{
        required: true,
        type: String
    },
    description:{
        type: String, 
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Notes = mongoose.models.Notes || mongoose.model("Notes", notesSchema);

export default Notes;