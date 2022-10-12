import PageTools from '@/components/PageTools'
const components = [PageTools]

export default
(Vue) => {
  components.forEach(ele => {
    console.log(ele)
    Vue.component(ele.name, ele)
  })
}
