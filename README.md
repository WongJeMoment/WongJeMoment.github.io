# WongJeMoment.github.io

Wong Je 的个人主页，使用原生 HTML、CSS 和少量 JavaScript 构建，并通过 GitHub Pages 发布。

在线地址：<https://wongjemoment.github.io/>

## 本地预览

```bash
python3 -m http.server 8000
```

然后访问 <http://localhost:8000>。

> 页面内容通过 `fetch` 加载 HTML 组件，因此不能直接双击 `index.html` 预览。

## 目录结构

```text
components/
  zh/                 中文页面模块
  en/                 英文页面模块
styles.css            中英文主页的完整样式
weekly/
  index.html          科研周记归档首页
  styles.css          科研周记归档样式
  script.js           阅读进度、目录和视频交互
  assets/             按日期保存的周报图片与视频
  reports/
    日期/
      index.html      单期周报
      styles.css      单期周报专属样式
thoughts/
  index.html          所思所想归档首页
  styles.css          随笔归档样式
  essays/
    日期/
      index.html      单篇随笔
      styles.css      单篇随笔专属样式
```

`index.html` 和 `en.html` 只保留页面外壳。新增或修改内容时，在 `components/zh/` 与
`components/en/` 中编辑对应模块；主页的主题、组件和响应式样式统一维护在根目录
`styles.css` 中。

新增组会周报时，在 `weekly/reports/` 下创建日期目录，并把对应媒体放入
`weekly/assets/` 的同名日期目录；每个日期目录内保留对应的 `index.html` 与
`styles.css`，随后在 `weekly/index.html` 中增加一张归档卡片。随笔页面采用相同结构。
