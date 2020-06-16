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
    GraphQL
} = graphql;

const orderQuery = {
    order: {
        type: OrderType,
        args: {id: {type: GraphQLID}},
        resolve(parent, args) {
            return Order.findById(args.id)
        }
    },
    my_orders: {
        type: GraphQLList(OrderType),
        resolve(parent, args, context) {
            return Order.find({owner_id: context.user.id});
        }
    },
    user_orders: {
        type: GraphQLList(OrderType),
        args: {id: {type: GraphQLID}},
        resolve(parent, args) {
            return Order.find({owner_id: args.id});
        }
    },
}

module.exports = orderQuery