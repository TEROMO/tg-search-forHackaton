export default {
  install(Vue) {
    Vue.prototype.$message = function(title, html) {
      this.$bvToast.toast(html, {
        title,
        variant: 'primary',
        solid: true
      })
    }
    Vue.prototype.$error = function(title, html) {
      this.$bvToast.toast(html, {
        title,
        variant: 'danger',
        solid: true
      })
    }
  }
}
