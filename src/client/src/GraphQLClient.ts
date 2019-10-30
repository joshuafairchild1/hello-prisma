import { NexusGenArgTypes, NexusGenFieldTypes } from '../../lib/prisma/generated/nexus'
import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'

type QueryTypes = NexusGenFieldTypes['Query']
type QueryArgs = NexusGenArgTypes['Query']
type MutationTypes = NexusGenFieldTypes['Mutation']
type MutationArgs = NexusGenArgTypes['Mutation']

export default class GraphQLClient {

  constructor(private readonly client: ApolloClient<unknown>) {}

  async query<R extends keyof QueryTypes>(
    resultKey: R,
    graphQlQuery: string,
    variables?: R extends keyof QueryArgs ? QueryArgs[R] : never
  ) {
    const result = await this.client.query<Pick<QueryTypes, R>, typeof variables>({
      query: gql`${graphQlQuery}`, variables
    })
    return result.data[resultKey]
  }

  async mutate<R extends keyof MutationTypes>(
    resultKey: R,
    graphQlQuery: string,
    variables?: MutationArgs[R]
  ) {
    const result = await this.client.mutate<Pick<MutationTypes, R>, typeof variables>({
      variables,
      mutation: gql`${graphQlQuery}`
    })
    return result.data ? result.data[resultKey] : null
  }
}