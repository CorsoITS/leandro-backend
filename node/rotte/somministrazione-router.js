const {Router} = require('express')
const routerSomministrazione = Router()
const somministrazioneController = require('../controller/somministrazioneController')

routerSomministrazione.get('/', somministrazioneController.lista)
routerSomministrazione.post('/crea', somministrazioneController.crea)
routerSomministrazione.delete('/:id', somministrazioneController.checkId , somministrazioneController.elimina )
routerSomministrazione.get('/:id', somministrazioneController.checkId, somministrazioneController.get);
routerSomministrazione.put('/:id', somministrazioneController.checkId, somministrazioneController.edit);

module.exports = routerSomministrazione;