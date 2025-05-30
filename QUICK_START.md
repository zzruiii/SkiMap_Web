# 🎿 快速部署到GitHub Pages

## 步骤1: 推送代码到GitHub

1. 在GitHub上创建新仓库，命名为 `ID_Dev`
2. 在本地执行以下命令（PowerShell）：

```powershell
git add .
git commit -m "Ready for GitHub Pages deployment"
git branch -M main
git remote add origin https://github.com/你的用户名/ID_Dev.git
git push -u origin main
```

## 步骤2: 启用GitHub Pages

1. 打开您的GitHub仓库页面
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 将 **Source** 设置为 **GitHub Actions**

## 步骤3: 等待部署完成

- GitHub Actions会自动运行并部署您的网站
- 在 **Actions** 标签页可以查看部署进度
- 部署完成后，网站将在 `https://你的用户名.github.io/ID_Dev/` 可访问

## 完成！

现在您的滑雪度假村比较网站已经在线运行了！🎉

### 注意事项
- 每次推送到main分支都会自动重新部署
- 如果首次访问出现404，请等待几分钟后再试
- 确保仓库名称为 `ID_Dev`（与vite.config.ts中的base路径匹配） 

## 🔧 主要修复内容：

1. **权限配置位置**：将 `permissions` 移到了正确的位置（在jobs之前）
2. **更新action版本**：
   - `actions/setup-node@v3` → `@v4`
   - `actions/configure-pages@v3` → `@v4`
   - `actions/upload-pages-artifact@v2` → `@v3`
   - `actions/deploy-pages@v2` → `@v4`
3. **移除pull_request触发**：只在推送到main分支时部署

## 📝 接下来的步骤：

1. **更新工作流文件**：用上面的内容替换您的 `.github/workflows/deploy.yml` 文件
2. **重新提交推送**：
   ```powershell
   git add .github/workflows/deploy.yml
   git commit -m "Fix GitHub Actions workflow configuration"
   git push origin main
   ```
3. **等待重新部署**：GitHub会自动重新运行部署流程

请更新这个文件后重新推送，部署应该就能成功了！🚀 