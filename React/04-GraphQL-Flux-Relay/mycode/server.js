import express from 'express';
import projectConfig from './project.config';
import open from 'open';
import { MongoClient } from 'mongodb';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';

import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

import fs from 'fs';

// Create variable app by executing express function.
const app = express();

// Get request
// app.get('/', (req, res) => res.send('hello express!'));

// Static middleware`
app.use(express.static('public'));


// Connect to database before starting server
// Use await from stage 3 ES6 to wit for async promise to complete
// await keyword before code returning promise and must be inside function wioth async before name
// using anonymous function (no name) and iife
(async () => {
  try {
  let db = await MongoClient.connect(projectConfig.mongo);
  let schema = Schema(db);

  app.use('/graphql', GraphQLHTTP({
    schema,
    graphiql: true
  }));

  app.listen(projectConfig.port, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server started at http://localhost:${projectConfig.port}`)
    }
  });

  // Generate schema.json. Using nodemon so get recreated upon easch change.
  // Could also be in the webpack build or better use the "Relay Starter Kit".
  let json = await graphql(schema, introspectionQuery);
  const spaces=2, replacer = null;
  fs.writeFile("./data/schema.json", JSON.stringify(json,replacer,spaces),err => {
    if (err) {
      throw err;
    }
    console.log("JSON schema created");
  });
  } catch(e) {
    console.log(e);
  }
})();

// // Connect to database before starting server
// let db;
// MongoClient.connect(projectConfig.mongo, (err, database) => {
//   if (err) {
//     throw err;
//   }

//   db = database;
//   app.use('/graphql', GraphQLHTTP({
//     schema: schema(db),
//     graphiql: true
//   }));
//   app.listen(projectConfig.port, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(`Server started at http://localhost:${projectConfig.port}`)
//     }
//   });
// });

// app.get("/data/links", (req, res) => {
//   // db.collection("links").find({}).toArray().then((links)=>res.json(links)).catch((reason)=>{throw reason});
//   db.collection("links").find({}).toArray((err, links) => {
//     if (err) {
//       throw err;
//     }
//     res.json(links);
//   });
// });
