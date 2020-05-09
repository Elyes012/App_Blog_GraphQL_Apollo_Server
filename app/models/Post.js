const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  body: String,
  userName: String,
  createdAt: {
    type: Date,
    default: Date.now
},
  comments: [
    {
      body: String,
      usernNme: String,
      createdAt: String
    }
  ],
  likes: [
    {
      userName: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = model('Post', postSchema);