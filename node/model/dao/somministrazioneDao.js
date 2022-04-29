const { getConnection } = require('../../db/connessione');


const insertSomministrazione = async (vaccino, dose, data_somministrazione, note, opertore_id, persona_id) => {
    const connection = await getConnection();
    const query = `INSERT INTO somministrazione (vaccino, dose, data_somministrazione, note, opertore_id, persona_id)
    VALUES (?,?,?,?,?,?)`;
    let res = [];
    try {
      res = await connection.query(query, [vaccino, dose, data_somministrazione, note, opertore_id, persona_id]);

    } catch (error) {
      console.log(error);
    }
    return res[0].insertId;
  }

  const getSomministrazioneById = async (id_somministrazione) => {
    const connection = await getConnection();
    const query = 'SELECT * FROM somministrazione WHERE id = ?';
    const [rows] = await connection.query(query, [id_somministrazione]);
    return rows[0];
  }

  const updateSomministrazione = async (id, vaccino, dose, data_somministrazione, note, opertore_id, persona_id) => {
    const connection = await getConnection();
    const query = `UPDATE somministrazione SET vaccino = ?, dose = ?, data_somministrazione = ?, note = ?, opertore_id=?, persona_id=?
    WHERE id = ?`;
    const [res] = await connection.query(query, [vaccino, dose, data_somministrazione, note, opertore_id, persona_id, id]);
    return res.affectedRows === 1;
  }

  const listaSomministrazione = async () => {
    const connection = await getConnection();
    let query='SELECT * FROM somministrazione';
    const [rows] = await connection.query(query);
    return rows;
  }

  const somministrazioneDeleteById = async (id_somministrazione) => {
    const connection = await getConnection();
    const query = 'DELETE FROM somministrazione WHERE id = ?';
    const [res] = await connection.query(query, [id_somministrazione]);
    return res.affectedRows === 1;
  }


module.exports = {
    insertSomministrazione,
    updateSomministrazione,
    listaSomministrazione,
    somministrazioneDeleteById,
    getSomministrazioneById
}