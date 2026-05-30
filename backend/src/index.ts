import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import categoriesRoutes from './routes/categories';
import partnersRoutes from './routes/partners';
import bannersRoutes from './routes/banners';
import contactRoutes from './routes/contact';
import usersRoutes from './routes/users';
import { initDb } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  const db = await initDb();
  app.locals.db = db;

  app.use('/api/auth', authRoutes);
  app.use('/api/products', productsRoutes);
  app.use('/api/categories', categoriesRoutes);
  app.use('/api/partners', partnersRoutes);
  app.use('/api/banners', bannersRoutes);
  app.use('/api/contact-info', contactRoutes);
  app.use('/api/users', usersRoutes);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use((req, res) => {
    res.status(404).json({ error: '接口不存在' });
  });

  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

startServer();
