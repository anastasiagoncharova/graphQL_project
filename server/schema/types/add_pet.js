const graphql = require('graphql');
const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
} = graphql;

const AddPetInput = new GraphQLInputObjectType({
  name: 'AddPetInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    gender: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    vaccinated: { type: GraphQLBoolean },
    sterilized: { type: GraphQLBoolean },
    image: { type: GraphQLString },
  },
});

module.exports = AddPetInput;