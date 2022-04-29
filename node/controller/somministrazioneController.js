const Somministrazione = require('../model/models/Somministrazione');
const Operatore = require('./operatoreController')
const PersonaController = require('./personaController')


class somministrazioneController{


    static async checkIdEsterno (id) {
        try {
            if (id) {
                const eIntero = parseInt(id);
                if(isNaN(eIntero)) {
                  return false;
                }
                let p;
                p = await Somministrazione.get(id);
                if (p ) {
                    return true;
                }  else {
                    return false;                    
                }               
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }            
    }

    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id somministrazione non numerico");
                }
                let p;
                p= await Somministrazione.get(req.params.id);
                if (p) {
                    req.Somministrazione = p;
                    next();
                }  else {
                    return res.status(404).send ("Id somministrazione non trovato");                    
                }               
            } else {
                return res.status(404).send("Id somministrazione NON Fornito");
            }
        } catch (err) {
            return res.status(500).send ("Internal Server Error");
        }            
    }

    static async edit (req,res) {
        try {
            let ns;
            if ( ! req.Somministrazione ) {
                ns = await Somministrazione.get(req.params.id);
            } else {
                ns = req.Somministrazione;
            }
            if (req.body.vaccino) ns.setVaccino(req.body.vaccino);
            if (req.body.dose) ns.setDose(req.body.dose);
            if (req.body.data_somministrazione) ns.setData_somministrazione(req.body.data_somministrazione);
            if (req.body.note) ns.setNote(req.body.note);
            if (req.body.operatore_id){
                if (await Operatore.checkIdEsterno(req.body.operatore_id)){
                    ns.setOperatore_id(req.body.operatore_id);
                }
                else{
                    return res.status(404).send("Id Operatore errato o inesistente");
                }
            } 
            if (req.body.persona_id){
                if( await PersonaController.checkIdEsterno(req.body.persona_id)){
                    ns.setPersona_id(req.body.persona_id);
                }else{
                    return res.status(404).send("Id persona errato o inesistente");
                }
            } 
            await  ns.save();
            res.status(200).send("Ok");
        } catch (err) {
            res.status(500).send ("Internal Server Error");
        }
    }

    static async get (req,res) {
        let result;
        if ( ! req.Sede ) {
            result = await Somministrazione.get(req.params.id);
        } else {
            result = req.Somministrazione;
        }
        return res.json(result);
    }
    
    static async crea(req, res){
        try{
            let ns = new Somministrazione();

            if (req.body.vaccino) ns.setVaccino(req.body.vaccino);
            if (req.body.dose) ns.setDose(req.body.dose);
            if (req.body.data_somministrazione) ns.setData_somministrazione(req.body.data_somministrazione);
            if (req.body.note) ns.setNote(req.body.note);
            if (req.body.operatore_id){
                if (await Operatore.checkIdEsterno(req.body.operatore_id)){
                    ns.setOperatore_id(req.body.operatore_id);
                }
                else{
                    return res.status(404).send("Id Operatore errato o inesistente");
                }
            } 
            if (req.body.persona_id){
                if( await PersonaController.checkIdEsterno(req.body.persona_id)){
                    ns.setPersona_id(req.body.persona_id);
                }else{
                    return res.status(404).send("Id persona errato o inesistente");
                }
            } 
            await ns.save()
            res.status(201).send("Created");
        }catch{
            res.status(500).send("Internal Server Error");
        }
    }

    static async lista (req , res){
        if (req.query.q){
            if ( !req.params ) req.params={};
            req.params.id=req.query.q;
            return OperatoreController.get(req,res);
        }
        let result=await Somministrazione.lista();
        return res.json(result);
    }


    static async elimina (req,res) {
        try {
            if (await Somministrazione.delete(req.params.id) ) {
                res.status(200).send('Ok');
            } else {
                res.status(400).send ("Errore Cancellazione Somministrazione");
            }
        } catch (err) {
            res.status(500).send ("Internal Server Error");
        }
    }
}


module.exports = somministrazioneController;