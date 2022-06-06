const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const conPrivate = path.join(__dirname, '../config/private.pem');

const isAuthenticated = (req, res, next) => {
  if (typeof req.headers.authorization !== "undefined") {
      let token = req.headers.authorization.split(" ")[1];
      let privateKey = fs.readFileSync(conPrivate, 'utf8');
      jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
          if (err) {  
              res.status(403).json({ error: "Not Authorized" });
          }
          return next();
      });
  } else {
      res.status(403).json({ error: "Not Authorized" });
  }
};

module.exports = isAuthenticated;