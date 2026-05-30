import { Router, Response } from 'express';
import { z } from 'zod';
import { getRow, getAll, runQuery } from '../db';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import { productSchema } from '../utils/validators';

const router = Router();

router.get('/', async (req, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const search = (req.query.search as string) || '';
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : null;
    const offset = (page - 1) * limit;

    let where = '1=1';
    const params: any[] = [];
    if (search) { where += ' AND name LIKE ?'; params.push(`%${search}%`); }
    if (categoryId) { where += ' AND category_id = ?'; params.push(categoryId); }

    const countResult = getRow<{ total: number }>(`SELECT COUNT(*) as total FROM products WHERE ${where}`, params);
    const items = getAll<any>(`SELECT * FROM products WHERE ${where} ORDER BY sort_order ASC, created_at DESC LIMIT ? OFFSET ?`, [...params, limit, offset]);

    res.json({
      data: items,
      pagination: { page, limit, total: countResult?.total || 0, totalPages: Math.ceil((countResult?.total || 0) / limit) },
    });
  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
});

router.get('/:id', async (req, res: Response) => {
  try {
    const product = getRow<any>('SELECT * FROM products WHERE id = ?', [parseInt(req.params.id)]);
    if (!product) return res.status(404).json({ error: '产品不存在' });
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
});

router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const v = productSchema.parse(req.body);
    runQuery('INSERT INTO products (name, description, image, category_id, sort_order) VALUES (?, ?, ?, ?, ?)', [v.name, v.description, v.image, v.categoryId || null, v.sortOrder]);
    const data = getRow<any>('SELECT * FROM products WHERE id = last_insert_rowid()');
    res.status(201).json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors[0].message });
    res.status(500).json({ error: '服务器错误' });
  }
});

router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const v = productSchema.parse(req.body);
    const id = parseInt(req.params.id);
    runQuery('UPDATE products SET name = ?, description = ?, image = ?, category_id = ?, sort_order = ?, updated_at = datetime(\'now\') WHERE id = ?', [v.name, v.description, v.image, v.categoryId || null, v.sortOrder, id]);
    const data = getRow<any>('SELECT * FROM products WHERE id = ?', [id]);
    if (!data) return res.status(404).json({ error: '产品不存在' });
    res.json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors[0].message });
    res.status(500).json({ error: '服务器错误' });
  }
});

router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    runQuery('DELETE FROM products WHERE id = ?', [parseInt(req.params.id)]);
    res.json({ message: '删除成功' });
  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
});

export default router;
