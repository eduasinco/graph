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

let args = {
    owner_id: {type: GraphQLString},
    post_id: {type: GraphQLString},
    order_status: {type: GraphQLString},
}
const orderMutation = {
    createOrder: {
        type: OrderType,
        args: args,
        resolve(parent, args) {
            let foodPost = new Order({
                plate_name: args.plate_name,
                formatted_address: args.formatted_address,
                ownerId: args.ownerId,
            });
            return foodPost.save();
        }
    },
    changeOrderStatus: {
        type: OrderType,
        args: {order_status: {type: GraphQLString}},
        resolve(parent, args) {
            parent.order_status = args.order_status
            return parent.save();
        }
    },
}

module.exports = orderMutation

