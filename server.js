const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App is listening on port ' + listener.address().port);
});

app.get('/meetings', (req, res) => {
  db.query('SELECT * FROM meeting', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/meetings/:id', (req, res) => {
  db.query(
    'SELECT * FROM meeting WHERE meeting_id = ?',
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//other routes: roster/meetings, country/meetings, roster
  
