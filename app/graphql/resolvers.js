const postsResolvers = require('../controllers/Posts');
const useResolvers = require('../controllers/User');

module.exports = {
    Query: {
        ...postsResolvers.Query
    },

    Mutation : {
        ...useResolvers.Mutation,
        ...postsResolvers.Mutation,
    }
}
