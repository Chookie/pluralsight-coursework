'use strict';

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay';

let Schema = (db) => {
  let stores = {};

  let linkType = new GraphQLObjectType({
    name: "Link",
    fields: () => ({
      _id: { type: GraphQLString },
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
          resolve: (_, args) => connectionFromPromisedArray(
            db.collection("links").find({}).toArray(),
            args
          )
        }
      })
  });

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
    })
  });

  return schema;
};

export default Schema;
