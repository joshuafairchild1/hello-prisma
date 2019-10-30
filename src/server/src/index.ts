import { prisma } from '../../lib/prisma/generated/prisma-client'
import { GraphQLServer } from 'graphql-yoga'
import prismaSchema from './prismaSchema'

new GraphQLServer({ schema: prismaSchema, context: { prisma } })
  .start(() => console.log('Server is running on http://localhost:4000'))
  .catch(error => console.error('Error starting GraphQLServer:', error))