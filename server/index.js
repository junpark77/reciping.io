const express = require('express');
const path = require('path');

const extract = require('./components/extractRecipe.js');

const PORT = 3069;
const app = express();
const distPath = path.resolve(__dirname, '..', 'build');

app.use(express.json());
app.use('/', express.static(distPath));
app.use(extract);



app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});
