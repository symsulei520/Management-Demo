// import Axios from 'axios';

// 暴露开发环境
// export const baseURL = "http://192.168.0.101:8088";
// 暴露生产环境
// export const baseURL = 'http://it.warmtel.com';

// 自动判断是开发环境还是生产环境
// 执行npm run build使用生产环境地址http://it.warmtel.com；执行npm run serve使用开发环境地址http://192.168.0.101:8088
export const baseURL = process.env.NODE_ENV == 'production' ? 'http://it.warmtel.com' : 'http://192.168.0.101:8088';
// 1.创建一个axios实例
const AxiosServe = axios.create({
  baseURL: baseURL,
  timeout: 1000
})

// 2.添加请求拦截器
AxiosServe.interceptors.request.use((request) => {
  // 在发送请求之前打印config
  console.log('请求拦截器', request);

  // 设置token到请求头，发送给服务端
  const token = localStorage.getItem("token");
  console.log("token>>>>>>>>>>>>>>>", token);
  // 判断登录时是否有token，如果有就增加一个请求头
  if (token) {
    // 增加一个名为Authorization的请求头，请求头中参数为token
    //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
    request.headers.common.Authorization = 'Bear' + token;
  }
  return request; // 对config处理完后返回，下一步将向后端发送请求
}, (err) => {
  // 对请求错误做出动作
  return Promise.reject(err);
})

// 3.添加响应拦截器
AxiosServe.interceptors.response.use((response) => {
  // 响应时做什么动作
  console.log('响应拦截器', response);
  return response.data;
}, (err) => {
  // 对响应的错误做什么动作
  return Promise.reject(err);
})
// 4.暴露实例
export default AxiosServe;
