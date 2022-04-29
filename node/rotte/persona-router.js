const {Router} = require('express')
const RouterPersona = Router()
const personaController = require('../controller/personaController')

RouterPersona.get('/', personaController.lista)
RouterPersona.post('/crea', personaController.crea)
RouterPersona.delete('/:id', personaController.checkId , personaController.elimina )
RouterPersona.get('/:id', personaController.checkId, personaController.get);
RouterPersona.put('/:id', personaController.checkId, personaController.edit);

module.exports = RouterPersona;