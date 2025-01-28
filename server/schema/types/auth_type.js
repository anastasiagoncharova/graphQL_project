const graphql = require('graphql');
const { GraphQLObjectType } = graphql;
const UserType = require('./user_type');

const SignupPayloadType = new GraphQLObjectType({
  name: 'SignupPayload',
  fields: {
    user: { type: UserType },
  },
});

const LoginPayloadType = new GraphQLObjectType({
  name: 'LoginPayload',
  fields: {
    user: { type: UserType },
  },
});

const LogoutPayloadType = new GraphQLObjectType({
  name: 'LogoutPayload',
  fields: {
    user: { type: UserType },
  },
});

module.exports = {SignupPayloadType, LoginPayloadType, LogoutPayloadType};
