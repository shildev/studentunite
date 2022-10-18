import mongoose from 'mongoose';

//mongoose database schema for a StudentUnite user

const userSchema = mongoose.Schema({
    name: { type: String, required: true }, //user's name
    email: { type: String, required: true }, //user's email
    password: { type: String, required: true }, //user's password
    id: { type: String } //user's unique id
})

//schema is converted into a model
export default mongoose.model("User", userSchema);