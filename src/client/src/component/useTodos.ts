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
      setAllTodos(
        [ ...allTodos.filter(it => it.id !== id), completed ]
      )
    }
  }, [client, allTodos])

  React.useEffect(() => {
    getAll().catch(error => console.error('Error loading todos:', error))
  }, [ getAll ])

  const incompleteTodos = []
  const completeTodos = []
  for (const todo of allTodos) {
    if (todo.completed) {
      completeTodos.push(todo)
    } else {
      incompleteTodos.push(todo)
    }
  }

  return {
    incomplete: incompleteTodos,
    complete: completeTodos,
    addNew,
    markDone
  }
}

const GET_ALL_TODOS = `
query {
  allTodos {
    id, name, completed
  }
}
`

const ADD_NEW_TODO = `
mutation ($name: String!) {
  createTodoItem(name: $name) {
    id, name, completed
  }
}
`

const MARK_TODO_DONE = `
mutation ($id: ID!) {
  completeTodoItem(id: $id) {
    id, name, completed
  }
}
`