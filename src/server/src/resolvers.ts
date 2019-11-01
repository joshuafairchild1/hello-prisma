import { prisma } from '../prisma/generated/prisma-client'
import { IResolvers } from 'graphql-tools'

const resolvers: IResolvers = {
  Query: {
    todoItems: prisma.todoItems,
    todoItem: async (_, args) => prisma.todoItem({ id: args.where.id })
  },
  Mutation: {
    updateTodoItem: (_, args) => prisma.updateTodoItem(args),
    createTodoItem: (_, args) => prisma.createTodoItem(args.data)
  },
  // https://github.com/apollographql/apollo-server/issues/1075#issuecomment-427476421
  Node: {
    __resolveType: () => null
  }
}

export default resolvers