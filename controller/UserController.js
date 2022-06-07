const { Pool } = require('pg');
const db = require("../config/database");

const pool = new Pool(db);

const getUser = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200)
      .contentType('application/json')
      .json({ status: 'success', data: results.rows });
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200)
      .contentType('application/json')
      .json({ status: 'success', data: results.rows });
  });
};

const createUser = (req, res) => {
  const { name, email } = req.body;
    
  pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
    [name, email],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(201)
        .contentType('application/json')
        .json({
          status: 'success',
          data: result.rows[0].id,
        });
    },
  );
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, email } = req.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (err) => {
      if (err) {
        throw err;
      }
      res.status(200)
        .contentType('application/json')
        .json({
          status: 'success',
          message: `User modified with ID: ${id}`,
        });
    },
  );
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error) => {
    if (error) {
      throw error;
    }
    res.status(200)
      .contentType('application/json')
      .json({
        status: 'success',
        message: `User deleted with ID: ${id}`,
      });
  });
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
