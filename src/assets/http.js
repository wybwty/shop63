import axios from 'axios'
const $httpRequst = {}
$httpRequst.install = function(Vue) {
    // 1. 插件核心代码
    // 路由拦截器,在请求发送之前要干的事
    // 添加请求拦截器
    axios.interceptors.request.use(function(config) {
        // 在发送请求之前做些什么
        // 不是登录页就携带token
        console.log(config);
        if (config.url !== 'login') {
            const token = localStorage.getItem('token')
                // console.log(token);
            axios.defaults.headers.common['Authorization'] = token
        }
        return config;
    }, function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 2. 添加实例方法
    Vue.prototype.$http = axios;
}
export default $httpRequst