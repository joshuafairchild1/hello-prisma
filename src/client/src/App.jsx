import React from 'react'
import gql from 'graphql-tag'

function App({ client }) {
  const [ allTodos, setAllTodos ] = React.useState([])
  const [ todoName, setTodoName ] = React.useState('')

  const loadAllTodos = React.useCallback(async () => {
    const result = await client.query({ query: GET_ALL_TODOS })
    setAllTodos(result.data.tasks)
  }, [client])

  const addNewTodo = React.useCallback(async () => {
    const added = await client.mutate({ mutation: ADD_NEW_TODO, variables: { name: todoName } })
    setTodoName('')
    setAllTodos([ ...allTodos, added.data.createTask ])
  }, [client, todoName, allTodos])

  const markTodoDone = React.useCallback(async function(id) {
    const completed = await client.mutate({ mutation: MARK_TODO_DONE, variables: { id } })
    setAllTodos(
      [ ...allTodos.filter(it => it.id !== id), completed.data.completeTask ]
    )
  }, [client, allTodos])

  React.useEffect(() => { loadAllTodos() }, [ loadAllTodos ])
  const incompleteTodos = []
  const completeTodos = []
  for (const todo of allTodos) {
    if (todo.completed) {
      completeTodos.push(todo)
    } else {
      incompleteTodos.push(todo)
    }
  }
  return <div className="container">
    <h2 style={{ marginTop: '1em' }}>Prisma To Do App</h2>
    <form onSubmit={addNewTodo}>
      <div className="input-group mb3">
        <input
          placeholder="Add new To Do"
          className="form-control"
          type="text"
          value={todoName}
          onChange={event => setTodoName(event.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="submit">Add</button>
        </div>
      </div>
    </form>
    <hr/>
    <div className="row">
      <div className="col">
        <h4>To do</h4>
        {incompleteTodos.length === 0 ? 'Nothing to do!' : null}
        {incompleteTodos.map(it =>
          <p
            key={it.id}
            className="alert alert-info"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {it.name}
            &nbsp;
            <button onClick={() => markTodoDone(it.id)} className="btn btn-primary btn-sm">Done</button>
          </p>)}
      </div>
      <div className="col">
        <h4>Done</h4>
        {completeTodos.length === 0 ? 'Nothing has been done!' : null}
        {completeTodos.map(it =>
          <p key={it.id} className="alert alert-success">{it.name}</p>)}
      </div>
    </div>
  </div>
}

export default App

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