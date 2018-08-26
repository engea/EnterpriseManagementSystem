/**
 * Created by jiangwei on 2018/8/26.
 * Copyright (c) 2017 (jw872505975@gmail.com). All rights reserved.
 */
const host = "http://localhost:3000/api";

function login(username, password) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${host}/admin/login`, type: "POST", data: {username, password}, success: function (data) {
        console.log(data.code);
        if (data.code === 200) {
          resolve(data);
        } else {
          reject(data);
        }
      }
    });
  });

}