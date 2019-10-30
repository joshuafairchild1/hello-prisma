import { prisma as PrismaClient } from './generated/prisma-client'
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
      resolve: (_, args, ctx) => ctx.prisma.tasks()
    })
  },
})

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.field('createTask', {
      type: 'Task',
      args: { name: stringArg() },
      resolve: (_, { name }, ctx) => ctx.prisma.createTask({ name })
    })
    t.field('completeTask', {
      type: 'Task',
      args: { id: idArg() },
      resolve: (_, { id }, ctx) =>
        ctx.prisma.updateTask({
          where: { id },
          data: { completed: true },
        }),
    })
  },
})

const schema = makePrismaSchema({
  types: [Query, Mutation],

  prisma: {
    datamodelInfo,
    client: PrismaClient,
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
})

const server = new GraphQLServer({
  schema,
  context: { prisma: PrismaClient },
})
server.start(() => console.log('Server is running on http://localhost:4000'))