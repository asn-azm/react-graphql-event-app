const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')

const App = express();

const events = [];

App.use(bodyParser.json());

App.use('/graphqlApi', graphqlHTTP({
    schema: buildSchema(`

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        
         input EventInput { 
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        
        type rootQuery {
            events: [Event!]!
        
        }

        type rootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: rootQuery
            mutation: rootMutation
        }
        `),
    rootValue: {
        events: () => {
            return events
        },
        createEvent: (args) => {

            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
            }
            events.push(event);
            return event;
        }
    },
    graphiql: true
}));
App.listen(3000)