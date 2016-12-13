import express from 'express';
import open from 'open';

const port = 3001;
// Create variable app by executing express function.
const app = express();

// Get request
app.get('/', (req, res) => res.send('hello express!'));

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});