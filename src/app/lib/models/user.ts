import {Schema,models,model} from "mongoose";

const userSchema = new Schema({
   
    email:{
        required: true,
        type: String,
        unique: true
    },
    userName:{
        required: true,
        type: String,
        unique: true

    },
    password:{
        required: true,
        type: String
    }
});

const User = models.User || model("User", userSchema);

export default User;