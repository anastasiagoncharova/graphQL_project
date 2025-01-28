const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
} = graphql;

const PetType = new GraphQLObjectType({
  name: 'PetType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
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

module.exports = PetType;
