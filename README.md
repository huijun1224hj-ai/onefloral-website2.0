# One Floral 花束 - 后台上传版本

## 怎样使用
1. 上传整个文件夹到 GitHub。
2. Netlify 连接这个 GitHub repository。
3. 去 Supabase 创建新 project。
4. 在 Supabase SQL Editor 执行 `supabase-setup.sql`。
5. 在 Supabase Storage 创建 bucket，名字必须是：`product-images`，并设为 Public。
6. 在 Supabase Project Settings > API 复制：Project URL 和 anon public key。
7. 打开 `config.js`，替换：
   - `PASTE_YOUR_SUPABASE_URL_HERE`
   - `PASTE_YOUR_SUPABASE_ANON_KEY_HERE`
8. 重新上传 GitHub，Netlify 会自动更新。

## 后台链接
网站上线后，后台在：
`https://你的网址/admin.html`

手机也可以打开这个后台上传照片、名称、价格和分类。

## 注意
这个版本是简单后台版，方便快速上新作品。任何知道后台网址的人理论上都能上传。正式营业后建议加登录保护。
