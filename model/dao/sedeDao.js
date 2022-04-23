const { getConnection } = require('../../db/connessione');

const insertSede = async (nome, citta, indirizzo) => {
    const connection = await getConnection();
    const query = `INSERT INTO sede (nome, citta, indirizzo)
    VALUES (?,?,?)`;
    const [res] = await connection.query(query, [nome, citta, indirizzo]);
    return res.insertId;
  }

  const updateSede = async (id, nome, citta, indirizzo) => {
    const connection = await getConnection();
    const query = `UPDATE sede SET nome = ?, citta = ?, indirizzo = ?
    WHERE id = ?`;
    const [res] = await connection.query(query, [nome, citta, indirizzo, id]);
    return res.affectedRows === 1;
  }

const listaSedi = async () => {
  const connection = await getConnection();
  const [rows] = await connection.query('SELECT * FROM sede')
  return rows;
}

const getSedeById = async (id_sede) => {
  const connection = await getConnection();
  const query = 'SELECT * FROM sede WHERE id = ?';
  const [rows] = await connection.query(query, [id_sede]);
  return rows[0];
}

const sedeDeleteById = async (id_sede) => {
  const connection = await getConnection();
  const query = 'DELETE FROM sede WHERE id = ?';
  const [res] = await connection.query(query, [id_sede]);
  return res.affectedRows === 1;
}

module.exports = {
    insertSede,
    listaSedi,
    getSedeById,
    sedeDeleteById,
    updateSede
}