'use strict';

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

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

  let storeType = new GraphQLObjectType( {
      name: 'Store',
      description: 'My Query Description',
      // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      fields: () => ({
        links: {
          type: new GraphQLList(linkType),
          resolve: () => db.collection("links").find({}).toArray()
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
