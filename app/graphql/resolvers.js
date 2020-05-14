const postsResolvers = require('../controllers/Posts');
const useResolvers = require('../controllers/User');
const commentsResolvers = require('../controllers/Comments');
const likeResolvers = require('../controllers/Like');

module.exports = {
    // Number of like
    Post : {
        likeCount(parent){
            console.log(parent);
            return parent.likes.length;
        },
 // Number of comment
        commentCount: (parent) => parent.comments.length
    },

    Query: {
        ...postsResolvers.Query
    },

    Mutation : {
        ...useResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutration,
        ...likeResolvers.Mutation
    }
}
