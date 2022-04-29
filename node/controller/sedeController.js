const Sede = require('../model/models/Sede');
const {listaSedi} = require('../model/dao/sedeDao')
const { randomUUID } = require('crypto');


class sedeController{

    static async checkIdEsterno (id) {
        try {
            if (id) {
                const eIntero = parseInt(id);
                if(isNaN(eIntero)) {
                  return false;
                }
                let p;
                p = await Sede.get(id);
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
                  return res.status(400).send("id non numerico");
                }
                let p;
                p= await Sede.get(req.params.id);
                if (p) {
                    req.Sede=p;
                    next();
                }  else {
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                return res.status(404).send("Id NON Fornito");
            }
        } catch (err) {
            return res.status(500).send ("Internal Server Error");
        }            
    }

    static async get (req,res) {
        let result;
        if ( ! req.Sede ) {
            result = await Sede.get(req.params.id);
        } else {
            result = req.Sede;
        }
        return res.json(result);
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Sede ) {
                np = await Sede.get(req.params.id);
            } else {
                np = req.Sede;
            }
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.citta) np.setCitta(req.body.citta);
            if (req.body.indirizzo) np.setIndirizzo(req.body.indirizzo);
            await  np.save();
            res.status(200).send("Ok");
        } catch (err) {
            res.status(500).send ("Internal Server Error");
        }
    }

    static async lista (req , res){
        const sedi = await listaSedi();
        return res.json(sedi).send()        
    }

    static async crea(req, res){
        try{
            let ns = new Sede();

            if (req.body.nome) ns.setNome(req.body.nome);
            if (req.body.citta) ns.setCitta(req.body.citta);
            if (req.body.indirizzo) ns.setIndirizzo(req.body.indirizzo);

            await ns.save()
            res.status(201).send("Created");
        }catch{
            res.status(500).send ("Internal Server Error");
        }
    }

    static async elimina (req,res) {
        try {
            if (await Sede.delete(req.params.id) ) {
                res.status(200).send('Ok');
            } else {
                res.status(400).send ("Errore Cancellazione Sede");
            }
        } catch (err) {
            res.status(500).send ("Internal Server Error");
        }
    }
}
module.exports=sedeController;