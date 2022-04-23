const { Router } = require('express');
const routerAuth = Router();
const { compare } = require('bcrypt');
const Operatore = require('../model/models/Operatore');
const { deleteToken, getTokenByUtente, generatorToken, validateToken } = require('../model/dao/tokenDao');

routerAuth.post('/', async (req, res) => {
  try {
    const { username, password } = req.body
    const utente = await Operatore.getOperatoreByUsername(username);
    if (await compare(password, utente.getPassword())) {
      let token = await getTokenByUtente(utente.id)
      if (token === null || token === undefined){
        let token = await generatorToken(utente.id)
        return res.json({
          token: token
        }).send()
      }else{
        const validity = await validateToken(token.token)
        if(validity){
          return res.json({
           token:  token.token
          }).send()
        }else{
          const del = await deleteToken(token.token)
          try {
            token = await generatorToken(id_utente)
          } catch (error) {
            console.log(error);
          }
          return res.json({
            token: token
          }).send()
        }
      }}
    }catch (error) {
        return res.status(401).json({
          messaggio: 'failes'
      })
    }
  }
);

module.exports = routerAuth;