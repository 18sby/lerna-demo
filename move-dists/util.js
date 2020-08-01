const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

/**
 * 确定此路径存在，不存在即创建
 * @param {string} dir 
 */
function ensureDir(dir) {
  try {
    if (fs.statSync(dir).isDirectory()) {
      fse.ensureDirSync(dir);
    }
  } catch (error) {
    // 报错不需要处理
  }
}

/**
 * 从 source 文件夹移动到 target 文件夹
 * @param {string} source 源文件夹
 * @param {string} target 目标文件夹
 */
function moveToDists(source, target) {
  try {
    let statObj = fs.statSync(source);
    ensureDir(source);
    if (statObj.isFile()) { // 文件 - 理论上不存在这种可能
      fse.moveSync(source, target);
    } else {
      let dirs = fs.readdirSync(source);
      dirs.forEach(dir => {
        let targetDir = path.join(target, dir);
        ensureDir(targetDir);
        fse.moveSync(path.join(source, dir), targetDir);
      })
    }
  } catch (error) {
    console.log( '移动失败，请检查源路径和目标路径是否合法: ', source, target, error );
  }
}

/**
 * 从 source 文件夹复制到 target 文件夹
 * @param {string} source 源文件夹
 * @param {string} target 目标文件夹
 */
function copyToDists(source, target) {
  try {
    let statObj = fs.statSync(source);
    ensureDir(source);
    if (statObj.isFile()) { // 文件 - 理论上不存在这种可能
      fse.copySync(source, target);
    } else {
      let dirs = fs.readdirSync(source);
      dirs.forEach(dir => {
        let targetDir = path.join(target, dir);
        ensureDir(targetDir);
        fse.copySync(path.join(source, dir), targetDir);
      })
    }
  } catch (error) {
    console.log( '复制失败，请检查源路径和目标路径是否合法: ', source, target, error );
  }
}

/**
 * 解析 argv 中的参数
 * @param {Array<string>} keys 需要解析的参数名称
 * @return {Object} 一个 map 对象 { key=>value } 默认为 null
 */
function parseArgv(keys = []) {
  let map = {};
  // 1. 初始化结果数组
  for (let i = 0, len = keys.length; i < len; i++) {
    map[keys[i]] = null;
  }
  // 2. 解析参数，如果有值，放入结果数组中
  let argv = process.argv,
      params = argv.slice(2);
  if (params.length % 2 !== 0) {
    throw new Error('配置 scripts 的脚本，参数和值必须成对出现');
  }
  params.forEach((property, index) => {
    property = property.slice(2)
    if (index % 2 === 0 && property in map) {
      map[property] = params[index+1];
    }
  });
  
  return map;
}

module.exports = {
  parseArgv,
  moveToDists,
  copyToDists
}