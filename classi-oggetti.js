const oggetto  ={
    nome: 'Leandro', 
    getNome: () => {
        return this.nome
    }
}

class Persona{
    nome;
    cognome;

    constructor(nome, cognome){
        this.nome = nome;
        this.cognome = cognome
    }
}


class Utility {
    getCodiceIta(){
        return 'ITA'
    }

    parseJson(stringa){
        return JSON.parse(stringa)
    }

    async getInDatabase(id){
        return 'bruh'
    }
}

const persona = new Persona('leandro', 'fz')

console.log(persona);