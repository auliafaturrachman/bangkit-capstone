const http = require('http');
const express = require('express');
const router = require('./router');
// const simulation = require('./util/simulation');
// simulation();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
