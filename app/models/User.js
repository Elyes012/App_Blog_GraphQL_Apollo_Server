const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  userName: String,
  password: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
},

});

module.exports = model('User', userSchema);