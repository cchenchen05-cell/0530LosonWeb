# 公司官网与后台管理系统 Spec

## Why
公司需要一套完整的官网展示系统（前台）和后台管理系统，用于展示产品信息、公司简介、客户评价等内容，同时提供管理员对全栈内容的增删改查能力。

## What Changes
- **BREAKING** 全新创建官网前台展示系统
- **BREAKING** 全新创建后台管理系统（CMS）
- 数据库设计与初始化
- API 接口层（前后端分离）
- 前后台联调与数据模拟

## Impact
- 新建项目（无已有代码影响）
- 涉及前端展示、后台管理、数据库设计、API 设计全栈

## ADDED Requirements

### Requirement: 前台展示系统
系统 SHALL 提供响应式官网展示页面，包含：
- 顶部导航栏（含 Logo、导航链接、搜索框、登录/注册按钮）
- 首页轮播图（自动切换、手动导航、指示点）
- 公司简介模块（图片 + 文字布局）
- 产品中心模块（Tab 分类切换、卡片网格、分页、搜索）
- 合作伙伴模块（Logo 网格）
- 联系我们模块（联系信息展示）
- 底部版权信息

### Requirement: 后台管理系统
系统 SHALL 提供后台管理功能，包含：
- 登录/登出（JWT 认证）
- 用户管理（用户列表、新增、编辑、删除、分配角色）
- 产品管理（产品列表、新增、编辑、删除、分类管理）
- 分类管理（分类列表、新增、编辑、删除）
- 合作伙伴管理（Logo 列表、新增、编辑、删除、排序）
- 轮播图管理（图片列表、新增、编辑、删除、排序）
- 联系信息配置（编辑联系信息）

### Requirement: API 接口
系统 SHALL 提供 RESTful API：
- POST /api/login - 管理员登录
- POST /api/register - 用户注册
- GET /api/auth/me - 获取当前用户信息
- GET /api/products - 获取产品列表（分页、搜索、分类筛选）
- GET /api/products/:id - 获取单个产品详情
- POST /api/products - 新增产品（需认证）
- PUT /api/products/:id - 编辑产品（需认证）
- DELETE /api/products/:id - 删除产品（需认证）
- GET /api/categories - 获取分类列表
- POST /api/categories - 新增分类（需认证）
- PUT /api/categories/:id - 编辑分类（需认证）
- DELETE /api/categories/:id - 删除分类（需认证）
- GET /api/partners - 获取合作伙伴列表
- POST /api/partners - 新增合作伙伴（需认证）
- PUT /api/partners/:id - 编辑合作伙伴（需认证）
- DELETE /api/partners/:id - 删除合作伙伴（需认证）
- PUT /api/partners/:id/sort - 更新排序（需认证）
- GET /api/banners - 获取轮播图列表
- POST /api/banners - 新增轮播图（需认证）
- PUT /api/banners/:id - 编辑轮播图（需认证）
- DELETE /api/banners/:id - 删除轮播图（需认证）
- PUT /api/banners/:id/sort - 更新排序（需认证）
- GET /api/contact-info - 获取联系信息
- PUT /api/contact-info - 更新联系信息（需认证）
- GET /api/users - 获取用户列表（需认证）
- POST /api/users - 新增用户（需认证）
- PUT /api/users/:id - 编辑用户（需认证）
- DELETE /api/users/:id - 删除用户（需认证）

### Requirement: 数据库设计
系统 SHALL 使用 SQLite 数据库，包含以下表：
- users: id, username, password_hash, email, role, created_at, updated_at
- products: id, name, description, image, category_id, sort_order, created_at, updated_at
- categories: id, name, icon, sort_order, created_at, updated_at
- partners: id, name, logo, sort_order, created_at, updated_at
- banners: id, image, title, sort_order, created_at, updated_at
- contact_info: id, phone, email, address, map_url, created_at, updated_at

### Requirement: 安全要求
系统 SHALL 实现以下安全措施：
- 密码使用 bcrypt 加密存储
- JWT Token 认证，设置合理过期时间
- 所有管理操作需验证 JWT Token
- 输入数据校验（zod）
- CORS 配置
- 防 SQL 注入（使用 ORM/查询构建器）
- 防 XSS（前端渲染时转义）
- 角色权限控制（admin / editor）

### Requirement: 性能要求
系统 SHALL 实现：
- 前端代码分割与懒加载
- 图片懒加载
- 接口防抖/节流
- 首屏优化（关键资源优先加载）
- 数据库查询添加索引
- 合理使用缓存机制
- 消除 N+1 查询

### Requirement: 1:1 还原要求
前台展示页面 SHALL 严格遵循"代码1：1还原.md"中的模块代码，对交互、布局、交互动画、加载动画、默认动画等进行1:1精确还原，不丢失文档中给出的任何布局或交互代码。
