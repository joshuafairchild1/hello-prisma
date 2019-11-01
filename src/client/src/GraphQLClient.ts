import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { Mutation, Query } from '../generated/types'

export default class GraphQLClient {

  constructor(private readonly client: ApolloClient<unknown>) {}

  async query<F extends keyof Query>(
    queryField: F,
    graphQlQuery: string,
    variables?: any // TODO no any
  ) {
    const result = await this.client.query<Pick<Query, F>, typeof variables>({
      variables,
      query: gql`${graphQlQuery}`
    })
    return result.data[queryField]
  }

  async mutate<F extends keyof Mutation>(
    resultKey: F,
    graphQlQuery: string,
    variables?: any // TODO no any
  ) {
    const result = await this.client.mutate<Pick<Mutation, F>, typeof variables>({
      variables,
      mutation: gql`${graphQlQuery}`
    })
    return result.data ? result.data[resultKey] : null
  }
}