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

function addMember(data) {
  return addData("/employeeInfos", data);
}

function addZhiwei(data) {
  return addData("/titleInfos", data);
}

function addPayroll(data) {
  return addData("/payrollInfos", data);
}

function addDepartment(data) {
  return addData("/departmentalInfos", data);
}

function addData(url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${host}${url}`, type: "POST", data: data, success: function (data) {
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
  return delDataById("/employeeInfos", id)
}

function delPayrollById(id) {
  return delDataById("/payrollInfos", id)
}

function delTitleById(id) {
  return delDataById("/titleInfos", id)
}

function delBumenById(id) {
  return delDataById("/departmentalInfos", id)
}

function delDataById(url, id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${host}${url}/${id}`, type: "DELETE", success: function () {
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

function getTitles() {
  return getData("/titleInfos");
}

function getPayrollInfos(year, no) {
  if (!year && !no) {
    return getData("/payrollInfos");
  } else {
    let filter = {where: {}};
    if (year) {
      filter.where.year = year;
    }
    if (no && no !== "0") {
      filter.where.no = no;
    }
    return getData("/payrollInfos", JSON.stringify(filter));
  }


}

function getDepartmentalInfos() {
  return getData("/departmentalInfos");

}

function getData(url, condition) {
  return new Promise((resolve, reject) => {
    let r = `${host}${url}`;
    if (condition) {
      r += `?filter=${condition}`;
    }
    console.log(r);
    $.ajax({
      url: r, type: "GET", success: function (data) {
        resolve(data);
      }, error: function (err) {
        reject(err)
      }
    });
  });
}