import router from './router'
import store from './store'
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  // console.log(to)
  // console.log(from)
  // next(false)
  // 1.判断token是否存在
  // 1.1 存在处于登录状态，是否去往登录页 处于去取首页， 否则放行
  // 1.2 不存在 不处于登录状态  去往页面  是否处于白名单  处于则放行  否则登录页

  if (store.getters.token) {
    console.log(store.getters.userId)
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
