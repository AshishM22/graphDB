import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";
import { Project } from "../models/Project.js";
import { Client } from "../models/Client.js";

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },

    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client?.findById(args.id);
      },
    },

    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
  }),
});

const ProjectStatusEnum = new GraphQLEnumType({
  name: "ProjectEnum",
  values: {
    NOT_STARTED: { value: "NOT STARTED" },
    IN_PROGRESS: { value: "IN PROGRESS" },
    COMPLETED: { value: "COMPLETED" }, // Fix the case to match other values
  },
});

// mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const newClient = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return newClient.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } }, // Use GraphQLID for the ID argument
      async resolve(parent, args) {
        try {
          const client = await Client.findByIdAndDelete(args.id); // Find and remove the client by ID
          if (!client) {
            throw new Error("Client not found");
          }
          return client; // Return the deleted client
        } catch (error) {
          throw new Error("Failed to delete client: " + error.message);
        }
      },
    },

    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        status: {
          type: GraphQLNonNull(ProjectStatusEnum),
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const newProject = new Project({
          name: args?.name,
          description: args?.description,
          status: args?.status,
          clientId: args.clientId,
        });

        return newProject.save();
      },
    },

    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        if (!args.id) return null;

        return Project.findByIdAndDelete(args.id);
      },
    },

    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: ProjectStatusEnum },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
