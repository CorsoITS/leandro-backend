const {Router} = require('express')
const routerSede = Router()
const sedeController = require('../controller/sedeController')

routerSede.get('/', sedeController.lista)
routerSede.post('/crea', sedeController.crea)
routerSede.delete('/:id', sedeController.checkId , sedeController.elimina )
routerSede.get('/:id', sedeController.checkId, sedeController.get);
routerSede.put('/:id', sedeController.checkId, sedeController.edit);

module.exports = routerSede;