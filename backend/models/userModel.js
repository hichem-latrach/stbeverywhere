const db = require('../db');

async function createUser(user) {
  const [result] = await db.query(
    `INSERT INTO users (first_name, last_name, cin_number, birth_date, mobile_number, email, password, is_existing_customer)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user.first_name,
      user.last_name,
      user.cin_number,
      user.birth_date,
      user.mobile_number,
      user.email,
      user.hashedPassword,
      user.is_existing_customer,
    ]
  );
  return result;
}

async function getUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

module.exports = { createUser, getUserByEmail };
