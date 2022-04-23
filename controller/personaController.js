const Persona=require('../model/models/Persona');
const {listaPersone} = require('../model/dao/PersonaDao')

class PersonaController {
    static async checkIdEsterno (id) {
        try {
            if (id ) {
                const eIntero = parseInt(id);
                if(isNaN(eIntero)) {
                  return false;
                }
                let p;
                p=await Persona.get(id);
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
                  return res.status(400).send("id Persona non numerico");
                }
                let p;
                p=await Persona.get(req.params.id);
                if (p ) {
                    req.Persona=p;
                    next();
                }  else {
                    return res.status(404).send ("Id Persona non trovato");                    
                }               
            } else {
                return res.status(404).send("Id Persona NON Fornito");
            }
        } catch (err) {
            return res.status(500).send ("Persona Internal Server Error");
        }            
    }
      
    static async lista (req , res){
        if (req.query.q){
            if ( !req.params ) req.params={};
            req.params.id=req.query.q;
            return PersonaController.get(req,res);
        }
        let result=await Persona.lista();

        return res.json(result);
    } 

    static async get (req,res) {
        let result;
        if ( ! req.Persona ) {
            result=await Persona.get(req.params.id);
        } else {
            result = req.Persona;
        }
        return res.json(result);

    }

    static async crea (req,res) {
        try {
            let np=new Persona();
            
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.cognome) np.setCognome(req.body.cognome);
            if (req.body.codice_fiscale) np.setCodFis(req.body.codice_fiscale);
            await  np.save();
            res.status(201).send("Created");
        } catch (err) {
            res.status(500).send ("Internal Server Error");
        }
    }

    static async elimina (req,res) {
        try {
                 if (await Persona.delete(req.params.id) ) {
                    res.status(200).send('Ok');
                } else {
                    res.status(400).send ("Errore Cancellazione Persona");
                }
        } catch (err) {
            res.status(500).send ("Internal Server Error");
        }
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Persona ) {
                np=await Persona.get(req.params.id);
            } else {
                np = req.Persona;
            }
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.cognome) np.setCognome(req.body.cognome);
            if (req.body.codice_fiscale) np.setCodFis(req.body.codice_fiscale);

            await  np.save();
            res.status(200).send("Ok");
        } catch (err) {
            res.status(500).send ("Internal Server Error");
        }
    }
}

module.exports=PersonaController;