import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'

const cache = new InMemoryCache()
const link = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({ cache, link })

ReactDOM.render(<App client={client} />, document.getElementById('root'))
