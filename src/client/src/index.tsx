import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import App from './component/App'
import GraphQLClient from './GraphQLClient'

const cache = new InMemoryCache()
const link = new HttpLink({ uri: 'http://localhost:4000' })

const apolloClient = new ApolloClient({ cache, link })
const client = new GraphQLClient(apolloClient)

ReactDOM.render(<App client={client}/>, document.getElementById('root'))
