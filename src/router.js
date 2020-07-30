import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'auth' },
      component: () => import('./views/Login.vue')
    },
    {
      path: '/',
      name: 'home',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/Home.vue')
    },
    {
      path: '/search',
      name: 'search',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/Search.vue')
    },
    {
      path: '/chats',
      name: 'chats',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/Chats.vue')
    },
    {
      path: '/chats/:id',
      name: 'chat',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/SingleChat.vue')
    },
    {
      path: '/channels',
      name: 'channels',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/Channels.vue')
    },
    {
      path: '/channels/:id',
      name: 'channel',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/SingleChannel.vue')
    },
    {
      path: '/users',
      name: 'users',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/Users.vue')
    },
    {
      path: '/users/:id',
      name: 'user',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/SingleUser.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { layout: 'main', auth: true },
      component: () => import('./views/Settings.vue')
    },
    {
      path: '*',
      name: 'error',
      meta: { layout: 'error', auth: true },
      component: () => import('./layouts/ErrorLayout.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuth = store.getters.isAuthenticated
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !isAuth) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
