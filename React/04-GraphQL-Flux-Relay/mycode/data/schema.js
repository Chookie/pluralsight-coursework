'use strict';

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  mutationWithClientMutationId
} from 'graphql-relay';

let Schema = (db) => {
  let stores = {};

  let linkType = new GraphQLObjectType({
    name: "Link",
    fields: () => ({
      // connection requires an id field so reuse the mongo one but ensure non-null
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: (obj) => obj._id
      },
      title: { type: GraphQLString },
      url: { type: GraphQLString }
    })
  });

  let linkConnection = connectionDefinitions({
    name: 'Link',
    nodeType: linkType
  })

  let storeType = new GraphQLObjectType( {
      name: 'Store',
      description: 'My Query Description',
      // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      fields: () => ({
        linkConnection: {
          type: linkConnection.connectionType,
          args: connectionArgs, // Std args like first, last etc.
          // _ means don't care about first args so don't even five it a name
          resolve: (_, args) => connectionFromPromisedArray(
            db.collection("links").find({}).limit(args.first).toArray(),
            args
          )
        }
      })
  });

  let createLinkMutation = mutationWithClientMutationId({
    name: 'CreateLink',
    inputFields:{
      title: { type: new GraphQLNonNull(GraphQLString) },
      url: { type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
      link: {
        type: linkType,
        // obj will be the return from mongo insert below,
        // which is array of inserted docs
        resolve: (obj) => obj.ops[0]
      }
    },
    mutateAndGetPayload: ({title, url}) => {
      // Return mongo promise which relay can handle natively
      return db.collection('links').insertOne({title, url});
    }
  })

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      description: 'My Query Description',
      // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      fields: () => ({
        store: {
          type: storeType,
          resolve: () => stores
        }
      })
    }),

    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        createLink: createLinkMutation
      })
    })
  });

  return schema;
};

export default Schema;
