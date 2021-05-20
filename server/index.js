const express = require('express');
const path = require('path');

const router = require('./components/router');

const PORT = 3001;
const app = express();
const distPath = path.resolve(__dirname, '..', 'build');

app.use(express.json());
app.use('/', express.static(distPath));
app.use(router);



app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});
