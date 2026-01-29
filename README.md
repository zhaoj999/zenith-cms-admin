# Zenith CMS Admin

一个现代化的内容管理系统(CMS)后台管理界面,采用 React + FastAPI 全栈架构。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.3-61dafb.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg)

## ✨ 特性

- 🎨 **现代化 UI** - 精美的深色/浅色主题切换
- 📊 **数据可视化** - 实时统计图表展示
- 📝 **内容管理** - 文章发布、编辑、删除
- 🔍 **智能搜索** - 快速查找文章和作者
- 🏷️ **分类筛选** - 按状态筛选内容
- 📱 **响应式设计** - 完美适配移动端
- ⚡ **高性能** - Vite 构建,快速热更新
- 🔐 **安全可靠** - Supabase 数据库,行级安全策略

## 🛠️ 技术栈

### 前端
- **框架**: React 19.2.3
- **语言**: TypeScript 5.8
- **构建工具**: Vite 6.2
- **图表库**: Recharts 3.6
- **样式**: Vanilla CSS + CSS Variables

### 后端
- **框架**: FastAPI 0.109+
- **语言**: Python 3.10+
- **数据库**: Supabase (PostgreSQL)
- **验证**: Pydantic 2.6+
- **服务器**: Uvicorn 0.27+

## 📦 项目结构

```
zenith-cms-admin/
├── components/          # React 组件
│   ├── Dashboard.tsx    # 仪表盘
│   ├── ContentList.tsx  # 内容列表
│   ├── ArticleCard.tsx  # 文章卡片
│   └── ...
├── backend/            # FastAPI 后端
│   ├── main.py         # 应用入口
│   ├── routers/        # API 路由
│   ├── schemas.py      # 数据模型
│   ├── database.py     # 数据库连接
│   └── .env.example    # 环境变量示例
├── api/                # API 服务
│   └── services.ts     # 前端 API 调用
├── types.ts            # TypeScript 类型定义
├── App.tsx             # 主应用组件
└── index.tsx           # 应用入口
```

## 🚀 快速开始

### 前置要求

- Node.js >= 18
- Python >= 3.10
- Supabase 账号

### 1. 克隆项目

```bash
git clone https://github.com/your-username/zenith-cms-admin.git
cd zenith-cms-admin
```

### 2. 配置环境变量

复制 `.env.example` 并配置 Supabase 凭证:

```bash
cd backend
cp .env.example .env
```

编辑 `backend/.env`:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

### 3. 数据库设置

在 Supabase SQL 编辑器中执行 `backend/supabase_schema.sql` 创建数据表。

### 4. 安装依赖

**前端:**
```bash
npm install
```

**后端:**
```bash
cd backend
pip install -r requirements.txt
```

### 5. 启动开发服务器

**前端** (终端 1):
```bash
npm run dev
```

**后端** (终端 2):
```bash
cd backend
python -m uvicorn main:app --reload
```

访问:
- 前端: http://localhost:3000
- 后端 API: http://localhost:8000
- API 文档: http://localhost:8000/docs

## 📝 API 端点

### 文章管理
- `GET /api/articles` - 获取所有文章
- `POST /api/articles` - 创建新文章
- `PUT /api/articles/{id}` - 更新文章
- `DELETE /api/articles/{id}` - 删除文章

### 仪表盘
- `GET /api/dashboard/stats` - 获取统计数据
- `GET /api/dashboard/activities` - 获取活动记录

## 🎯 功能特性

### 仪表盘
- 实时数据统计(浏览量、文章数、待审核、活跃用户)
- 趋势分析图表
- 最近活动时间线

### 内容管理
- 文章发布与编辑
- 状态管理(已发布/草稿/待审核)
- 分类标签
- 搜索与筛选

## 🔧 已知问题与解决方案

### Gotrue 库兼容性问题

如果遇到 `TypeError: __init__() got an unexpected keyword argument 'proxy'` 错误:

**解决方案**: 编辑 Python site-packages 中的 `gotrue/_sync/api.py` 文件,在第36-41行移除 `proxy=proxy,` 参数。

详细信息请参考项目文档。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📄 许可证

MIT License

## 🙏 致谢

- [React](https://react.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Supabase](https://supabase.com/)
- [Recharts](https://recharts.org/)
