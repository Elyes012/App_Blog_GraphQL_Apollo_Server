const {ApolloServer} = require('apollo-server');
const mongoose = require('./config/database.config')();
const portServer = require('./config/key.config').PORT_SERVER;
// Config typeDefs & typeDefs
const typeDefs = require('./app/graphql/typeDefs');
const resolvers = require('./app/graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) =>({req}) // Middleware
});

server.listen(portServer)
        .then(res => {
            console.log(`Server runing at ${res.url}`)
        })