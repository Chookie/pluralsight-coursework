'use strict';

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

// let counter = 42;
let dataListInt = [42, 43, 44];

let dataListObject = [
  {counter: 42},
  {counter: 43},
  {counter: 44}
]

let counterType = new GraphQLObjectType({
  name: "Counter",
  fields: () => ({
    counter:{
      type: GraphQLInt}
  })
});

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'My Query Description',
    example: 'My test',
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    fields: () => ({
      dataListInt: {
        type: new GraphQLList(GraphQLInt),
        resolve: () => dataListInt
      },
      dataListObject: {
        type: new GraphQLList(counterType),
        resolve: () => dataListObject
      }
      // counter: {
      //   type: GraphQLInt,
      //   description: 'My counter Description',
      //   example: 'My test',
      //   resolve: () => counter
      // },
      // message: {
      //   type: GraphQLString,
      //   resolve: () => "Hello GraphQL! b"
      // }
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: 'My Mutation Description',
    example: 'My test',
    fields: () => ({
      incrementCounter: {
        type: GraphQLInt,
        description: 'My incrementCounter Description',
        resolve: () => ++counter
      }
    })
  })
});

export default schema;
