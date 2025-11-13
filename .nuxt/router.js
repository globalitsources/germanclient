import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _770df190 = () => interopDefault(import('..\\pages\\buchungsanfrage\\index.vue' /* webpackChunkName: "pages/buchungsanfrage/index" */))
const _0ab911f9 = () => interopDefault(import('..\\pages\\buchungsanfrage\\vielen-dank-fuer-ihre-anfrage.vue' /* webpackChunkName: "pages/buchungsanfrage/vielen-dank-fuer-ihre-anfrage" */))
const _09656342 = () => interopDefault(import('..\\pages\\monteurzimmer\\_city\\index.vue' /* webpackChunkName: "pages/monteurzimmer/_city/index" */))
const _0e57d75d = () => interopDefault(import('..\\pages\\monteurzimmer\\_city\\indexBAK.vue' /* webpackChunkName: "pages/monteurzimmer/_city/indexBAK" */))
const _510419ba = () => interopDefault(import('..\\pages\\monteurzimmer\\_city\\_id\\_apartment.vue' /* webpackChunkName: "pages/monteurzimmer/_city/_id/_apartment" */))
const _da8a9848 = () => interopDefault(import('..\\node_modules\\nuxt-typo3\\lib\\pages\\_.vue' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/buchungsanfrage",
    component: _770df190,
    name: "buchungsanfrage"
  }, {
    path: "/buchungsanfrage/vielen-dank-fuer-ihre-anfrage",
    component: _0ab911f9,
    name: "buchungsanfrage-vielen-dank-fuer-ihre-anfrage"
  }, {
    path: "/monteurzimmer/:city",
    component: _09656342,
    name: "monteurzimmer-city"
  }, {
    path: "/monteurzimmer/:city?/indexBAK",
    component: _0e57d75d,
    name: "monteurzimmer-city-indexBAK"
  }, {
    path: "/monteurzimmer/:city?/:id/:apartment?",
    component: _510419ba,
    name: "monteurzimmer-city-id-apartment"
  }, {
    path: "/*",
    component: _da8a9848,
    name: "page"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
