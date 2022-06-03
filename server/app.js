const express = require('express');
const mySql = require('mysql');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
//const { buildSchema } = require('graphql');
const app = express();
const cors = require('cors');


const graphQlSchema = require('./graphql/schema/index');
//const graphQlResolvers = require('./graphql/resolvers/index');


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
    schema: graphQlSchema,
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