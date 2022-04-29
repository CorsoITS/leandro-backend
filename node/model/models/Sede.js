const { insertSede, getSedeById, sedeDeleteById, updateSede } = require('../dao/sedeDao');

class Sede {
    constructor(p) {
        if (p) {
            if (p.id)            this.id    =p.id;
            if (p.nome)          this.nome  =p.nome;
            if (p.citta)         this.citta=p.citta;
            if (p.indirizzo)     this.indirizzo =p.indirizzo;
        }
    }

    static async get(id) {
        let pf = await getSedeById(id);
        if (pf) {
            return new Sede(pf);
        }
        return null;
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

    setCitta(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'citta cannot be null';
        this.citta=x;
    }
    getCitta() {
        return this.citta;
    }

    setIndirizzo(x) {
        this.indirizzo=x;
    }
    getIndirizzo() {
        return this.indirizzo;
    }

    static async delete(id) {
        return await sedeDeleteById(id);
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            let res= await updateSede (this.id, this.nome, this.citta, this.indirizzo);
            if (! res) throw 'save Sede failed (update case).'; 
        } else {
        let res= await insertSede (this.nome, this.citta, this.indirizzo);
        this.setId(res);
        if (! res) throw 'save Sede failed (insert case).'; 
        }
    }
}

module.exports = Sede