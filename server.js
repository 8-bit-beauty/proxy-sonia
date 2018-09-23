const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const fetch = require('node-fetch');
const port = process.env.PORT || 4042;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/relatedItems', (req, res) => {
  fetch(`http://ec2-13-57-246-165.us-west-1.compute.amazonaws.com:3036/product?id=${req.query.id}`)
    .then((res) => {
      return res.json();
    })
    .then(json => res.send(JSON.stringify(json)));
});
app.get('/api/checkout/:productId', (req, res) => {
  fetch(`http://ec2-18-224-5-50.us-east-2.compute.amazonaws.com/checkout/${req.params.productId}`)
    .then((res) => {
      return res.json();
    })
    .then(json => res.send((json)));  
});
app.get('/api/reviews/:productId', (req, res) => {
  fetch(`http://ec2-54-193-70-8.us-west-1.compute.amazonaws.com/reviews/${req.params.productId}`)
    .then((res) => {
      return res.json();
    })
    .then(json => res.send(json));
});
app.get('/api/helpful/:productId', (req, res) => {
  fetch(`http://ec2-54-193-70-8.us-west-1.compute.amazonaws.com/helpful/${req.params.productId}`)
    .then((res) => {
      // do nothing
    })
    .then(json => res.status(202).send());
});
app.get('/api/products/', (req, res) => {
  fetch(`http://ec2-13-57-32-246.us-west-1.compute.amazonaws.com/get?id=${req.query.id}`)
    .then(response => {
      return response.json()
    }).then(json => {
      res.send(json)
    });
 });
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});