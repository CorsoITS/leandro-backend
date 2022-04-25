const {insertPrenotazione, updatePrenotazione, listaPrenotazione, getPrenotazioneById, personaPrenotazioneById} = require('../dao/PrenotazioneDao')

class Prenotazione{
    constructor(p){
        if(p){
            if(p.id)                    this.id = p.id;
            if(p.data)                  this.data = p.data ;
            if(p.sede_id)               this.sede_id = p.sede_id ;
            if(p.somministrazione_id)   this.somministrazione_id = p.somministrazione_id ;
            if(p.note)                  this.note = p.note ;
            if(p.persona_id)            this.persona_id = p.persona_id ;
        }
    }

    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    existId () {
        if (this.id == null || typeof(this.id) == 'undefined') return false;
        return true; 
    }

    setData(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'data cannot be null';
        this.data=x;
    }
    getData() {
        return this.data;
    }

    setSede_id(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'sede_id cannot be null';
        this.sede_id=x;
    }
    getSede_id() {
        return this.sede_id;
    }
    setPersona_id(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'persona_id cannot be null';
        this.persona_id=x;
    }
    getPersona_id() {
        return this.persona_id;
    }

    setNote(x) {
        this.note=x;
    }
    getNote() {
        return this.note;
    }
    setSomministrazione_id(x) {
        this.somministrazione_id=x;
    }
    getSomministrazione_id() {
        return this.somministrazione_id;
    }

    static async get(id) {
        let pf=await getPrenotazioneById(id);
        if (pf) { return new Prenotazione(pf);}
        return null;
    }


    static async lista (sede_id) {
        let listaPrenotazioneDAO = await listaPrenotazione(sede_id);
        let res=[];

        listaPrenotazioneDAO.forEach( e => {
            res.push(new Prenotazione(e));
        });
        return res;
    }

    static async delete(id) {
        return await personaPrenotazioneById(id);
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            let res= await updatePrenotazione (this.id, this.data, this.sede_id, this.somministrazione_id, this.note, this.persona_id);
            if (! res) throw 'save Prenotazione failed (update case).'; 
        } else {
        let res= await insertPrenotazione (this.data, this.sede_id, this.somministrazione_id, this.note, this.persona_id);
        this.setId(res);
        if (! res) throw 'save Prenotazione failed (insert case).'; 
        }
    }
}

module.exports = Prenotazione;