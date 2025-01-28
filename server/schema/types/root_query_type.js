const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;
const UserType = require('./user_type');
const PetType = require('./pet_type');
const Pet = require('../../models/pet');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
    pets: {
      type: new GraphQLList(PetType),
      async resolve() {
        try {
          const pets = await Pet.find({});
          return pets;
        } catch (err) {
          throw new Error('Error fetching pets');
        }
      },
    },
  },
});

module.exports = RootQueryType;
