# Tasks

## 基础设施任务
- [x] Task 1: 初始化项目基础设施
  - [x] 1.1 创建 Monorepo 项目结构（frontend/ + backend/）
  - [x] 1.2 配置 TypeScript、ESLint、Prettier
  - [x] 1.3 设置项目构建工具与脚本

## 后端开发任务
- [x] Task 2: 后端基础架构
  - [x] 2.1 搭建 Express.js + TypeScript 后端框架
  - [x] 2.2 配置 SQLite 数据库与 ORM（Drizzle ORM）
  - [x] 2.3 创建数据库迁移脚本与种子数据

- [x] Task 3: 后端 API - 认证模块
  - [x] 3.1 实现用户注册 API（POST /api/register）
  - [x] 3.2 实现用户登录 API（POST /api/login）
  - [x] 3.3 实现 JWT 中间件与权限校验
  - [x] 3.4 实现获取当前用户 API（GET /api/auth/me）

- [x] Task 4: 后端 API - 产品管理
  - [x] 4.1 实现产品列表 API（GET /api/products）支持分页、搜索、分类筛选
  - [x] 4.2 实现产品详情 API（GET /api/products/:id）
  - [x] 4.3 实现产品新增 API（POST /api/products）
  - [x] 4.4 实现产品编辑 API（PUT /api/products/:id）
  - [x] 4.5 实现产品删除 API（DELETE /api/products/:id）

- [x] Task 5: 后端 API - 分类管理
  - [x] 5.1 实现分类列表 API（GET /api/categories）
  - [x] 5.2 实现分类新增 API（POST /api/categories）
  - [x] 5.3 实现分类编辑 API（PUT /api/categories/:id）
  - [x] 5.4 实现分类删除 API（DELETE /api/categories/:id）

- [x] Task 6: 后端 API - 合作伙伴管理
  - [x] 6.1 实现合作伙伴列表 API（GET /api/partners）
  - [x] 6.2 实现合作伙伴新增 API（POST /api/partners）
  - [x] 6.3 实现合作伙伴编辑 API（PUT /api/partners/:id）
  - [x] 6.4 实现合作伙伴删除 API（DELETE /api/partners/:id）
  - [x] 6.5 实现合作伙伴排序 API（PUT /api/partners/:id/sort）

- [x] Task 7: 后端 API - 轮播图管理
  - [x] 7.1 实现轮播图列表 API（GET /api/banners）
  - [x] 7.2 实现轮播图新增 API（POST /api/banners）
  - [x] 7.3 实现轮播图编辑 API（PUT /api/banners/:id）
  - [x] 7.4 实现轮播图删除 API（DELETE /api/banners/:id）
  - [x] 7.5 实现轮播图排序 API（PUT /api/banners/:id/sort）

- [x] Task 8: 后端 API - 联系信息与用户管理
  - [x] 8.1 实现联系信息获取/更新 API
  - [x] 8.2 实现用户列表/新增/编辑/删除 API

## 前端开发任务（可并行）
- [x] Task 9: 前端项目初始化
  - [x] 9.1 创建 Vite + React + TypeScript 前台项目
  - [x] 9.2 配置 Tailwind CSS + shadcn/ui
  - [x] 9.3 配置路由（React Router）
  - [x] 9.4 配置 API 客户端（axios/fetch）
  - [x] 9.5 创建 Vite + React + TypeScript 后台项目
  - [x] 9.6 配置后台项目的 Tailwind CSS + shadcn/ui + React Router

- [x] Task 10: 前台 - 公共组件开发
  - [x] 10.1 开发 Header 组件（导航栏、Logo、搜索框、登录按钮）
  - [x] 10.2 开发 Footer 组件（底部信息、链接）
  - [x] 10.3 开发 Layout 布局组件

- [x] Task 11: 前台 - 首页开发（1:1还原）
  - [x] 11.1 实现轮播图组件（自动播放、手动切换、指示点）
  - [x] 11.2 实现公司简介模块（图片+文字布局、交互动画）
  - [x] 11.3 实现产品中心模块（Tab切换、卡片网格、分页、搜索）
  - [x] 11.4 实现合作伙伴模块（Logo网格、滚动动画）
  - [x] 11.5 实现联系我们模块（联系信息展示）
  - [x] 11.6 实现搜索动画效果与商品卡片交互效果

- [x] Task 12: 后台 - 公共组件开发
  - [x] 12.1 开发后台布局（侧边栏导航 + 主内容区）
  - [x] 12.2 开发登录页面
  - [x] 12.3 开发数据表格通用组件
  - [x] 12.4 开发表单对话框通用组件
  - [x] 12.5 开发认证保护路由与路由守卫

- [x] Task 13: 后台 - 功能页面开发
  - [x] 13.1 开发仪表盘页面（数据概览）
  - [x] 13.2 开发用户管理页面（列表、新增、编辑、删除、角色分配）
  - [x] 13.3 开发产品管理页面（列表、新增、编辑、删除）
  - [x] 13.4 开发分类管理页面（列表、新增、编辑、删除）
  - [x] 13.5 开发合作伙伴管理页面（列表、新增、编辑、删除、排序）
  - [x] 13.6 开发轮播图管理页面（列表、新增、编辑、删除、排序）
  - [x] 13.7 开发联系信息配置页面

- [x] Task 14: 前后端联调与数据填充
  - [x] 14.1 生成模拟数据并写入数据库（产品、分类、合作伙伴、轮播图、用户）
  - [x] 14.2 前台与后端 API 联调测试
  - [x] 14.3 后台与后端 API 联调测试
  - [x] 14.4 修复联调中发现的问题

## 测试与优化任务
- [x] Task 15: 功能测试
  - [x] 15.1 前台页面展示测试（所有模块）
  - [x] 15.2 前台交互效果测试（动画、Tab切换、搜索、分页）
  - [x] 15.3 后台增删改查测试（所有模块）
  - [x] 15.4 表单提交与校验测试
  - [x] 15.5 异常处理测试（404、500、权限不足等）

- [x] Task 16: 安全与性能验证
  - [x] 16.1 输入校验测试（XSS 防护）
  - [x] 16.2 权限控制测试（未登录访问、越权操作）
  - [x] 16.3 加载速度测试（首屏渲染、资源加载）
  - [x] 16.4 请求合理性测试（无冗余请求、防抖节流生效）
  - [x] 16.5 数据库查询效率测试（索引、N+1 检查）

- [x] Task 17: 文档输出
  - [x] 17.1 编写技术文档（核心页面说明、数据流转逻辑、前后端对应关系、五个维度分析）
  - [x] 17.2 编写测试报告（页面展示、交互效果、表单提交、后台 CRUD、异常处理、安全防护、性能指标）
  - [x] 17.3 提供预览访问方式

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 2]
- [Task 5] depends on [Task 2]
- [Task 6] depends on [Task 2]
- [Task 7] depends on [Task 2]
- [Task 8] depends on [Task 2]
- [Task 9] depends on [Task 1]
- [Task 10] depends on [Task 9]
- [Task 11] depends on [Task 10, Task 4, Task 5, Task 6, Task 7]
- [Task 12] depends on [Task 9]
- [Task 13] depends on [Task 12, Task 3, Task 4, Task 5, Task 6, Task 7, Task 8]
- [Task 14] depends on [Task 11, Task 13]
- [Task 15] depends on [Task 14]
- [Task 16] depends on [Task 15]
- [Task 17] depends on [Task 16]
