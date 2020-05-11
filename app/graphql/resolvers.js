const postsResolvers = require('../controllers/Posts');
const useResolvers = require('../controllers/User');
const commentsResolvers = require('../controllers/Comments');
const likeResolvers = require('../controllers/Like');

module.exports = {
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
