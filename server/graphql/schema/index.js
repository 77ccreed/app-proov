const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type RootQuery {
          users: [User]
}
        type User {
            id: ID!
            name: String!
            email: String!
            password: String!
}
        type RootMutation {
        createUser(name: String!, email: String!, password: String!): User
}
        schema {
        query: RootQuery
            mutation: RootMutation
}
`);