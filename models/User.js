const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name : {
        type: String,
        required: [true,"Please provide a name"]
    },
    surname : {
        type: String,
        required: [true,"Please provide a surname"]
    },
    gender : {
        type: String,
        required: [true,"Please provide a gender"]
    },
    birthdate : {
        type: String,
        required: [true,"Please provide a birthday"]
    },
    createdAt : {
        type: String
    },
   
});

UserSchema.pre('save', function(next) {
    let now = new Date(Date.now());
    this.createdAt = now.toLocaleDateString();
    next();
  });
module.exports = mongoose.model("User",UserSchema);