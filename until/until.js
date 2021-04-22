const MD5 = require('crypto-js/md5');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const key = fs.readFileSync(path.join(__dirname, "key.exe"), "utf8");

// MD5加密
function getPwdByMD5(data) {
    return MD5(data + key).toString();
}
// 服务器响应返回
function Msg(status, msg, data) {
    return status === 200 ? { status, msg, data } : { status, msg }
};
// 检验输入是否有效
function outData(data) {
    return data === undefined || data === null || data === 'undefined' || data === 'null' || data === '' ? false : true;
};
// 生成token--加密
function getTokenByObj(obj) {
    return jwt.sign(obj, key, {
        expiresIn: "5d"
    });
};
// 解密token
function getObjByToken(token) {
    return jwt.verify(token, key);
};
// 判断数据是否加载成功
function getData(err, data, str) {
    if (!err) {
        if (data.length > 0) {
            return Msg(200, `${str}`, data);
        } else {
            return Msg(201, '暂无数据');
        }
    } else {
        return Msg(201, `${str}数据获取失败,请联系管理员`);
    }
};

module.exports = {
    getPwdByMD5,
    Msg,
    outData,
    getTokenByObj,
    getObjByToken,
    getData,
};