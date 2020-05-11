const Post = require('../models/Post');
const { UserInputError } = require('apollo-server');
const checkAuth = require('../utils/check-auth');

module.exports = {
    Mutation : {

        async likePost(_, { postId }, context) {
            const username  = checkAuth(context);
       
            const post = await Post.findById(postId);
            
            if (post) {
                if (post.likes.find(like => like.userName === username)) {
                    // Post already likes, unlike it
                    post.likes = post.likes.filter(like => like.userName !== username);

                } else {
                    // Like post
                    post.likes.push({
                        username,
                        createdAt: new Date().toString()
                    });
                }
                await post.save();
                return post;
            } else {
                throw new UserInputError('Post not found')
            }
        }
    }
}