const routerSede = require('./sede-router')
const RouterPersona= require('./persona-router')
const routerOperatore = require('./operatore-router')
const routerSomministrazione = require('./somministrazione-router')
const routerPrenotazione = require('./prenotazione-router')
const routerLogin = require('./auth')
const {controllaAutenticazione} = require('../middlewares/check-auth')

function ConnectRouter(app){
    app.use('/login', routerLogin)
    app.use('/sede',controllaAutenticazione, routerSede)
    app.use('/persona', RouterPersona)
    app.use('/operatore', routerOperatore)
    app.use('/somministrazione', routerSomministrazione)
    app.use('/prenotazione', controllaAutenticazione, routerPrenotazione)
}

module.exports = ConnectRouter;