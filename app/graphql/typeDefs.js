const {gql} = require('apollo-server');

module.exports = gql`
type Post {
  id: ID!
  body: String!
  createdAt: String!
  userName: String!
  comments: [Comment]!
  likes : [Like]!
}

type Comment {
  id : ID!
  createdAt: String!
  username: String!
  body: String!
}

type Like {
  id: ID!
  createAt: String!
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
  getPost(postId: ID!): Post
}

type Mutation {
    register(signup: Signup) : User!
    login(userName: String!, password: String!):User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId :String!, body: String!): Post!
    deleteComment(postId : ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
}
`;