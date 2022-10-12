// 实现组件的自动注册
import * as filters from '@/filters'
const fn = require.context('./', true, /\.vue$/)
// console.log(fn.keys())
// console.log(fn('./PageTools/index.vue'))

const components = fn.keys().map(ele => {
  return fn(ele)
})
export default (Vue) => {
  components.forEach(ele => {
    // console.log(ele.default)
    Vue.component(ele.default.name, ele.default)
  })
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
