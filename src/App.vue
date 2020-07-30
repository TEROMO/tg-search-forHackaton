<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import ErrorLayout from '@/layouts/ErrorLayout.vue'

export default {
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta.layout || 'error') + '-layout'
    }
  },
  components: {
    AuthLayout,
    MainLayout,
    ErrorLayout
  }
}
</script>

<style></style>
