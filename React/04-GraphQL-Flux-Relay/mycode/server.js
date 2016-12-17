import express from 'express';
import projectConfig from './project.config';
import open from 'open';

// Create variable app by executing express function.
const app = express();

// Get request
// app.get('/', (req, res) => res.send('hello express!'));

// Static middleware
app.use(express.static('public'));

app.listen(projectConfig.port, function(err) {
    if (err) {
        console.log(err);
    } else {
      console.log(`Server started at http://localhost:${projectConfig.port}`)
    }
});
