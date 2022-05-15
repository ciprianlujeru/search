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
  index
    .saveObject(req.body, { autoGenerateObjectIDIfNotExist: true })
    .then(response => {
      res.send(response);
    })
    .catch(e => {
      res.status(400);
      res.send(e);
    });
});

app.put('/restaurant/:objectID', (req, res) => {
  index
    .partialUpdateObject(req.body)
    .then(response => {
      res.send(response);
    })
    .catch(e => {
      res.status(400);
      res.send(e);
    });
});

app.delete('/restaurant/:objectID', (req, res) => {
  index
    .deleteObject(req.params.objectID)
    .then(response => {
      res.send(response);
    })
    .catch(e => {
      res.status(400);
      res.send(e);
    });
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
