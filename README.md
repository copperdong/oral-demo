# 口语读读乐

> 刚接触全栈小同学为POPStation线上H5项目做的第一个demo，项目刚刚起步，还没有整合使用vue，myaql。目前初步搭好了koa后台设置路由，基于jquery动效库以及现有动效，结合POPStation需求做了两个演示动效，接下来主要工作是以上线为目标开发H5结构，根据需要使用vue实现交互原型，完成粉丝留言领劵的功能。

## 项目说明

- UI：暂定
- 前端框架：Vue（还未整合）
- 后端框架：Koa
- 数据库：Mysql（还未加入）
- 部署：PM2

## 项目相关博客

- [一次前后端分离项目部署实践](https://www.breezymelon.com/2018/06/14/%E4%B8%80%E6%AC%A1%E5%89%8D%E5%90%8E%E7%AB%AF%E5%88%86%E7%A6%BB%E9%A1%B9%E7%9B%AE%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/)

- [Vue SSR 初探](https://www.breezymelon.com/2018/09/28/Vue-ssr-%E5%88%9D%E6%8E%A2/)

- [Koa——廖雪峰的官方网站](https://www.breezymelon.com/2018/09/28/Vue-ssr-%E5%88%9D%E6%8E%A2/)

## 安装

`git clone git@github.com:mantianwei/POPStation.git`

### 配置

`cd POPStation && npm install`

## 运行
## 演示
目前在本地局域网下演示二维码为show.png

### 前端

在项目根路径下执行 `npm run dev` 打开浏览器 `localhost:8080`
目前Vue还未整合到项目中

### 后端

在项目根路径下执行 `cd ./ && node app.js` 打开浏览器 `localhost:3000`
