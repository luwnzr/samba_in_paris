const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurante_db",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
    throw err;
  }
  console.log("Conectado ao banco de dados!");
});

// Rota para cadastro de usuários
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
  }

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("Erro ao registrar usuário:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Usuário registrado com sucesso!" });
  });
});

// Rota para login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("Erro ao realizar login", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      res.json({ message: "Login bem-sucedido!", user: results[0] });
    } else {
      res.status(401).json({ message: "Credenciais inválidas!" });
    }
  });
});

// Rota para criar uma reserva
app.post("/reservas", (req, res) => {
  const { nome, email, telefone, data, horario, numero_pessoas, mensagem, user_id } = req.body;

  if (!nome || !email || !data || !horario || !numero_pessoas) {
    return res.status(400).json({ message: "Campos obrigatórios faltando." });
  }

  const sql = `
    INSERT INTO reservas (nome, email, telefone, data, horario, numero_pessoas, mensagem, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [nome, email, telefone, data, horario, numero_pessoas, mensagem, user_id], (err, result) => {
    if (err) {
      console.error("Erro ao criar reserva:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Reserva criada com sucesso!" });
  });
});

// Rota para obter todas as reservas (para o admin)
app.get("/reservas", (req, res) => {
  const sql = "SELECT * FROM reservas";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao obter reservas:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});