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
let args = {
    plate_name: {type: GraphQLString},
    formatted_address: {type: GraphQLInt},
    ownerId: {type: GraphQLString},
}
const  foodPostMutation = {
    addFoodPost: {
        type: FoodPostType,
        args: args,
        resolve(parent, args) {
            let foodPost = new FoodPost({
                plate_name: args.plate_name,
                formatted_address: args.formatted_address,
                ownerId: args.ownerId,
            });
            return foodPost.save();
        }
    },
    editFoodPost: {
        type: FoodPostType,
        args: args,
        resolve(parent, args) {
            let foodPost = new FoodPost({
                plate_name: args.plate_name,
                formatted_address: args.formatted_address,
                ownerId: args.ownerId,
            });
            return foodPost.save();
        }
    },
}

module.exports = foodPostMutation

