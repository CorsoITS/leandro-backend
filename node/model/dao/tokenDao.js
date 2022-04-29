const { getConnection } = require('../../db/connessione');
const { randomUUID } = require('crypto');


async function persistToken(token, userId, exp = 1000 * 60 * 30, remind_me=0) {
  const conn = await getConnection();
  const date = new Date();
  const expno = date.getTime() + exp;
  await conn.query('INSERT INTO token (token, opertore_id, exp, remind_me) VALUES (?, ?, ?, ?)',[token, userId, expno, remind_me ]);
}

async function validateToken(token) {
  const conn = await getConnection();
  const [rows] = await conn.query('SELECT * FROM token WHERE token = ?', [token] );
  const row = rows[0];
  if(!row) {
    return false;
  }
  const now = (new Date).getTime()
  if (now > row.exp) {
    return false;
  }
  return row.opertore_id
}

async function getTokenByUtente(id_utente){
  const connection = await getConnection();
  let query='SELECT token FROM token where opertore_id = ?';
  const [rows] = await connection.query(query, [id_utente]);
  if ([rows].lenght< 1){ return null}
  else {return rows[0]}
}

async function listToken(){
  const connection = await getConnection();
  let query='SELECT * FROM token'
  const [rows] = await connection.query(query);
  return rows;
}

async function deleteToken(token){
  const connection = await getConnection();
  let query='DELETE FROM token WHERE token = ?';
  const [res] = await connection.query(query, [token]);
  return res.affectedRows === 1;;
}

async function generatorToken(id_utente){
  try {
    const random = randomUUID();
    await persistToken(random, id_utente);
    return random
  } catch (error) {
    console.log(error);
  }

}

module.exports = {
    persistToken,
    validateToken,
    listToken,
    getTokenByUtente,
    generatorToken,
    deleteToken
}