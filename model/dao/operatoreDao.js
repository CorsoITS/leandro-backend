const { getConnection } = require('../../db/connessione');

const listaOperatore = async () => {
  const connection = await getConnection();
  let query='SELECT * FROM opertore';
  const [rows] = await connection.query(query);
  return rows;
}

// module.exports = {listaOperatore}

const operatoreExistById = async (id_operatore) => {
  const connection = await getConnection();
  const query = 'SELECT 1 FROM opertore WHERE id = ?';
  const [rows] = await connection.query(query, [id_operatore]);
  return rows.length > 0;
}

const getOperatoreById = async (id_operatore) => {
  const connection = await getConnection();
  const query = 'SELECT * FROM opertore WHERE id = ?';
  const [rows] = await connection.query(query, [id_operatore]);
  return rows[0];
}

const insertOperatore = async (ruolo, nome, cognome,username, password, sede_id) => {
  const connection = await getConnection();
  const query = `INSERT INTO opertore (ruolo, nome, cognome, username, password, sede_id)
  VALUES (?,?,?,?,?,?)`;
  const [res] = await connection.query(query, [ruolo, nome, cognome, username, password, sede_id]);
  return res.insertId;
}

const updateOperatore = async (id, ruolo, nome, cognome, username, password, sede_id) => {
  const connection = await getConnection();
  const query = `UPDATE opertore SET ruolo = ?, nome = ?, cognome = ?, username = ?, password = ?, sede_id = ?
  WHERE id = ?`;
  let res = [];
  res= await connection.query(query, [ruolo, nome, cognome, username, password, sede_id, id]);
  return res[0].affectedRows === 1;
}

const updateCampiOperatore = async (id, ruolo, nome, cognome,username, password, sede_id) => {
  const connection = await getConnection();
  const campi = [];
  const params = [];
  if (nome !== undefined) {
    campi.push('nome');
    params.push(nome);
  }
  if (cognome !== undefined) {
    campi.push('cognome');
    params.push(cognome);
  }
  if (ruolo !== undefined) {
    campi.push('ruolo');
    params.push(ruolo);
  }
  if (username !== undefined) {
    campi.push('username');
    params.push(username);
  }
  if (password !== undefined) {
    campi.push('password');
    params.push(password);
  }
  if (sede_id !== undefined) {
    campi.push('sede_id');
    params.push(sede_id);
  }

  params.push(id);
  const query = `UPDATE opertore SET ${campi.map(campo => campo + ` = ?`).join(',')} WHERE id = ?`;
  const [res] = await connection.query(query, params);
  return res.affectedRows === 1;
}

const operatoreDeleteById = async (id_operatore) => {
  const connection = await getConnection();
  const query = 'DELETE FROM opertore WHERE id = ?';
  const [res] = await connection.query(query, [id_operatore]);
  return res.affectedRows === 1;
}

// const getPasswordOperatore = async (username) => {
//   const connection = await getConnection();
//   const query = 'SELECT password FROM opertore WHERE username = ?';
//   const [res] = await connection.query(query, [username]);
//   return res.affectedRows === 1;
// }

async function getSedeOperatoreById(id){
  const conn = await getConnection();
  const [oper_sede] = await conn.query('SELECT sede_id FROM opertore WHERE id = ?', [id]);
  return oper_sede[0].sede_id;
}

async function getUtenteByUsername(username) {
  const conn = await getConnection();
  const [utenti] = await conn.query('SELECT * FROM opertore WHERE username = ?', [username]);
  return utenti[0];
}
module.exports = {
  listaOperatore,
  operatoreExistById,
  getOperatoreById,
  insertOperatore,
  updateOperatore,
  updateCampiOperatore,
  operatoreDeleteById,
  getUtenteByUsername,
  getSedeOperatoreById
}
