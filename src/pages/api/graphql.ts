import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { PrismaClient } from '@prisma/client'
import { prisma } from '../../../prisma/db'

export type TContext = {
  prisma: PrismaClient
}

const typeDefs = `#graphql
  type Novel {
    id: ID!
    title: String
    image: String
    createdAt: String
    updatedAt: String
    authors: [Author]
  }

  type Author {
    id: ID!
    name: String
    novelId: String
  }

  type Query {
    novels: [Novel]
  }

  type Mutation {
    addNovel: Novel
  }
`

const resolvers = {
  Query: {
    novels: async (parent: any, args: any, context: TContext) => {
      return await context.prisma.novel.findMany()
    },
  },
  Novel: {
    authors: async (parent: any, args: any, context: TContext) => {
      return await context.prisma.author.findMany({
        where: {
          novelId: parent.id,
        },
      })
    },
  },
}

const apolloServer = new ApolloServer<TContext>({
  resolvers,
  typeDefs,
})

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
})
