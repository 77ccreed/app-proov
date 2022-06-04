const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mySql = require('mysql');
const bodyParser = require('body-parser');


const User = require('./model/user');
const graphQlSchema = require('./graphql/schema/index');
//const graphQlResolvers = require('./graphql/resolvers/index');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: User,
    graphiql: true
  })
);


app.listen(8000, () => {
  console.log('Server started on port 8000');
});