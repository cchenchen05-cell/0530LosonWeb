import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { getRow, runQuery } from '../db';
import { loginSchema, registerSchema } from '../utils/validators';
import { AuthRequest, authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const validated = registerSchema.parse(req.body);
    const existing = getRow<{ id: number }>('SELECT id FROM users WHERE username = ?', [validated.username]);
    if (existing) return res.status(400).json({ error: '用户名已存在' });
    const emailExists = getRow<{ id: number }>('SELECT id FROM users WHERE email = ?', [validated.email]);
    if (emailExists) return res.status(400).json({ error: '邮箱已被使用' });
    const passwordHash = await bcrypt.hash(validated.password, 10);
    runQuery('INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)', [validated.username, passwordHash, validated.email, 'editor']);
    const user = getRow<any>('SELECT id, username, email, role FROM users WHERE id = last_insert_rowid()');
    res.status(201).json({ message: '注册成功', user });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors[0].message });
    res.status(500).json({ error: '服务器错误' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const validated = loginSchema.parse(req.body);
    const user = getRow<any>('SELECT * FROM users WHERE username = ?', [validated.username]);
    if (!user) return res.status(401).json({ error: '用户名或密码错误' });
    const isValid = await bcrypt.compare(validated.password, user.password_hash);
    if (!isValid) return res.status(401).json({ error: '用户名或密码错误' });
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
    res.json({
      message: '登录成功',
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors[0].message });
    res.status(500).json({ error: '服务器错误' });
  }
});

router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});

export default router;
