# 🎿 滑雪度假村比较网站 - Vercel 部署指南

## 📋 部署前准备

### 1. 确保代码已推送到GitHub
```bash
# 确保您在vercel-deploy分支上
git add .
git commit -m "配置Vercel部署"
git push origin vercel-deploy
```

## 🚀 Vercel部署步骤

### 方法一：通过Vercel网站部署（推荐）

1. **访问Vercel官网**
   - 打开 [https://vercel.com](https://vercel.com)
   - 使用GitHub账号登录

2. **导入项目**
   - 点击 "New Project" 按钮
   - 选择您的GitHub仓库 `ID_Dev`
   - 选择 `vercel-deploy` 分支

3. **配置项目**
   - **Project Name**: `ski-resort-comparison` (或您喜欢的名称)
   - **Framework Preset**: Vite (Vercel会自动检测)
   - **Root Directory**: `.` (保持默认)
   - **Build Command**: `npm run build` (已在vercel.json中配置)
   - **Output Directory**: `dist` (已在vercel.json中配置)
   - **Install Command**: `npm install` (已在vercel.json中配置)

4. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成（通常需要1-3分钟）

### 方法二：通过Vercel CLI部署

1. **安装Vercel CLI**
   ```powershell
   npm i -g vercel
   ```

2. **登录Vercel**
   ```powershell
   vercel login
   ```

3. **部署项目**
   ```powershell
   # 在项目根目录执行
   vercel
   
   # 首次部署时会询问一些配置问题：
   # ? Set up and deploy "C:\Users\zengr\Desktop\ID_Dev"? [Y/n] y
   # ? Which scope do you want to deploy to? [选择您的账户]
   # ? Link to existing project? [N/y] n
   # ? What's your project's name? ski-resort-comparison
   # ? In which directory is your code located? ./
   ```

4. **生产环境部署**
   ```powershell
   vercel --prod
   ```

## 🔧 配置文件说明

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### vite.config.ts 修改
- 移除了 `base: '/SkiMap_Web/'` 配置
- Vercel会自动处理路径，不需要额外的base路径

## 🌐 访问您的网站

部署成功后，您将获得：
- **预览URL**: `https://your-project-name-git-vercel-deploy-username.vercel.app`
- **生产URL**: `https://your-project-name.vercel.app`

## 🔄 自动部署

配置完成后，每当您向 `vercel-deploy` 分支推送代码时，Vercel会自动：
1. 检测到代码变更
2. 重新构建项目
3. 部署到生产环境

## 🛠️ 常见问题

### Q: 构建失败怎么办？
A: 检查Vercel的构建日志，通常是依赖安装或TypeScript编译错误。

### Q: 页面显示404
A: 确保vercel.json中的rewrites配置正确，这样可以处理SPA路由。

### Q: 如何设置自定义域名？
A: 在Vercel项目设置中的"Domains"选项卡添加您的域名。

### Q: 如何查看部署状态？
A: 在Vercel仪表板中可以查看所有部署的状态和日志。

## 📞 支持

如果遇到问题，请检查：
1. Vercel部署日志
2. 浏览器控制台错误信息
3. 确保所有依赖都在package.json中正确声明

## 🎉 完成！

现在您的滑雪度假村比较网站已经部署到Vercel上了！享受快速、可靠的全球CDN服务吧！ 