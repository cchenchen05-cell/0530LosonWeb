import { Router, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getRow, getAll, runQuery } from '../db';
import { AuthRequest, authMiddleware, adminMiddleware } from '../middleware/auth';
import { userSchema } from '../utils/validators';

const router = Router();

router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const items = getAll<any>('SELECT id, username, email, role, created_at FROM users');
    res.json({ data: items });
  } catch (error) { res.status(500).json({ error: '服务器错误' }); }
});

router.post('/', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const v = userSchema.parse(req.body);
    const existing = getRow<{ id: number }>('SELECT id FROM users WHERE username = ?', [v.username]);
    if (existing) return res.status(400).json({ error: '用户名已存在' });
    const passwordHash = await bcrypt.hash(v.password, 10);
    runQuery('INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)', [v.username, passwordHash, v.email, v.role]);
    const data = getRow<any>('SELECT id, username, email, role FROM users WHERE id = last_insert_rowid()');
    res.status(201).json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors[0].message });
    res.status(500).json({ error: '服务器错误' });
  }
});

router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const updateSchema = z.object({
      username: z.string().min(3).max(20).optional(),
      email: z.string().email().optional(),
      role: z.enum(['admin', 'editor']).optional(),
      password: z.string().min(6).max(50).optional(),
    });
    const v = updateSchema.parse(req.body);
    const id = parseInt(req.params.id);

    if (v.password) {
      const passwordHash = await bcrypt.hash(v.password, 10);
      const { password, ...rest } = v;
      runQuery(`UPDATE users SET ${Object.keys(rest).map(k => `${k} = ?`).join(', ')}, password_hash = ?, updated_at = datetime('now') WHERE id = ?`, [...Object.values(rest), passwordHash, id]);
    } else {
      const keys = Object.keys(v);
      if (keys.length === 0) return res.status(400).json({ error: '没有要更新的字段' });
      runQuery(`UPDATE users SET ${keys.map(k => `${k} = ?`).join(', ')}, updated_at = datetime('now') WHERE id = ?`, [...Object.values(v), id]);
    }

    const data = getRow<any>('SELECT id, username, email, role FROM users WHERE id = ?', [id]);
    if (!data) return res.status(404).json({ error: '用户不存在' });
    res.json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors[0].message });
    res.status(500).json({ error: '服务器错误' });
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (req.user?.id === id) return res.status(400).json({ error: '不能删除自己' });
    runQuery('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: '删除成功' });
  } catch (error) { res.status(500).json({ error: '服务器错误' }); }
});

export default router;
