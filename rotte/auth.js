const { Router } = require('express');
const { randomUUID } = require('crypto');
const { compare } = require('bcrypt');

const routerAuth = Router();

routerAuth.post('/login', (req, res) => {
  
});

module.exports = {
  routerAuth
};