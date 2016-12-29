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
  mutationWithClientMutationId,
  globalIdField,
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay';

let Schema = (db) => {
  // Using class so we can use instanceof to identify instances of this type
  class Store {};
  let store = new Store();

  // When relay wants a particular store it requests a node with a uniqie id, not the store directly.
  // This code converts from the ID to the object.
  let nodeDefs = nodeDefinitions(
    // Map globally defined ID's to our data objects
    (globalId) => {
      let {type} = fromGlobalId(globalId);
      if (type === 'Store') {
        return store;
      }
      return null;
    },
    // This function receives the resolved data type and relay uses this to map to it's graphQL data type.
    (obj) => {
      if (obj instanceof Store) {
        return storeType;
      }
      return null;
    }
  );

  let linkType = new GraphQLObjectType({
    name: "Link",
    fields: () => ({
      // connection requires an id field so reuse the mongo one but ensure non-null
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: (obj) => obj._id
      },
      title: { type: GraphQLString },
      url: { type: GraphQLString },
      createdAt: {
        type: GraphQLString,
        resolve: (obj) => obj.createdAt ? new Date(obj.createdAt).toISOString() : null
      }
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
        // relay requires globally unique field on each element.
        // relay helper function.
        id: globalIdField("Store"),
        linkConnection: {
          type: linkConnection.connectionType,
          args: {
            ...connectionArgs, // Std args like first, last etc.
            query: { type: GraphQLString }
          },
          // _ means don't care about first args so don't even give it a name
          resolve: (_, args) => {
            let findParams = {};
            if (args.query) {
              // using reg ex. i = case insensitive
              findParams.title = new RegExp(args.query, 'i');
            }
            return connectionFromPromisedArray(
              db.collection("links")
                .find(findParams)
                .sort({createdAt: -1})
                .limit(args.first).toArray(),
              args
            )
          }
        }
      }),
      // For any type which could be asked for by relay we need this
      interfaces: [nodeDefs.nodeInterface]
  });

  let createLinkMutation = mutationWithClientMutationId({
    name: 'CreateLink',
    inputFields:{
      title: { type: new GraphQLNonNull(GraphQLString) },
      url: { type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
      linkEdge: {
        // Use edge type helper
        type: linkConnection.edgeType,
        // obj will be the return from mongo insert below,
        // which is array of inserted docs
        resolve: (obj) =>({ node: obj.ops[0], cursor: obj.insertedId })
      },
      // send back store also in case need to update a particular store on client (if have many)
      store: {
        type: storeType,
        resolve: () => store
      }
    },
    // {title, url} is object destructuring.
    mutateAndGetPayload: ({title, url}) => {
      // Return mongo promise which relay can handle natively
      // Pass in a new json object.  {title,url} becomes { title: 'test link 1', url: 'test1.com' }
      return db.collection('links').insertOne({
        title,
        url,
        createdAt: Date.now()
      });
    }
  })

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      description: 'My Query Description',
      // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      fields: () => ({
        node: nodeDefs.nodeField,
        store: {
          type: storeType,
          resolve: () => store
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
