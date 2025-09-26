const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'troque_para_uma_chave_secreta';
const SALT_ROUNDS = 10;

function generateToken(user){
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

function authMiddleware(req, res, next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ error: 'missing token' });
  const token = auth.split(' ')[1];
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  }catch(e){
    return res.status(401).json({ error: 'invalid token' });
  }
}

// registro
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'email e senha são obrigatórios' });
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  try{
    const stmt = db.prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)');
    const info = stmt.run(name || '', email, hash, role || 'client');
    const user = { id: info.lastInsertRowid, name, email, role };
    const token = generateToken(user);
    res.json({ user, token });
  }catch(e){
    res.status(400).json({ error: 'email já cadastrado' });
  }
});

// login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const row = db.prepare('SELECT id, name, email, password_hash, role FROM users WHERE email = ?').get(email);
  if(!row) return res.status(400).json({ error: 'credenciais inválidas' });
  const ok = await bcrypt.compare(password, row.password_hash);
  if(!ok) return res.status(400).json({ error: 'credenciais inválidas' });
  const user = { id: row.id, name: row.name, email: row.email, role: row.role };
  const token = generateToken(user);
  res.json({ user, token });
});

// rota pública
app.get('/api/professionals', (req,res) => {
  const list = [
    { id:1, name: 'Dra. Clara Silva', specialty: 'Psicologia Clínica' },
    { id:2, name: 'Dr. João Pereira', specialty: 'Psicoterapia' }
  ];
  res.json(list);
});

// cliente
app.get('/api/client/appointments', authMiddleware, (req,res) => {
  if(req.user.role !== 'client') return res.status(403).json({ error: 'apenas clientes' });
  const rows = db.prepare('SELECT * FROM appointments WHERE client_id = ?').all(req.user.id);
  res.json(rows);
});

// clínica
app.get('/api/clinic/appointments', authMiddleware, (req,res) => {
  if(req.user.role !== 'clinic') return res.status(403).json({ error: 'apenas clínica' });
  const rows = db.prepare('SELECT a.*, u.name as client_name, u.email as client_email FROM appointments a LEFT JOIN users u ON u.id = a.client_id').all();
  res.json(rows);
});

// criar agendamento
app.post('/api/appointments', authMiddleware, (req,res) => {
  const { client_id, date, notes } = req.body;
  const cid = req.user.role === 'client' ? req.user.id : client_id;
  const stmt = db.prepare('INSERT INTO appointments (client_id, date, notes, status) VALUES (?, ?, ?, ?)');
  const info = stmt.run(cid, date, notes || '', 'scheduled');
  res.json({ id: info.lastInsertRowid, client_id: cid, date, notes });
});

// atualizar status
app.patch('/api/appointments/:id/status', authMiddleware, (req,res) => {
  if(req.user.role !== 'clinic') return res.status(403).json({ error: 'apenas clínica' });
  const { status } = req.body;
  const stmt = db.prepare('UPDATE appointments SET status = ? WHERE id = ?');
  stmt.run(status, req.params.id);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on', PORT));