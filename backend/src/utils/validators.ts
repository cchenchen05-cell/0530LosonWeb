import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, '用户名不能为空'),
  password: z.string().min(1, '密码不能为空'),
});

export const registerSchema = z.object({
  username: z.string().min(3, '用户名至少3个字符').max(20, '用户名最多20个字符'),
  password: z.string().min(6, '密码至少6个字符').max(50, '密码最多50个字符'),
  email: z.string().email('邮箱格式不正确'),
});

export const productSchema = z.object({
  name: z.string().min(1, '产品名称不能为空').max(100, '产品名称最多100个字符'),
  description: z.string().min(1, '产品描述不能为空'),
  image: z.string().url('图片URL格式不正确'),
  categoryId: z.number().int().positive().optional(),
  sortOrder: z.number().int().min(0).default(0),
});

export const categorySchema = z.object({
  name: z.string().min(1, '分类名称不能为空').max(50, '分类名称最多50个字符'),
  icon: z.string().default(''),
  sortOrder: z.number().int().min(0).default(0),
});

export const partnerSchema = z.object({
  name: z.string().min(1, '合作伙伴名称不能为空').max(100, '名称最多100个字符'),
  logo: z.string().url('Logo URL格式不正确'),
  sortOrder: z.number().int().min(0).default(0),
});

export const bannerSchema = z.object({
  image: z.string().url('图片URL格式不正确'),
  title: z.string().min(1, '标题不能为空').max(100, '标题最多100个字符'),
  sortOrder: z.number().int().min(0).default(0),
});

export const contactInfoSchema = z.object({
  phone: z.string().min(1, '电话不能为空'),
  email: z.string().email('邮箱格式不正确'),
  address: z.string().min(1, '地址不能为空'),
  mapUrl: z.string().url('地图URL格式不正确').optional().default(''),
});

export const userSchema = z.object({
  username: z.string().min(3, '用户名至少3个字符').max(20, '用户名最多20个字符'),
  password: z.string().min(6, '密码至少6个字符').max(50, '密码最多50个字符'),
  email: z.string().email('邮箱格式不正确'),
  role: z.enum(['admin', 'editor']).default('editor'),
});
