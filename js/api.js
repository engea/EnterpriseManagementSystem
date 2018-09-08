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

function addMember(member) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${host}/employeeInfos`, type: "POST", data: member, success: function (data) {
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

function delMemberById(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${host}/employeeInfos/${id}`, type: "DELETE", success: function () {
                resolve();
            }, error: function () {
                reject();
            }
        });
    });
}

function getMembers() {
    return getData("/employeeInfos");
}

function getPayrollInfos() {
    return getData("/payrollInfos");
}

function getData(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${host}/${url}`, type: "GET", success: function (data) {
                resolve(data);
            }, error: function (err) {
                reject(err)
            }
        });
    });
}