const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const uploadRoute = require('./routes/upload');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/trackmygroceries';
mongoose.connect(MONGO).then(() => console.log('Mongo connected')).catch(err => console.error(err));

app.use('/api/upload', uploadRoute);

app.get('/api/ping', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend listening on', PORT));