const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')


const App = express();

App.use(bodyParser.json());

App.use(isAuth);

App.use('/graphqlApi', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
    }@jobs-app-db.gvv6l.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=jobs-app-db`)
    .then(() => {
        App.listen(3000);
    }).catch(err => {
        console.log(err);

    });
