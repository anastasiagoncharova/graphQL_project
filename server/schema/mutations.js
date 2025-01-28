const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = graphql;
const AuthService = require('../services/auth');
const Pet = require('../models/pet');
const PetType = require('./types/pet_type');
const AddPetInput = require('./types/add_pet');
const EditPetInput = require('./types/edit_pet');
const {
  SignupPayloadType,
  LoginPayloadType,
  LogoutPayloadType,
} = require('./types/auth_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: SignupPayloadType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req }).then((user) => ({
          user,
        }));
      },
    },
    logout: {
      type: LogoutPayloadType,
      resolve(parentValue, args, req) {
        return new Promise((resolve, reject) => {
          req.logout((err) => {
            if (err) {
              return reject(err);
            }
            resolve({ user: null });
          });
        });
      },
    },
    login: {
      type: LoginPayloadType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req }).then((user) => ({
          user,
        }));
      },
    },
    addPet: {
      type: PetType,
      args: {
        input: { type: new GraphQLNonNull(AddPetInput) },
      },
      resolve(parentValue, { input }) {
        const pet = new Pet(input);
        return pet.save();
      },
    },
    editPet: {
      type: PetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        input: { type: new GraphQLNonNull(EditPetInput) },
      },
      async resolve(parentValue, { id, input }) {
        return Pet.findByIdAndUpdate(id, input, { new: true });
      },
    },
  },
});

module.exports = mutation;
