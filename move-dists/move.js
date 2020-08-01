const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const { parseArgv, moveToDists } = require('./util');


// 1. 解析参数，拿到子项目的文件夹名称
let { packageName } = parseArgv(['packageName']); // pack1

// 2. 把对应包名称的打包产出中的文件 dist/**，放到 dists/{packageName}/ 下
const source = path.resolve(__dirname, `../packages/${packageName}/dist`);
const target = path.resolve(__dirname, `../dists/${packageName}/`);
try {
  moveToDists(source, target);
  console.log( `移动成功，移动的项目名称：${packageName}` );
} catch (error) {
  console.log( `移动失败，移动的项目名称：${packageName}` );
}

// todo 约定
// 1. 配置 package 的打包命令 需要加上以下命令
//  如：webpack ./build/webpack.config.js && node ../../move-dists/index.js --packageName pack1
//  {build command} && node ../../move-dists/index.js --packageName {packageName}