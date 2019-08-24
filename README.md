# 口语读读乐

> 口语读读乐是一款练习并评测英语口语的英语小程序。通过AI打分，轻松获取你的口语成绩，口语水平提高就在眼前。
小程序给用户展示英语句子，引导用户完成读十条随机推荐的英语句子任务，用户逐条读出并综合评分出排名。
小程序根据用户读出的语音进行AI打分，同时用于可以收听每条英语句子正确的读音与自己刚才的读音。

## 项目说明
- 仓库为口语读读乐小程序前端的内容

- 前端框架：微信小程序框架
- （后端框架：Spring GAN）
- （数据库：Mysql）

## 安装

`git clone git@github.com:mantianwei/dudule.git`

### 配置

- 微信开发者工具配置

- 小程序服务器域名配置
  reques合法域名：https://kouxun.lenovoresearch2019.cn
  https://kouxunspeak.lenovoresearch2019.cn
  https://spokenenglishtest.smartedu.lenovo.com
  uploadFile合法域名：
  https://kouxun.lenovoresearch2019.cn
  https://kouxunspeak.lenovoresearch2019.cn
  https://spokenenglishtest.smartedu.lenovo.com

- 后台登陆配置
  AppID（小程序ID）  AppSecret（小程序密匙）

## 运行

微信开发者工具运行项目文件

## 演示

微信小程序搜索“口语读读乐”

### 前端

项目前端的主要逻辑页面是records，score两个页面，分别负责英语句子与评分的业务逻辑
records页面包括进度条组件、英语句子组件、播放声音组件与录音组件，进度条组件用于展示任务进度，英语句子组件针对情景渲染不同颜色的英语单词，播放声音组件用于播放正确读音与用户读音，录音组件用于接收用户的读音。
score页面中的展示分数组件用于展示用户的分数排名与读句子总数排名。
