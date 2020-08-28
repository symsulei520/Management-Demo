// 封装持久化本地存储的localstore对象
// localStorage的使用
// localStorage.setItem(key,value)：将value存储到key字段
// localStorage.getItem(key):获取指定key本地存储的值
// localStorage.removeItem(key):将localStorage中的某个值删除

// 1.将localStorage的key字段定义成固定变量名
let USER_KEY = 'user_key';

// 2.封装添加用户信息的方法
const SaveUserLocal = function (user) { // 参数user为外部传入的json对象
//  一般我们会将JSON存入localStorage中，但是在localStorage会自动将localStorage转换成为字符串形式
// 这个时候我们可以使用JSON.stringify()这个方法，来将JSON转换成为JSON字符串
  const userStr = JSON.stringify(user); // 将json对象转为json字符串并赋值
  localStorage.setItem(USER_KEY, userStr); // 将转换为json字符串的外部传入的值 存储到USER_KEY中
}
// 3.封装获取用户信息的方法
const GetUserLocal = function () {
  const userStr = localStorage.getItem(USER_KEY); // 取出指定key的本地存储的值并赋值
  // 判断获取到的值是否存在
  if (userStr) {
    return JSON.parse(userStr); // 将取出的json字符串转换为json对象 并返回
  } else {
    return null;
  }
}

// 4.封装删除用户信息的方法
const RemoveUserLocal = function () {
  localStorage.removeItem(USER_KEY); // 删除指定key本地存储的值 
}
// 暴露方法
export {
  SaveUserLocal,
  GetUserLocal,
  RemoveUserLocal
}
