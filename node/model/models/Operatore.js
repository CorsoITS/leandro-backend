const {getUtenteByUsername, listaOperatore,operatoreExistById, getOperatoreById,insertOperatore,updateOperatore,updateCampiOperatore, operatoreDeleteById } = require('../dao/operatoreDao');

class Operatore {
    constructor(p) {
        if (p) {
            if (p.id)           this.id       =p.id;
            if (p.ruolo)        this.ruolo    =p.ruolo;
            if (p.nome)         this.nome     =p.nome;
            if (p.cognome)      this.cognome  =p.cognome;
            if (p.username)     this.username =p.username;
            if (p.password)     this.password =p.password;
            if (p.sede_id)      this.sede_id  =p.sede_id;
        } 
    }

    static async getOperatoreByUsername(operatore) {
        const oper = await getUtenteByUsername(operatore);
        const obj = new Operatore(oper)
        return obj
    }
    
    static async lista () {
        let listaOperatoriDAO=await listaOperatore();
        let res=[];

        listaOperatoriDAO.forEach( e => {
            res.push(new Operatore(e));
        });
        return res;
    }

    static async get(id) {
        let pf = await getOperatoreById(id);
        if (pf) { return new Operatore(pf);}
        return null;
    }

    static async exists(id) {
        return await operatoreExistById(id);
    }

    static async find(id) {
        return await operatoreExistById(id);
    }

    static async delete(id) {
        return await operatoreDeleteById(id);
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

    setRuolo(x) {
        this.ruolo=x;
    }
    getRuolo() {
        return this.ruolo;
    }
    setUsername(x) {
        this.username=x;
    }
    getUsername() {
        return this.username;
    }
    setPassword(x) {
        this.password=x;
    }
    getPassword() {
        return this.password;
    }
    setSedeId(x) {
        this.sede_id=x;
    }
    getSedeId() {
        return this.sede_id;
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            let res= await updateOperatore (this.id, this.ruolo, this.nome, this.cognome, this.username, this.password, this.sede_id);
            if (! res){
                throw 'save Operatore failed (update case).'; 
            }
        } else {
            let res= await insertOperatore (this.ruolo, this.nome, this.cognome, this.username, this.password, this.sede_id);
            this.setId(res);
            if (! res) throw 'save Operatore failed (insert case).'; 
        }
    }
}

module.exports = Operatore;