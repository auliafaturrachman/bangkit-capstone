const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const fs = require('fs');
const db = require('../config/database');
const path = require('path');
const conPrivate = path.join(__dirname, '../config/private.pem');

const pool = new Pool(db);

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    'SELECT * FROM users WHERE email = $1 AND password = $2',
    [email, password]
  );

  const privateKey = fs.readFileSync(conPrivate, 'utf8');
  const token = jwt.sign({ user: user.rows[0] }, privateKey, { algorithm: 'HS256'});

  res.status(200)
    .contentType('application/json')
    .json({
      status: 'success',
      data: {
        user: user.rows[0],
        token
      },
    });
};

const registration = (req, res) => {
  const { name, email, password, gender, date_birth, city } = req.body;
    
  pool.query(
    'INSERT INTO users (name, email, password, gender, date_birth, city) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [name, email, password, gender, date_birth, city],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(201)
        .contentType('application/json')
        .json({
          status: 'success',
          // message: 'registration successful',
          data: result.rows[0].id,
        });
    },
  );
};

const getRegisterUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ status: 'success', data: results.rows });
  });
};

module.exports = {
  login,
  registration,
  getRegisterUserById
};