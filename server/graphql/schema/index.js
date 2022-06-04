const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type User {
            id: ID!
            name: String!
            email: String!
            password: String!
        }
        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
        } 
          type RootQuery {
          users: [User]
          login(email: String!, password: String!): AuthData//resolver use jwt and bcrypt to authenticate user and create token for user to use in graphql 
        }
        schema {
        query: RootQuery
        }
`);