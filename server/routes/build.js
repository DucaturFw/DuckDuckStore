const path = require('path');

module.exports = server => {
  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '../../build/static'),
        listing: true
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/browser-solidity/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '../../build/browser-solidity'),
        listing: true
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: function (req, h) {
      return h.view('index');
    }
  });
};
