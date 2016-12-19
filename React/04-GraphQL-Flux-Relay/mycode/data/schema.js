'use strict';

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

let Schema = (db) => {

  let linkType = new GraphQLObjectType({
    name: "Link",
    fields: () => ({
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      url: { type: GraphQLString }
    })
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      description: 'My Query Description',
      example: 'My test',
      // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      fields: () => ({
        links: {
          type: new GraphQLList(linkType),
          resolve: () => db.collection("links").find({}).toArray()
        }
      })
    })
  });

  return schema;
};

export default Schema;
