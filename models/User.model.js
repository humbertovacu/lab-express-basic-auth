const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, 'This username is already taken'],
    required: true,
    trim: true
  },
  
   email: {
    type: String,
    required: [true, 'Enter a valid email'],
    unique: [true, 'This email is already linked to an account'],
    lowercase: true,
    trim: true
  },


  password: {
    type: String,
    required: [true, 'Password is required']
  }
  
});

const User = model("User", userSchema);

module.exports = User;
