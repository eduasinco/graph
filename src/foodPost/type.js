const graphql = require('graphql');
const User = require('../user/data')
const UserType = require('../user/type')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const FoodPostType = new GraphQLObjectType({
    name: 'FoodPost',
    fields: () => ({
        id: {type: GraphQLID},
        plate_name: {type: GraphQLString},
        owner: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.ownerId);
            }
        }
    })
})

module.exports = FoodPostType