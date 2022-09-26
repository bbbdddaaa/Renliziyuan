export const imgerror = {
  // 什么时候  去换图片地址
  // onerror
  inserted(el, binding, vnode) {
    console.log(el)
    console.log(binding)
    console.log(vnode)
    el.onerror = function() {
      el.src = binding.value
    }
  }
}
