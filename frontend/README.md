# 个人博客【Demo版本】

## 介绍
此处个人博士主要以前端为主，分为前端和后端界面，前端界面主要参考[Sakura](https://2heng.xin/)和[theme-react-sakura](https://github.com/open-snail/theme-react-sakura)，后端界面主要以antd进行搭建。后端开发中，主要使用express和nodejs，侧重于与mysql进行增删改查等操作。

## 技术栈
基本是前端技术栈方面
React（19版本）、TypeScript/JavaScript、express、Nodejs、Antd、HTML、CSS、MySQL、Tailwind CSS等。

## 前端界面
搭建该个人博客的初衷有多个：
1. 为了丰富简历。 
2. 对[Sakura](https://2heng.xin/)这个很早就很喜欢，想着有机会搞一个类似的。 
3. [theme-react-sakura](https://github.com/open-snail/theme-react-sakura)虽然已经用react搭建，但是有的架构比较老，而且使用的css方式我觉得比较麻烦（即使用js文件直接用styled.div方式保存css），查看和修改不太方便，

所以我之前开始使用React和TypeScript借鉴[Sakura](https://2heng.xin/)和[theme-react-sakura](https://github.com/open-snail/theme-react-sakura)搭建简单的demo版本个人博客。

不过也因为是demo版本，有很多架构是没有搭建完成，在前端上，只有文章列表、文章页和Banner页搭建了，以后有时间我慢慢完善。

## 后端界面
后端界面直接使用antd组件库搭建的，目前就首页、文章发布页、文章列表页这几个部分。同样也是demo版本，以后有时间也会慢慢完善的。

## 后端框架
我设置前后端分离的主要目的还是认为搞一定的数据安全比较好一些，哪怕在这个简单的个人博客上，我还是遵循这个原则，对前端和后端分离。

然后在后端与数据库的交互上，我使用express这一轻量级框架，通过使用nodejs，实现与MySQL的交互。

## 使用方式
1. 先拷贝下载程序：
```
git clone git@github.com:liuweixu/blogsakura.git
```

2. 进入文件夹和使用npm安装
```
cd blogsakura
npm install
```

3. 运行
```
npm run server
npm run dev
```
**注意：** 该两行程序要在不同的cmd上运行。

或者可以：
```
npm run dev:all
```
原因具体见：package.json 的设定

# 未来改进计划

## 前端
- [x] 在前端首页中，添加分页 （使用伪前端分页方式，未经过后端MySQL处理）
- [ ] 添加个人介绍页
- [ ] 添加文件频道管理页
- [ ] 处理富文本，让图片也能显示

## 后端
- [ ] 处理首页，学习添加Echart
- [ ] 尝试引入SpringBoot