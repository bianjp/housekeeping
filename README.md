# Housekeeping

## 安装

1. 安装Node.js, NPM  
   下载：http://nodejs.org/download  
   Linux下参考https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager  
   通常Node.js安装包已经包含了NPM。
   
2. 安装MongoDB  
   参考http://docs.mongodb.org/manual
   
3. 安装grunt-cli  
   npm install -g grunt-cli

4. 安装Ruby, compass 

   gem install compass 
   ___确保命令下compass命令可用___

## 运行

### 运行数据库

```
mongod --dbpath YourDbPath #可不指定dbpath, 使用默认路径
```

### 运行服务器

```
npm install #仅首次运行需要
grunt
```

## Grunt任务

- default: 构建并运行程序
- build: 仅构建程序
- run: 仅运行程序
- reset: 重置数据库

## 文件结构

- bin: 编译生成的服务器端代码
- public: 公开资源，存放图片、第三方库/插件及编译生成的客户端js, css文件
- src: 应用源文件
- src/collections: Collection的定义，仅用来记录、查询数据结构
- src/config: 应用的配置信息，如数据库的地址、端口等
- src/lib: 供服务器端其它部分使用的函数
- src/routes: 路由定义及处理
- src/views: jade模板
- src/client: 客户端的js、css源文件
- src/client/js: 客户端的js文件
- src/client/js/lib: 自定义的供多个页面使用的js函数
- package.json: 管理npm依赖
- app.ls: 应用的入口
- Gruntfile.js: Grunt配置
