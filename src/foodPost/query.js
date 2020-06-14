const graphql = require('graphql');
const FoodPost = require('./data')
const FoodPostType = require('./type')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const foodPostQuery = {
    foodPost: {
        type: FoodPostType,
        args: {id: {type: GraphQLID}},
        resolve(parent, args) {
            return FoodPost.findById(args.id)
        }
    },
    foods: {
        type: GraphQLList(FoodPostType),
        resolve(parent, args) {
            return FoodPost.find({});
        }
    },
    userFoods: {
        type: GraphQLList(FoodPostType),
        args: {id: {type: GraphQLID}},
        resolve(parent, args) {
            return FoodPost.find({ownerId: args.id});
        }
    },
}


module.exports = foodPostQuery