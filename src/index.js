import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: '*', // <- allow request from all domains
    credentials: true // <- enable CORS response for requests with credentials (cookies, http authentication)
  }
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 schema ready at ${url}`);
});
