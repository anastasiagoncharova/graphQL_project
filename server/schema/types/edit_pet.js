const graphql = require('graphql');
const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;


const EditPetInput = new GraphQLInputObjectType({
  name: 'EditPetInput',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    gender: { type: GraphQLString },
    type: { type: GraphQLString },
    age: { type: GraphQLInt },
    vaccinated: { type: GraphQLBoolean },
    sterilized: { type: GraphQLBoolean },
    image: { type: GraphQLString },
  }
});

module.exports = EditPetInput;