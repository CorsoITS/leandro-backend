const { getSomministrazioneById, insertSomministrazione, updateSomministrazione, listaSomministrazione, somministrazioneDeleteById } = require('../dao/somministrazioneDao');

class Somministrazione{
    constructor(p){
        if(p){
            if (p.id)                     this.id = p.id;
            if (p.vaccino)                this.vaccino = p.vaccino;
            if (p.dose)                   this.dose = p.dose;
            if (p.data_somministrazione)  this.data_somministrazione = p.data_somministrazione;
            if (p.note)                   this.note = p.note;
            if (p.operatore_id)           this.operatore_id = p.operatore_id;
            if (p.persona_id)             this.persona_id = p.persona_id;

        }
    }

    static async get(id) {
        let pf = await getSomministrazioneById(id);
        if (pf) {
            return new Somministrazione(pf);
        }
        return null;
    }

    static async lista () {
        let listaSomministrazioneDAO = await listaSomministrazione();
        let res=[];
        listaSomministrazioneDAO.forEach( e => {
            res.push(new Somministrazione(e));
        });
        return res;
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

    setVaccino(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'vaccino cannot be null';
        this.vaccino=x;
    }
    getVaccino() {
        return this.vaccino;
    }

    setDose(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'dose cannot be null';
        this.dose=x;
    }
    getDose() {
        return this.dose;
    }

    getData_somministrazione() {
        return this.data_somministrazione;
    }
    setData_somministrazione(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'data_somministrazione cannot be null';
        this.data_somministrazione=x;
    }

    getNote() {
        return this.note;
    }
    setNote(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'note cannot be null';
        this.note=x;
    }

    getOperatore_id() {
        return this.operatore_id;
    }
    setOperatore_id(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'operatore_id cannot be null';
        this.operatore_id=x;
    }

    getPersona_id() {
        return this.persona_id;
    }
    setPersona_id(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'persona_id cannot be null';
        this.persona_id=x;
    }

    static async delete(id) {
        return await somministrazioneDeleteById(id);
    }



    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            let res= await updateSomministrazione (this.id, this.vaccino, this.dose, this.data_somministrazione, this.note, this.operatore_id, this.persona_id);
            if (! res) throw 'save Somministrazione failed (update case).'; 
        } else {
        let res= await insertSomministrazione (this.vaccino, this.dose, this.data_somministrazione, this.note, this.operatore_id, this.persona_id);
        this.setId(res);
        if (! res) throw 'save Somministrazione failed (insert case).'; 
        }
    }

}

module.exports = Somministrazione;
