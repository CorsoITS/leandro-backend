const {Router} = require('express')
const RouterPrenotazione = Router()
const prenotazioneController = require('../controller/prenotazioneController')

RouterPrenotazione.get('/', prenotazioneController.lista)
RouterPrenotazione.post('/crea', prenotazioneController.crea)
RouterPrenotazione.delete('/:id', prenotazioneController.checkId , prenotazioneController.elimina )
RouterPrenotazione.get('/:id', prenotazioneController.checkId, prenotazioneController.get);
RouterPrenotazione.put('/:id', prenotazioneController.checkId, prenotazioneController.edit);

module.exports = RouterPrenotazione;