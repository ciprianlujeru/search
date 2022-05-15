require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const algoliasearch = require('algoliasearch');

const app = express();
const client = algoliasearch('TEX0W26GEO', process.env.ALGOLIA_ADMIN_KEY);
const index = client.initIndex('dev_restaurants');

const corsOptions = {
  methods: 'GET,PUT,POST,DELETE,OPTIONS',
};

app.use(express.static('build'));

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/restaurant', (req, res) => {
  res.status(500);
  res.send('Not Implemented');
});

app.put('/restaurant/:objectID', (req, res) => {
  console.log('====req', req.params);
  index.search('grill')
    .then(({ hits }) => {
      console.log(hits);
    })
    .catch((e) => {
      console.log('====e', e);
      res.status(500);
      res.send(e);
    });
  // res.status(500);
  // res.send('Not Implemented');
  // // index.saveObject(req.body)
  // //   .then((response) => {
  // //     console.log(response);
  // //     res.send(response);
  // //   })
  // //   .catch((e) => {
  // //     console.log('====e', e);
  // //     res.status(500);
  // //     res.send(e);
  // //   });
});

app.delete('/restaurant/:objectID', (req, res) => {
  console.log('====req', req.params);
  res.status(500);
  res.send('Not Implemented');
});

const port = process.env.PORT || 3003;

app.listen(port, error => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    // eslint-disable-next-line no-console
    console.info(
      '==> Listening on port %s. Open up https://localhost:%s/ in your browser.',
      port,
      port
    );
  }
});
