const {Router} = require('express')
const routerOperatore = Router()
const operatoreController = require('../controller/operatoreController')

routerOperatore.get('/', operatoreController.lista)
routerOperatore.post('/crea', operatoreController.crea)
routerOperatore.delete('/:id', operatoreController.checkId , operatoreController.elimina )
routerOperatore.get('/:id', operatoreController.checkId, operatoreController.get);
routerOperatore.put('/:id', operatoreController.checkId, operatoreController.edit);

module.exports = routerOperatore;