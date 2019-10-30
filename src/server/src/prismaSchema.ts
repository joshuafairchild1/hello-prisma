import { prisma } from '../../lib/prisma/generated/prisma-client'
import datamodelInfo from '../../lib/prisma/generated/nexus-prisma'
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma'
import { idArg, stringArg } from 'nexus'
import * as path from 'path'

const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['todoItem'])
    t.list.field('allTodos', {
      type: 'TodoItem',
      resolve: prisma.todoItems
    })
  },
})

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.field('createTodoItem', {
      type: 'TodoItem',
      args: { name: stringArg({ nullable: false }) },
      resolve: (_, fields) => prisma.createTodoItem({ name: fields.name })
    })

    t.field('completeTodoItem', {
      type: 'TodoItem',
      args: { id: idArg({ nullable: false }) },
      resolve: (_, { id }) =>
        prisma.updateTodoItem({
          where: { id },
          data: { completed: true },
        })
    })
  }
})

export default makePrismaSchema({
  types: [Query, Mutation],

  prisma: {
    datamodelInfo,
    client: prisma,
  },

  outputs: {
    schema: path.join(__dirname, './../../lib/prisma/generated/schema.graphql'),
    typegen: path.join(__dirname, './../../lib/prisma/generated/nexus.ts'),
  },
})