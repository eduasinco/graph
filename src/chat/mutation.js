const graphql = require('graphql');
const Order = require('./data')
const OrderType = require('./type')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const orderMutation = {
    createOrder: {
        type: OrderType,
        args: {participants: {type: GraphQLString}},
        resolve(parent, args) {
            let foodPost = new Order({
                plate_name: args.plate_name,
                formatted_address: args.formatted_address,
                ownerId: args.ownerId,
            });
            return foodPost.save();
        }
    },
}

module.exports = orderMutation

