const express = require('express');
const mySql = require('mysql');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const cors = require('cors');

app.use(cors());

const db = mySql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usersdata'
});

let dbUsers = null;

db.query('SELECT * FROM users', (err, users) => {
  if (err) throw err;
  dbUsers = users;
  console.log(users);
});


app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
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
    `),
    rootValue: {
      users: () => {
        return dbUsers;
      },
    },
    graphiql: true
  })
);


app.listen(8000, () => {
  console.log('Server started on port 8000');
});