/**
 * Created by jiangwei on 2018/9/8.
 * Copyright (c) 2017 (jw872505975@gmail.com). All rights reserved.
 */
const storage = window.localStorage;
console.log(typeof storage["token"]);
if(!storage["token"]){
  location.href ="/login";
}
