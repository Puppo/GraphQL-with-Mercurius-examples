import mercuriusWithGateway from '@mercuriusjs/gateway'
import fp from 'fastify-plugin'

export default fp(async fastify => {
  fastify.register(mercuriusWithGateway, {
    graphiql: process.env.NODE_ENV === 'development',
    gateway: {
      services: [
        {
          name: 'blog',
          url: 'http://localhost:3001/graphql',
          rewriteHeaders: headers => headers
        },
        {
          name: 'user',
          url: 'http://localhost:3002/graphql'
        }
      ]
    },
    jit: 1
  })
})
