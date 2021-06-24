const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
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
    'SELECT * FROM meeting WHERE meeting_id=?',
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

app.get('/meetings/:id/votes', (req, res) => {
  db.query(
    'SELECT a.`country_name`, a.`vote`, a.`veto` FROM meeting m JOIN attends a USING (meeting_id) WHERE meeting_id = ?',
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

app.get('/roster', (req, res) => {
  db.query('SELECT year FROM roster ORDER BY year DESC', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/roster/:year/countries', (req, res) => {
  db.query(
    'SELECT cr.`country_name`, c.`permanent_member` FROM roster r JOIN country_on_roster cr ON r.`year`=cr.`roster_year` JOIN country c ON cr.`country_name`=c.`name` WHERE r.`year` = ?',
    req.params.year,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/roster/:year/meetings', (req, res) => {
  db.query(
    'SELECT * FROM roster r JOIN meeting m ON r.`year`= YEAR(m.`date`) WHERE r.`year` = ?',
    req.params.year,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App is listening on port ' + listener.address().port);
});
