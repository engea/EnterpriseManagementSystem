'use strict';
const crypto = require("crypto");
module.exports = function (Admin) {
  Admin.login = function (username, password, cb) {
    Admin.findOne({where: {username: username}}).then((result) => {
      if (!result || !result.username || !result.password || !result.salt) {
        cb(null, 401, "登录失败")
      } else if (result && result.password === encryptPassword(result.salt, password)) {
        // generate token
        const token = crypto.randomBytes(48).toString("hex");
        // return token
        cb(null, 200, "登录成功", token);
      } else {
        cb(null, 401, "登录失败");
      }
    }).catch((err) => {
      console.log("login err:", err);
      cb(null, 401, "登录失败");
    })
  };

  // Admin.addAdmin = function (username, password, cb) {
  //   console.log(username, password);
  //   const salt = crypto.randomBytes(16).toString("hex");
  //   password = encryptPassword(salt, password);
  //   console.log({username, password, salt});
  //   Admin.create({username, password, salt}).then((result) => {
  //     console.log(result);
  //     cb(null, 200, "登录成功");
  //
  //   }).catch((err) => {
  //     console.log("login err:", err);
  //     cb(null, 401, "登录失败");
  //   })
  // };
  Admin.remoteMethod('login', {
    accepts: [{arg: 'username', type: 'string'}, {arg: 'password', type: 'string'}],
    http: {path: '/login', verb: 'post'},
    returns: [{arg: 'code', type: 'number'}, {arg: 'msg', type: 'string'}, {arg: 'token', type: 'string'}]
  });

  // Admin.remoteMethod('addAdmin', {
  //   accepts: [{arg: 'username', type: 'string'}, {arg: 'password', type: 'string'}],
  //   http: {path: '/', verb: 'post'},
  //   returns: [{arg: 'code', type: 'number'}, {arg: 'msg', type: 'string'}]
  // });
};

function encryptPassword(salt, rawPassword) {
  return crypto.pbkdf2Sync(rawPassword, salt, 20000, 512, "sha512").toString("hex");
}
