import { Router, Response } from 'express';
import { z } from 'zod';
import { getRow, getAll, runQuery } from '../db';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import { partnerSchema } from '../utils/validators';

const router = Router();

router.get('/', async (req, res: Response) => {
  try {
    const items = getAll<any>('SELECT * FROM partners ORDER BY sort_order ASC');
    res.json({ data: items });
  } catch (error) { res.status(500).json({ error: '服务器错误' }); }
});

router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const v = partnerSchema.parse(req.body);
    runQuery('INSERT INTO partners (name, logo, sort_order) VALUES (?, ?, ?)', [v.name, v.logo, v.sortOrder]);
    const data = getRow<any>('SELECT * FROM partners WHERE id = last_insert_rowid()');
    res.status(201).json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors[0].message });
    res.status(500).json({ error: '服务器错误' });
  }
});

router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const v = partnerSchema.parse(req.body);
    const id = parseInt(req.params.id);
    runQuery('UPDATE partners SET name = ?, logo = ?, sort_order = ?, updated_at = datetime(\'now\') WHERE id = ?', [v.name, v.logo, v.sortOrder, id]);
    const data = getRow<any>('SELECT * FROM partners WHERE id = ?', [id]);
    if (!data) return res.status(404).json({ error: '合作伙伴不存在' });
    res.json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors[0].message });
    res.status(500).json({ error: '服务器错误' });
  }
});

router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try { runQuery('DELETE FROM partners WHERE id = ?', [parseInt(req.params.id)]); res.json({ message: '删除成功' }); }
  catch (error) { res.status(500).json({ error: '服务器错误' }); }
});

router.put('/:id/sort', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { sortOrder } = z.object({ sortOrder: z.number().int().min(0) }).parse(req.body);
    const id = parseInt(req.params.id);
    runQuery('UPDATE partners SET sort_order = ?, updated_at = datetime(\'now\') WHERE id = ?', [sortOrder, id]);
    const data = getRow<any>('SELECT * FROM partners WHERE id = ?', [id]);
    if (!data) return res.status(404).json({ error: '合作伙伴不存在' });
    res.json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors[0].message });
    res.status(500).json({ error: '服务器错误' });
  }
});

export default router;
