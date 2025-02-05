const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLID, GraphQLNonNull } = graphql;

const DeletePetInput = new GraphQLInputObjectType({
  name: 'DeletePetInput',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
});

module.exports = DeletePetInput;
