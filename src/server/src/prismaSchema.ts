import { PlaybookCreateInput, prisma } from '../prisma/generated/prisma-client'
import datamodelInfo from '../prisma/generated/nexus-prisma'
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma'
import { idArg, stringArg } from 'nexus'
import * as path from 'path'

const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['todoItem', 'organization', 'dealRoom'])
    t.list.field('todoItems', {
      type: 'TodoItem',
      resolve: prisma.todoItems
    })

    t.list.field('organizations', {
      type: 'Organization',
      resolve: prisma.organizations
    })

    t.list.field('dealRooms', {
      type: 'DealRoom',
      resolve: prisma.dealRooms
    })
  }
})

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.field('createTodoItem', {
      type: 'TodoItem',
      args: { name: stringArg({ nullable: false }) },
      resolve: (_, { name }) => prisma.createTodoItem({ name })
    })

    t.field('createDealRoom', {
      type: 'DealRoom',
      args: { name: stringArg({ nullable: false }) },
      resolve: (_, { name }) => prisma.createDealRoom({ name })
    })

    t.field('createOrganization', {
      type: 'Organization',
      args: { name: stringArg({ nullable: false }) },
      resolve: (_, { name }) => prisma.createOrganization({ name })
    })

    t.field('createPlaybook', {
      type: 'Playbook',
      args: { name: stringArg({ nullable: false }), organizationId: idArg(), dealRoomId: idArg() },
      resolve: (_, { name, organizationId, dealRoomId }) => {
        const createData: PlaybookCreateInput = { name }
        if (dealRoomId !== null) {
          createData.dealRoom = { connect: { id: dealRoomId }  }
        }
        if (organizationId !== null) {
          createData.organization = { connect: { id: organizationId } }
        }
        return prisma.createPlaybook(createData)
      }
    })

    t.field('completeTodoItem', {
      type: 'TodoItem',
      args: { id: idArg({ nullable: false }) },
      resolve: (_, { id }) => prisma.updateTodoItem({
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
    schema: path.join(__dirname, './../prisma/generated/schema.graphql'),
    typegen: path.join(__dirname, './../../client/generated/nexus.ts'),
  },
})