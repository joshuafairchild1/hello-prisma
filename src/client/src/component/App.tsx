import * as React from 'react'
import useTodos from './useTodos'
import GraphQLClient from '../GraphQLClient'

interface Props {
  client: GraphQLClient
}

function App({ client }: Props) {
  const { complete, incomplete, addNew, markDone } = useTodos(client)
  const [ todoName, setTodoName ] = React.useState('')

  return <div className="container">
    <h2 style={{ marginTop: '1em' }}>Prisma To Do App</h2>
    <form onSubmit={async () => {
      await addNew(todoName)
      setTodoName('')
    }}>
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
        {incomplete.length === 0 ? 'Nothing to do!' : null}
        {incomplete.map(it =>
          <p
            key={it.id}
            className="alert alert-info"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {it.name}
            &nbsp;
            <button onClick={() => markDone(it.id)} className="btn btn-primary btn-sm">
              Done
            </button>
          </p>)}
      </div>
      <div className="col">
        <h4>Done</h4>
        {complete.length === 0 ? 'Nothing has been done!' : null}
        {complete.map(it =>
          <p key={it.id} className="alert alert-success">{it.name}</p>)}
      </div>
    </div>
  </div>
}

export default App