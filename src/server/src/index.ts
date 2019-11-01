import { prisma } from '../prisma/generated/prisma-client'
import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'

const server = new GraphQLServer({
  resolvers,
  typeDefs: './prisma/generated/prisma.graphql',
  context: { prisma }
})

server.start(() => console.log('GraphQLServer is running on http://localhost:4000'))
  .catch(error => console.error('Error starting GraphQLServer:', error))