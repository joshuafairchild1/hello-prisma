import * as React from 'react'
import { TodoItem } from '../../../lib/prisma/generated/prisma-client'
import GraphQLClient from '../GraphQLClient'

export default function useTodos(client: GraphQLClient) {

  const [ allTodos, setAllTodos ] = React.useState<TodoItem[]>([])

  const getAll = React.useCallback(async () => {
    const all = await client.query('allTodos', GET_ALL_TODOS)
    setAllTodos(all)
  }, [client])

  const addNew = React.useCallback(async (name) => {
    const created = await client.mutate('createTodoItem', ADD_NEW_TODO, { name })
    if (created) {
      setAllTodos([ ...allTodos, created ])
    }
  }, [client, allTodos])

  const markDone = React.useCallback(async (id: string) => {
    const completed = await client.mutate('completeTodoItem', MARK_TODO_DONE, { id })
    if (completed) {
      setAllTodos([ ...allTodos.filter(it => it.id !== id), completed ])
    }
  }, [client, allTodos])

  React.useEffect(() => {
    getAll().catch(error => console.error('Error loading todos:', error))
  }, [ getAll ])

  const incomplete = []
  const complete = []
  for (const todo of allTodos) {
    if (todo.completed) {
      complete.push(todo)
    } else {
      incomplete.push(todo)
    }
  }

  return { incomplete, complete, addNew, markDone }
}
/**
 * import .graphql files in typescript:
 * https://dev.to/open-graphql/how-to-resolve-import-for-the-graphql-file-with-typescript-and-webpack-35lf
 *
 * not doing this now since it requires editing the webpack config, which CRA
 * doesn't allow
 */

const TODO_FIELDS = [ 'id', 'name', 'completed', 'createdAt', 'updatedAt' ]

const GET_ALL_TODOS = `
query {
  allTodos {
    ${TODO_FIELDS.join(', ')}
  }
}
`

const ADD_NEW_TODO = `
mutation ($name: String!) {
  createTodoItem(name: $name) {
    ${TODO_FIELDS.join(', ')}
  }
}
`

const MARK_TODO_DONE = `
mutation ($id: ID!) {
  completeTodoItem(id: $id) {
    ${TODO_FIELDS.join(', ')}
  }
}
`