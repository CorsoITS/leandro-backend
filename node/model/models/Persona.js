const { listaPersona, getPersonaById, insertPersona, updatePersona, personaExistById, personaDeleteById, updateCampiPersona } = require('../dao/PersonaDao');

class Persona {
    constructor(p) {
        if (p) {
            if (p.id)                     this.id    =p.id;
            if (p.nome)                   this.nome  =p.nome;
            if (p.cognome)                this.cognome=p.cognome;
            if (p.codice_fiscale)         this.CodFis =p.codice_fiscale;
        } 
    }    
    
    static async lista () {
        let listaPersonaDAO=await listaPersona();
        let res=[];

        listaPersonaDAO.forEach( e => {
            res.push(new Persona(e));
        });
        return res;
    }

    static async get(id) {
        let pf=await getPersonaById(id);
        if (pf) { return new Persona(pf);}
        return null;
    }

    static async exists(id) {
        return await personaExistById(id);
    }

    static async find(id) {
        return await personaExistById(id);
    }

    static async delete(id) {
        return await personaDeleteById(id);
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
    setNome(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.nome=x;
    }
    getNome() {
        return this.nome;
    }

    setCognome(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Cognome cannot be null';
        this.cognome=x;
    }
    getCognome() {
        return this.cognome;
    }

    setCodFis(x) {
        // Qui potremmo testare che il codice Fiscale sia settato correttamente
        this.CodFis=x;

    }
    getCodFis() {
        return this.CodFis;
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            let res= await updatePersona (this.id, this.nome, this.cognome, this.CodFis);
            if (! res) throw 'save Persona failed (update case).'; 
        } else {
            let res= await insertPersona (this.nome, this.cognome, this.CodFis);
            this.setId(res);
            if (! res) throw 'save Persona failed (insert case).'; 
        }
    }

}

module.exports = Persona;