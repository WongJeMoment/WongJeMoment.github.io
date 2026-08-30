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
styles/
  base.css            主题变量、字体和全局样式
  header.css          导航和语言切换
  hero.css            首页首屏
  sections.css        关于与研究方向
  papers.css          论文卡片
  projects.css        项目列表
  contact-footer.css  联系区和页尾
  responsive.css      移动端和无障碍适配
weekly/
  index.html          科研周记归档首页
  styles.css          周记与报告页面样式
  script.js           阅读进度、目录和视频交互
  assets/             按日期保存的周报图片与视频
  reports/            按日期保存的 HTML 周报
```

`index.html` 和 `en.html` 只保留页面外壳。新增或修改内容时，在 `components/zh/` 与
`components/en/` 中编辑对应模块；更换整站主题色时，修改 `styles/base.css` 中的颜色变量即可。

新增组会周报时，在 `weekly/reports/` 下创建日期目录，并把对应媒体放入
`weekly/assets/` 的同名日期目录；随后在 `weekly/index.html` 中增加一张归档卡片。
