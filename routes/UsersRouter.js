"use strict";

module.exports = (dependecies) => {
  const router = require('koa-router')({prefix: "users"});
  const usersCtrl = require('../controllers/users.ctrl')(dependecies);

  router
    .post('/',
      usersCtrl.RegisterNewUser
    )
    .get('/:id',
      usersCtrl.GetUser
    );

  return router;
};