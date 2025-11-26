'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/visitors/track',
      handler: 'visitor.track',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/visitors/:visitorId',
      handler: 'visitor.getVisitor',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/visitors',
      handler: 'visitor.find',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/visitors/:id',
      handler: 'visitor.findOne',
      config: {
        policies: [],
        middlewares: []
      }
    }
  ]
};
