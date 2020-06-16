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

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: {type: GraphQLID},
        order_status: {type: GraphQLString},
        owner: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.owner_id);
            }
        },
        post: {
            type: FoodPostType,
            resolve(parent, args){
                return FoodPost.findById(parent.post_id);
            }
        }
    })
})

module.exports = OrderType