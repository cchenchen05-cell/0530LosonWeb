import { Router, Response } from 'express';
import { z } from 'zod';
import { getRow, runQuery } from '../db';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import { contactInfoSchema } from '../utils/validators';

const router = Router();

router.get('/', async (req, res: Response) => {
  try {
    const info = getRow<any>('SELECT * FROM contact_info LIMIT 1');
    if (!info) return res.status(404).json({ error: '联系信息不存在' });
    res.json({ data: info });
  } catch (error) { res.status(500).json({ error: '服务器错误' }); }
});

router.put('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const v = contactInfoSchema.parse(req.body);
    const existing = getRow<any>('SELECT * FROM contact_info LIMIT 1');
    if (existing) {
      runQuery('UPDATE contact_info SET phone = ?, email = ?, address = ?, map_url = ?, updated_at = datetime(\'now\') WHERE id = ?', [v.phone, v.email, v.address, v.mapUrl || '', existing.id]);
      const data = getRow<any>('SELECT * FROM contact_info WHERE id = ?', [existing.id]);
      return res.json({ data });
    }
    runQuery('INSERT INTO contact_info (phone, email, address, map_url) VALUES (?, ?, ?, ?)', [v.phone, v.email, v.address, v.mapUrl || '']);
    const data = getRow<any>('SELECT * FROM contact_info WHERE id = last_insert_rowid()');
    res.json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors[0].message });
    res.status(500).json({ error: '服务器错误' });
  }
});

export default router;
