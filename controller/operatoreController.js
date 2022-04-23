const Operatore =require('../model/models/Operatore');
const { randomUUID } = require('crypto');
const { compare, hash } = require('bcrypt');

class OperatoreController {

    static async checkIdEsterno(id){
        try {
            if (id) {
                const eIntero = parseInt(id);
                if(isNaN(eIntero)) {
                  return false;
                }
                let p;
                p=await Operatore.get(id);
                if (p) {
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
                  return res.status(400).send("id Operatore non numerico");
                }
                let p;
                p=await Operatore.get(req.params.id);
                if (p ) {
                    req.Operatore=p;
                    next();
                }  else {
                    return res.status(404).send ("Id Operatore non trovato");                    
                }               
            } else {
                return res.status(404).send("Id Operatore NON Fornito");
            }
        } catch (err) {
            return res.status(500).send ("Internal Server Error");
        }            
    }
      
    static async lista (req , res){
        if (req.query.q){
            if ( !req.params ) req.params={};
            req.params.id=req.query.q;
            return OperatoreController.get(req,res);
        }
        let result=await Operatore.lista();
        return res.json(result);
    } 

    static async get (req,res) {
        let result;
        if ( ! req.Operatore ) {
            result=await Operatore.get(req.params.id);
        } else {
            result = req.Operatore;
        }
        return res.json(result);

    }

    static async crea (req,res) {
        try {
            let no = new Operatore();
            
            if (req.body.nome) no.setNome(req.body.nome);
            if (req.body.cognome) no.setCognome(req.body.cognome);
            if (req.body.ruolo) no.setRuolo(req.body.ruolo);
            if (req.body.username) no.setUsername(req.body.username);
            if (req.body.password) {
                if (req.body.password.length < 3) {
                    return res.status(400).send({
                      message: 'la password deve essere più lunga di 3 caratteri'
                    })
                  }
                let newPassword = await hash(req.body.password, 10);
                no.setPassword(newPassword);
            }
            if (req.body.sede_id) no.setSedeId(req.body.sede_id);
            await  no.save();
            res.status(201).send("Created");
        } catch (err) {
            res.status(500).send ("Internal Server Error");
        }
    }

    static async elimina (req,res) {
        try {
                 if (await Operatore.delete(req.params.id) ) {
                    res.status(200).send('Ok');
                } else {
                    res.status(400).send ("Errore Cancellazione Operatore");
                }
        } catch (err) {
            res.status(500).send ("Internal Server Error");
        }
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Operatore ) {
                np=await Operatore.get(req.params.id);
            } else {
                np = req.Operatore;
            }
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.cognome) np.setCognome(req.body.cognome);
            if (req.body.username) np.setUsername(req.body.username);
            if (req.body.password) {
                if (req.body.password.length < 3) {
                    return res.status(400).send({
                      message: 'la password deve essere più lunga di 3 caratteri'
                    })
                  }
                let newPassword = await hash(req.body.password, 10);
                no.setPassword(newPassword);
            }
            if (req.body.sede_id) np.setSedeId(req.body.sede_id);
            if (req.body.ruolo) np.setRuolo(req.body.ruolo);

            await  np.save();
            res.status(200).send("Ok");
        } catch (err) {
            console.log(err);
            res.status(500).send ("Internal Server Error");
        }

    }

}

module.exports=OperatoreController;