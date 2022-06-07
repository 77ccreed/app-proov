const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');

//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const User = require('./model/user');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middlewere/is-auth');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

app.listen(8000, () => {
  console.log('Server started on port 8000');
});