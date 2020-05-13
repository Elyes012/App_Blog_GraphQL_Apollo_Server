const Post = require('../models/Post');
const { UserInputError, AuthenticationError } = require('apollo-server');
const checkAuth = require('../utils/check-auth');

module.exports = {

    Mutration: {
        createComment: async (_, { postId, body }, context) => {
            const username = checkAuth(context);
console.log(username)
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                })
            }
            const post = await Post.findById(postId);

            if (post) {
                post.comments.unshift({
                    body,
                    username : username.userName,
                    createdAt: new Date().toString()
                });

                await post.save();
                return post;

            } else {
                throw new UserInputError('Post Not Found')
            }


        },

        async deleteComment(_, { postId, commentId }, context) {
            const { username } = checkAuth(context);
            const post = await Post.findById(postId);

            if (post) {
                const commentIndex = post.comments.findIndex(e => e.id === commentId);

                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1);

                    await post.save();
                    return post;

                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } else {
                throw new UserInputError('post not found')
            }
        },

    }
}