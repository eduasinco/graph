const graphql = require('graphql');
const Chat = require('./data')
const ChatType = require('./type')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQL
} = graphql;

const chatQuery = {
    my_chats: {
        type: GraphQLList(ChatType),
        resolve(parent, args, context) {
            return Chat.aggregate([{$match: {"participants" : context.user.id}}])
        }
    }
}

module.exports = chatQuery