import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import App from './component/App'

const cache = new InMemoryCache()
const link = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({ cache, link })

ReactDOM.render(<App client={client}/>, document.getElementById('root'))
