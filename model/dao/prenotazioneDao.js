const { getConnection } = require('../../db/connessione');

const insertPrenotazione = async (data, sede_id, somministrazione_id, note, persona_id) => {
    const connection = await getConnection();
    const query = `INSERT INTO prenotazione (data, sede_id, somministrazione_id, note, persona_id)
    VALUES (?,?,?,?,?)`;
    let res = []
    try {
        res = await connection.query(query, [data, sede_id, somministrazione_id, note, persona_id]);
    } catch (error) {
        console.log(error);
    }
    return res[0].insertId;
}

const updatePrenotazione = async (id, data, sede_id, somministrazione_id, note, persona_id) => {
    const connection = await getConnection();
    const query = `UPDATE prenotazione SET data= ?, sede_id= ?, somministrazione_id= ?, note= ?, persona_id= ?
    WHERE id = ?`;
    const [res] = await connection.query(query, [data, sede_id, somministrazione_id, note, persona_id, id]);
    return res.affectedRows === 1;
  }

const listaPrenotazione = async (sede_id) => {
    const connection = await getConnection();
    let query='SELECT * FROM prenotazione WHERE sede_id = ?';
    const [rows] = await connection.query(query, [sede_id]);
    return rows;
  }

const getPrenotazioneById = async (id_prenotazione) => {
    const connection = await getConnection();
    const query = 'SELECT * FROM prenotazione WHERE id = ?';
    const [rows] = await connection.query(query, [id_prenotazione]);
    return rows[0];
}

const personaPrenotazioneById = async (id_prenotazione) => {
    const connection = await getConnection();
    const query = 'DELETE FROM prenotazione WHERE id = ?';
    const [res] = await connection.query(query, [id_prenotazione]);
    return res.affectedRows === 1;
  }

module.exports = {
    updatePrenotazione,
    insertPrenotazione,
    listaPrenotazione,
    getPrenotazioneById,
    personaPrenotazioneById
};