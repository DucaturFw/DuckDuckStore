const db = require('../db');

module.exports = server => {
  server.route({
    method: 'GET',
    path: '/api/oracle/{id}',
    handler: async function (req, res) {
      const { id } = req.params;
      // const { payload } = req;

      const data = await db.get(id)

      return data;
    }
  });

  server.route({
    method: 'POST',
    path: '/api/oracle',
    handler: async function (req, res) {
      const { payload } = req;

      const id = await db.create({
        ...payload
      });

      return {
        id
      };
    }
  });

  server.route({
    method: 'GET',
    path: '/api/oracle',
    handler: async function (req, res) {

      const data = await db.all()

      return {
        oracles: data
      };
    }
  });
};
