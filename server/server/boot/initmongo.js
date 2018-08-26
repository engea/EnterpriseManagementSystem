/**
 * Created by jiangwei on 2018/8/26.
 * Copyright (c) 2017 (jw872505975@gmail.com). All rights reserved.
 */
'use strict';
const crypto = require("crypto");

module.exports = function (app) {
  var mongoDs = app.dataSources.db;
  mongoDs.automigrate('admin', function (err) {
    if (err) throw err;
    var Admin = app.models.admin;
    const salt = crypto.randomBytes(16).toString("hex");
    const password = encryptPassword(salt, "admin");
    Admin.create([
      {username: 'admin', password: password, salt: salt}
    ], function (err, users) {
      if (err) throw err;
      console.log("init user:", users);
    });
  });
};
function encryptPassword(salt, rawPassword) {
  return crypto.pbkdf2Sync(rawPassword, salt, 20000, 512, "sha512").toString("hex");
}
