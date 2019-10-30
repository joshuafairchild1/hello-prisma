import { prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import * as path from 'path'
import { stringArg, idArg } from 'nexus'
import { prismaObjectType, makePrismaSchema } from 'nexus-prisma'
import { GraphQLServer } from 'graphql-yoga'

const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['task'])
    t.list.field('tasks', {
      type: 'Task',
      resolve: prisma.tasks
    })
  },
})

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.field('createTask', {
      type: 'Task',
      args: { name: stringArg({ nullable: false }) },
      resolve: (_, fields) => prisma.createTask({ name: fields.name })
    })

    t.field('completeTask', {
      type: 'Task',
      args: { id: idArg({ nullable: false }) },
      resolve: (_, { id }) =>
        prisma.updateTask({
          where: { id },
          data: { completed: true },
        })
    })
  }
})

const schema = makePrismaSchema({
  types: [Query, Mutation],

  prisma: {
    datamodelInfo,
    client: prisma,
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
})

new GraphQLServer({ schema, context: { prisma } })
  .start(() => console.log('Server is running on http://localhost:4000'))
  .catch(error => console.error('Error starting GraphQLServer:', error))