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

const userMutation = {
    addUser: {
        type: UserType,
        args: {
            username: {type: GraphQLString},
            email: {type: GraphQLString},
        },
        resolve(parent, args) {
            let user = new User({
                username: args.username,
                email: args.email,
            });
            return user.save();
        }
    },
}

module.exports = userMutation
