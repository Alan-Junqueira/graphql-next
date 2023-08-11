import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { PrismaClient } from '@prisma/client'
import { prisma } from '../../../../prisma/db'
import { resolvers } from '@/graphql/resolvers'
import { typeDefs } from '@/graphql/schema'

export type TContext = {
  prisma: PrismaClient
}

const apolloServer = new ApolloServer<TContext>({
  resolvers,
  typeDefs,
})

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
})

export { handler as GET, handler as POST };