'use client'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ReactNode } from 'react'

interface IProviders {
  children: ReactNode
}

export const Providers = ({ children }: IProviders) => {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
