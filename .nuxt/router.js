import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _91ecc2f8 = () => interopDefault(import('..\\pages\\candidate\\index.vue' /* webpackChunkName: "pages/candidate/index" */))
const _fdeeaea2 = () => interopDefault(import('..\\pages\\Dashboard.vue' /* webpackChunkName: "pages/Dashboard" */))
const _1b810613 = () => interopDefault(import('..\\pages\\history\\index.vue' /* webpackChunkName: "pages/history/index" */))
const _b9ea0432 = () => interopDefault(import('..\\pages\\item.js' /* webpackChunkName: "pages/item" */))
const _c0ff16f8 = () => interopDefault(import('..\\pages\\Login.vue' /* webpackChunkName: "pages/Login" */))
const _23c825d8 = () => interopDefault(import('..\\pages\\Register.vue' /* webpackChunkName: "pages/Register" */))
const _c2dd4208 = () => interopDefault(import('..\\pages\\templatemail\\index.vue' /* webpackChunkName: "pages/templatemail/index" */))
const _800ca55a = () => interopDefault(import('..\\pages\\candidate\\add.vue' /* webpackChunkName: "pages/candidate/add" */))
const _81e4dc8c = () => interopDefault(import('..\\pages\\pages\\Page404.vue' /* webpackChunkName: "pages/pages/Page404" */))
const _18892212 = () => interopDefault(import('..\\pages\\pages\\Page500.vue' /* webpackChunkName: "pages/pages/Page500" */))
const _56d596be = () => interopDefault(import('..\\pages\\sendmail\\MailInter.vue' /* webpackChunkName: "pages/sendmail/MailInter" */))
const _2a8f2a21 = () => interopDefault(import('..\\pages\\sendmail\\MailOffer.vue' /* webpackChunkName: "pages/sendmail/MailOffer" */))
const _33bd00a2 = () => interopDefault(import('..\\pages\\sendmail\\MailThank.vue' /* webpackChunkName: "pages/sendmail/MailThank" */))
const _2ce72bcb = () => interopDefault(import('..\\pages\\templatemail\\add.vue' /* webpackChunkName: "pages/templatemail/add" */))
const _2c6d1e56 = () => interopDefault(import('..\\pages\\widgets\\Widgets.vue' /* webpackChunkName: "pages/widgets/Widgets" */))
const _3edfa262 = () => interopDefault(import('..\\pages\\widgets\\WidgetsBrand.vue' /* webpackChunkName: "pages/widgets/WidgetsBrand" */))
const _a39be8f4 = () => interopDefault(import('..\\pages\\widgets\\WidgetsDropdown.vue' /* webpackChunkName: "pages/widgets/WidgetsDropdown" */))
const _5eb571ec = () => interopDefault(import('..\\pages\\candidate\\_id.vue' /* webpackChunkName: "pages/candidate/_id" */))
const _68ba1f38 = () => interopDefault(import('..\\pages\\templatemail\\_id.vue' /* webpackChunkName: "pages/templatemail/_id" */))
const _5e66b18d = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/candidate",
    component: _91ecc2f8,
    name: "candidate"
  }, {
    path: "/Dashboard",
    component: _fdeeaea2,
    name: "Dashboard"
  }, {
    path: "/history",
    component: _1b810613,
    name: "history"
  }, {
    path: "/item",
    component: _b9ea0432,
    name: "item"
  }, {
    path: "/Login",
    component: _c0ff16f8,
    name: "Login"
  }, {
    path: "/Register",
    component: _23c825d8,
    name: "Register"
  }, {
    path: "/templatemail",
    component: _c2dd4208,
    name: "templatemail"
  }, {
    path: "/candidate/add",
    component: _800ca55a,
    name: "candidate-add"
  }, {
    path: "/pages/Page404",
    component: _81e4dc8c,
    name: "pages-Page404"
  }, {
    path: "/pages/Page500",
    component: _18892212,
    name: "pages-Page500"
  }, {
    path: "/sendmail/MailInter",
    component: _56d596be,
    name: "sendmail-MailInter"
  }, {
    path: "/sendmail/MailOffer",
    component: _2a8f2a21,
    name: "sendmail-MailOffer"
  }, {
    path: "/sendmail/MailThank",
    component: _33bd00a2,
    name: "sendmail-MailThank"
  }, {
    path: "/templatemail/add",
    component: _2ce72bcb,
    name: "templatemail-add"
  }, {
    path: "/widgets/Widgets",
    component: _2c6d1e56,
    name: "widgets-Widgets"
  }, {
    path: "/widgets/WidgetsBrand",
    component: _3edfa262,
    name: "widgets-WidgetsBrand"
  }, {
    path: "/widgets/WidgetsDropdown",
    component: _a39be8f4,
    name: "widgets-WidgetsDropdown"
  }, {
    path: "/candidate/:id",
    component: _5eb571ec,
    name: "candidate-id"
  }, {
    path: "/templatemail/:id",
    component: _68ba1f38,
    name: "templatemail-id"
  }, {
    path: "/",
    component: _5e66b18d,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
