import express from 'express';
import projectConfig from './project.config';
import open from 'open';
import { MongoClient } from 'mongodb';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';

// Create variable app by executing express function.
const app = express();

// Get request
// app.get('/', (req, res) => res.send('hello express!'));

// Static middleware
app.use(express.static('public'));


// Connect to database before starting server
let db;
MongoClient.connect(projectConfig.mongo, (err, database) => {
  if (err) {
    throw err;
  }

  db = database;
  app.use('/graphql', GraphQLHTTP({
    schema: schema(db),
    graphiql: true
  }));
  app.listen(projectConfig.port, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server started at http://localhost:${projectConfig.port}`)
    }
  });
}); 

// app.get("/data/links", (req, res) => {
//   // db.collection("links").find({}).toArray().then((links)=>res.json(links)).catch((reason)=>{throw reason});
//   db.collection("links").find({}).toArray((err, links) => {
//     if (err) {
//       throw err;
//     }
//     res.json(links);
//   });
// });
