NewBBS Chrome Plugin 开发规范
=============================

模块定义
-----------------------------
* 检测模块
* 发送模块
* 存储模块
* 通知模块

模块定义例子
-----------------------------

  var Newbbs = Newbbs || {};
  Newbbs.storage = (function(storage){
    var set = function(key, value){
      storage.setItem(key, JSON.stringify(value));
    };
    var get = function(key){
      return JSON.parse(storage.getItem(key));
    };
    var remove = function(key){
      storage.removeItem(key);
    };
    var clear = function(key){
      storage.clear();
    };
    return {
      set : set,
      get : get,
      remove : remove,
      clear : clear
    }
  })(window.localStorage)
