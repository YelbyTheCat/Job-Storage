require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(require('body-parser').json());

// Api Paths
app.use('/api/google-sheets', require('./routes/api/google-sheets'));
app.use('/api/jobs', require('./routes/api/jobs'));
app.use('/api/finances', require('./routes/api/finances'));
app.use('/api/users', require('./routes/api/users'));

// Refresh fix
const config = require('./config/webpack.config');
const compiler = require('webpack')(config);
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.get('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Cat-Utilities is listening on port ${port}`);
});
