# 滑雪度假村比较网站 - GitHub Pages 部署指南

## 📋 部署前准备

### 1. 将代码推送到GitHub
```bash
# 如果还没有创建GitHub仓库，请先在GitHub上创建一个新仓库
# 然后在本地项目目录执行：

git add .
git commit -m "准备部署到GitHub Pages"
git branch -M main
git remote add origin https://github.com/你的用户名/ID_Dev.git
git push -u origin main
```

### 2. 在GitHub上启用Pages功能
1. 访问您的GitHub仓库页面
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 下拉菜单中选择 **GitHub Actions**

## 🚀 自动部署

一旦您完成了上述设置，每当您向 `main` 分支推送代码时，GitHub Actions 会自动：
1. 构建您的项目
2. 将构建后的文件部署到GitHub Pages

您的网站将在以下地址可访问：
```
https://你的用户名.github.io/ID_Dev/
```

## 🛠️ 手动部署（可选）

如果您需要手动部署，可以使用以下命令：
```bash
npm run deploy
```

## 📁 项目结构说明

- `/.github/workflows/deploy.yml` - GitHub Actions配置文件
- `/dist/` - 构建输出目录（不要提交到Git）
- `vite.config.ts` - 已配置GitHub Pages的base路径

## 🐛 常见问题

### Q: 部署后页面显示404
A: 确保在GitHub仓库设置中启用了Pages功能，并选择了GitHub Actions作为源。

### Q: 样式或资源文件加载失败
A: 检查vite.config.ts中的base配置是否正确设置为您的仓库名。

### Q: 如何查看构建状态？
A: 在GitHub仓库页面，点击Actions标签页可以查看构建和部署的状态。

## 📞 支持

如果遇到问题，请检查：
1. GitHub Actions运行日志
2. 浏览器控制台错误信息
3. 确保所有依赖都已正确安装 