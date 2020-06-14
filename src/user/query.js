const graphql = require('graphql');
const User = require('./data')
const UserType = require('./type')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const userQuery = {
    user: {
        type: UserType,
        args: {id: {type: GraphQLID}},
        resolve(parent, args) {
            return User.findById(args.id)
        }
    },
    users: {
        type: GraphQLList(UserType),
        resolve(parent, args) {
            return User.find({});
        }
    },
}

module.exports = userQuery
