import * as React from 'react'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'

export default function useTodos(client: ApolloClient<unknown>) {

  const [ allTodos, setAllTodos ] = React.useState<Todo[]>([])

  const getAll = React.useCallback(async () => {
    const { data } = await client.query<LoadTodoResult>({ query: GET_ALL_TODOS })
    setAllTodos(data.tasks)
  }, [client])

  const addNew = React.useCallback(async (name) => {
    const { data } = await client.mutate<AddTodoResult>({
      mutation: ADD_NEW_TODO, variables: { name }
    })
    if (data) {
      setAllTodos([ ...allTodos, data.createTask ])
    }
  }, [client, allTodos])

  const markDone = React.useCallback(async (id: string) => {
    const { data } = await client.mutate<CompleteTodoResult>({
      mutation: MARK_TODO_DONE, variables: { id }
    })
    if (data) {
      setAllTodos(
        [ ...allTodos.filter(it => it.id !== id), data.completeTask ]
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

interface Todo {
  id: string
  name: string
  completed: boolean
}

interface LoadTodoResult {
  tasks: Todo[]
}

interface AddTodoResult {
  createTask: Todo
}

interface CompleteTodoResult {
  completeTask: Todo
}

const GET_ALL_TODOS = gql`
query {
  tasks {
    id, name, completed
  }
}
`

const ADD_NEW_TODO = gql`
mutation AddTask($name: String!) {
  createTask(name: $name) {
    id, name, completed
  }
}
`

const MARK_TODO_DONE = gql`
mutation MarkTaskDone($id: ID!) {
  completeTask(id: $id) {
    id, name, completed
  }
}
`