const {gql} = require('apollo-server');

module.exports = gql`
type Post {
  id: ID!
  body: String!
  createdAt: String!
  username: String!
}

type User {
    id: ID!
    email: String!
    token : String!
    userName : String!
    createAt : String
}

input Signup {
    userName: String!
    password: String!
    confirmPassword: String!
    email : String!
}

type Query {
  getPosts: [Post]
}

type Mutation {
    register(signup: Signup) : User!
    login(userName: String!, password: String!):User!
}
`;