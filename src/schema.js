const graphql = require('graphql');
const userQuery = require('./user/query')
const userMutation = require('./user/mutation')
const foodPostQuery = require('./foodPost/query')
const foodPostMutation = require('./foodPost/mutation')
const orderQuery = require('./orders/query')
const orderMutation = require('./orders/mutation')
const chatQuery = require('./chat/query')
// const chatMutation = require('./chat/mutation')

const {
    GraphQLObjectType,
    GraphQLSchema,
} = graphql;

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...userMutation,
        ...foodPostMutation,
        ...orderMutation,
        // ...chatMutation
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...userQuery,
        ...foodPostQuery,
        ...orderQuery,
        ...chatQuery
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})