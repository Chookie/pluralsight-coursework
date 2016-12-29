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
      url: {
        type: GraphQLString,
        args: { name: { type: GraphQLString } }
      }
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
          args: { query: { type: GraphQLString } },
          resolve: (_,args) => {
            let findParams = {};
            if (args.query) {
              findParams.title = new RegExp(args.query, 'i');
            }
            return db.collection("links").find(findParams).toArray();
          }
        }
      })
    })
  });

  return schema;
};

export default Schema;
