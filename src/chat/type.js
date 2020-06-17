const graphql = require('graphql');
const {User} = require('../user/data')
const FoodPost = require('../foodPost/data')
const UserType = require('../user/type')
const FoodPostType = require('../foodPost/type')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const ChatType = new GraphQLObjectType({
    name: 'Chat',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
    })
})

module.exports = ChatType