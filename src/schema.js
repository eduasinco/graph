const graphql = require('graphql');
const userQuery = require('./user/query')
const userMutation = require('./user/mutation')
const foodPostQuery = require('./foodPost/query')
const foodPostMutation = require('./foodPost/mutation')

const {
    GraphQLObjectType,
    GraphQLSchema,
} = graphql;

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...userMutation,
        ...foodPostMutation
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...userQuery,
        ...foodPostQuery
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})