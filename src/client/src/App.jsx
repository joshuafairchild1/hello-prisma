import React from 'react'
import gql from 'graphql-tag'

function App({ client }) {
  const [ queryResult, setQueryResult ] = React.useState(null)

  const loadQuery = React.useCallback(async function loadQuery() {
    const result = await client.query({
      query: gql`
      query {
        postsByUser(email:"alice@localhost") {
          id, title, published, author { name }
        }
        feed {
          id, title, published
        }
      }
      `,
    })
    setQueryResult(result)
  }, [client])

  React.useEffect(() => { loadQuery() }, [ loadQuery ])

  return (
    <div className="App">
      Hello React!

      <p>Results:</p>
      <pre>
        {JSON.stringify(queryResult, null, 2)}
      </pre>
    </div>
  )
}

export default App