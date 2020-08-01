## 实现功能
在打包子项目的时候，可以选择同时拷贝或者移动打包的文件到根目录的 dists 下的子项目名称的文件夹下

## 子项目的脚本约定
```
"build-move": "webpack --config ./build/webpack.config.js && node ../../move-dists/move.js --packageName pack1",
```
```
"build-copy": "webpack --config ./build/webpack.config.js && node ../../move-dists/copy.js --packageName pack1"
```

## 扩展
子项目可以使用任何打包方式来打包，此项目只是以 webpack 为例，只要在后面加上此命令即可
```
node ../../move-dists/${copy | move}.js --packageName ${packageName}
```