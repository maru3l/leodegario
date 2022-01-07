import express from 'express';
import morgan from 'morgan';
import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';
import logger from './logger';

const typeDefs = `
  type Query {
    hello: String
  }
`;

const schema = buildSchema(typeDefs);

const root = {
  hello: () => 'Hello world!',
};

const app = express();

app.use(morgan('combined', {stream: logger.stream}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  '/',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

export default app;
