import router from './router';
// 全局导航守卫封装
router.beforeEach((to, from, next) => {
  // 判断路由跳转时，每一项路由数组的meta json对象中key值requiresAuth是否不为真
  // 判断成立，表示需要执行统一登录认证
  if (to.matched.some(item => !item.meta.requiresAuth)) {
    // 统一登录认证,将在localstore中永久存储的token令牌取出赋值给自定义的token
    const token = localStorage.getItem("token");
    if (token) {
      next(); // 放行
    } else {
      next({
        path: '/Login'
      });
    }
  } else {
    next(); // 直接放行
  }
})

