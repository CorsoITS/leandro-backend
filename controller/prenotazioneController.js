const Prenotazione = require('../model/models/Prenotazione');
const sedeController = require('./sedeController')
const PersonaController = require('./personaController')
const somministrazioneController = require('./somministrazioneController')

class prenotazioneController{

    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id Persona non numerico");
                }
                let p;
                p=await Prenotazione.get(req.params.id);
                if (p ) {
                    req.Prenotazione=p;
                    next();
                }  else {
                    return res.status(400).send ("Id Prenotazione non trovato");                    
                }               
            } else {
                return res.status(404).send("Id Prenotazione NON Fornito");
            }
        } catch (err) {
            return res.status(500).send ("Prenotazione Internal Server Error");
        }            
    }

    static async crea (req,res) {
        try {
            let np = new Prenotazione();
            
            if (req.body.data) np.setData(req.body.data);
            if (req.body.sede_id){
                if( await sedeController.checkIdEsterno(req.body.sede_id)){
                    np.setSede_id(req.body.sede_id);
                }else{
                    return res.status(404).send("Id Sede errato o inesistente");
                }
            }
            if (req.body.somministrazione_id){
                if( await somministrazioneController.checkIdEsterno(req.body.somministrazione_id)){
                    np.setSomministrazione_id(req.body.somministrazione_id);
                }else{
                    return res.status(404).send("Id Somministrazione errato o inesistente");
                }
            } 
            if (req.body.note) np.setNote(req.body.note);
            if (req.body.persona_id){
                if(PersonaController.checkIdEsterno(req.body.persona_id)){
                    np.setPersona_id(req.body.persona_id);
                }else{
                    return res.status(404).send("Id Persona errato o inesistente");
                }
            } 
            
            await  np.save();
            res.status(201).send("Created");
        } catch (err) {
            res.status(500).send ("Internal Server Error");
        }
    }
      
    static async lista (req , res){
        if (req.query.q){
            if ( !req.params ) req.params={};
            req.params.id=req.query.q;
            return prenotazioneController.get(req,res);
        }
        let result=await Prenotazione.lista(req.sede_id);

        return res.json(result);
    } 

    static async get (req,res) {
        let result;
        if ( ! req.Prenotazione ) {
            result=await Prenotazione.get(req.params.id);
        } else {
            result = req.Prenotazione;
        }
        return res.json(result);

    }

    static async elimina (req,res) {
        try {
                if (await Prenotazione.delete(req.params.id) ) {
                    res.status(200).send('Ok');
                } else {
                    res.status(400).send ("Errore Prenotazione Persona");
                }
        } catch (err) {
            res.status(500).send ("Internal Server Error");
        }
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Prenotazione ) {
                np=await Prenotazione.get(req.params.id);
            } else {
                np = req.Prenotazione;
            }
            
            if (req.body.data) np.setData(req.body.data);
            if (req.body.sede_id){
                if( await sedeController.checkIdEsterno(req.body.sede_id)){
                    np.setSede_id(req.body.sede_id);
                }else{
                    return res.status(404).send("Id Sede errato o inesistente");
                }
            }
            if (req.body.somministrazione_id){
                if( await somministrazioneController.checkIdEsterno(req.body.somministrazione_id)){
                    np.setSomministrazione_id(req.body.somministrazione_id);
                }else{
                    return res.status(404).send("Id Somministrazione errato o inesistente");
                }
            } 
            if (req.body.note) np.setNote(req.body.note);
            if (req.body.persona_id){
                if(PersonaController.checkIdEsterno(req.body.persona_id)){
                    np.setPersona_id(req.body.persona_id);
                }else{
                    return res.status(404).send("Id Persona errato o inesistente");
                }
            } 
            
            await  np.save();
            res.status(201).send("Created");
        } catch (err) {
            res.status(500).send ("Internal Server Error");
        }
    }



}

module.exports = prenotazioneController