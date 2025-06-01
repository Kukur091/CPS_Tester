const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "Tom123",
    database: "register"
})

app.post('/register', (req, res) => {
  const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if(err) {
      console.error(err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    // data.insertId est l'id du nouvel utilisateur inséré
    const token = jwt.sign({ id: data.insertId }, 'secret_key', { expiresIn: '1h' });
    return res.status(200).json({ token, message: "Utilisateur enregistré" });
  });
});


app.post('/login', (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const user = result[0];

    const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });

    const { password, ...userWithoutPassword } = user; 

    return res.json({ token, user: userWithoutPassword });
  });
});

  app.post('/addscore', (req, res) => {
    const sql = "INSERT INTO score (user, cps, txt) VALUES (?,?,?)";
    const values = [req.body.user, req.body.cps, req.body.txt];
  
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erreur serveur" });
      }
      res.status(200).json({ message: "Score ajouté avec succès" });
    });
  });
  
  app.post('/logscore', (req, res) => {
    const sql = "SELECT * FROM score";
    db.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erreur serveur" });
      }
      res.status(200).json(data);
    })
  })

app.listen(8081, ()=> {
    console.log("listening");
})