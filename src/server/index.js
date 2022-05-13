const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const algoliasearch = require('algoliasearch');

const app = express();
const client = algoliasearch('TEX0W26GEO', '');
const index = client.initIndex('dev_restaurants');
// index.search('grill')
//   .then(({ hits }) => {
//     console.log(hits);
//   })
//   .catch((e) => {
//     console.log('====e', e);
//   });

const corsOptions = {
  methods: 'GET,PUT,POST,DELETE,OPTIONS',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.put('/update', (req, res) => {
  index.search('grill')
    .then(({ hits }) => {
      console.log(hits);
    })
    .catch((e) => {
      console.log('====e', e);
      res.status(500);
      res.send(e);
    });
  // index.saveObject(req.body)
  //   .then((response) => {
  //     console.log(response);
  //     res.send(response);
  //   })
  //   .catch((e) => {
  //     console.log('====e', e);
  //     res.status(500);
  //     res.send(e);
  //   });
});

const port = process.env.PORT || 3003;

app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    // eslint-disable-next-line no-console
    console.info('==> Listening on port %s. Open up https://localhost:%s/ in your browser.', port, port);
  }
});
