import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _10473f19 = () => interopDefault(import('..\\pages\\candidate\\index.vue' /* webpackChunkName: "pages/candidate/index" */))
const _538b55ba = () => interopDefault(import('..\\pages\\Dashboard.vue' /* webpackChunkName: "pages/Dashboard" */))
const _59307030 = () => interopDefault(import('..\\pages\\history\\index.vue' /* webpackChunkName: "pages/history/index" */))
const _042b0f32 = () => interopDefault(import('..\\pages\\item.js' /* webpackChunkName: "pages/item" */))
const _38e15f0f = () => interopDefault(import('..\\pages\\Login.vue' /* webpackChunkName: "pages/Login" */))
const _0df3a926 = () => interopDefault(import('..\\pages\\Register.vue' /* webpackChunkName: "pages/Register" */))
const _ad990b72 = () => interopDefault(import('..\\pages\\templatemail\\index.vue' /* webpackChunkName: "pages/templatemail/index" */))
const _77e06f28 = () => interopDefault(import('..\\pages\\candidate\\add.vue' /* webpackChunkName: "pages/candidate/add" */))
const _76f4538f = () => interopDefault(import('..\\pages\\pages\\Page404.vue' /* webpackChunkName: "pages/pages/Page404" */))
const _a8bb9e68 = () => interopDefault(import('..\\pages\\pages\\Page500.vue' /* webpackChunkName: "pages/pages/Page500" */))
const _41916028 = () => interopDefault(import('..\\pages\\sendmail\\MailInter.vue' /* webpackChunkName: "pages/sendmail/MailInter" */))
const _3531456c = () => interopDefault(import('..\\pages\\sendmail\\MailOffer.vue' /* webpackChunkName: "pages/sendmail/MailOffer" */))
const _1e78ca0c = () => interopDefault(import('..\\pages\\sendmail\\MailThank.vue' /* webpackChunkName: "pages/sendmail/MailThank" */))
const _0944c454 = () => interopDefault(import('..\\pages\\templatemail\\add.vue' /* webpackChunkName: "pages/templatemail/add" */))
const _4307116a = () => interopDefault(import('..\\pages\\widgets\\Widgets.vue' /* webpackChunkName: "pages/widgets/Widgets" */))
const _296816ed = () => interopDefault(import('..\\pages\\widgets\\WidgetsBrand.vue' /* webpackChunkName: "pages/widgets/WidgetsBrand" */))
const _e8b771ca = () => interopDefault(import('..\\pages\\widgets\\WidgetsDropdown.vue' /* webpackChunkName: "pages/widgets/WidgetsDropdown" */))
const _169c33c1 = () => interopDefault(import('..\\pages\\candidate\\_id.vue' /* webpackChunkName: "pages/candidate/_id" */))
const _cbcd3b22 = () => interopDefault(import('..\\pages\\templatemail\\_id.vue' /* webpackChunkName: "pages/templatemail/_id" */))
const _1070c7d0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _10473f19,
    name: "candidate"
  }, {
    path: "/Dashboard",
    component: _538b55ba,
    name: "Dashboard"
  }, {
    path: "/history",
    component: _59307030,
    name: "history"
  }, {
    path: "/item",
    component: _042b0f32,
    name: "item"
  }, {
    path: "/Login",
    component: _38e15f0f,
    name: "Login"
  }, {
    path: "/Register",
    component: _0df3a926,
    name: "Register"
  }, {
    path: "/templatemail",
    component: _ad990b72,
    name: "templatemail"
  }, {
    path: "/candidate/add",
    component: _77e06f28,
    name: "candidate-add"
  }, {
    path: "/pages/Page404",
    component: _76f4538f,
    name: "pages-Page404"
  }, {
    path: "/pages/Page500",
    component: _a8bb9e68,
    name: "pages-Page500"
  }, {
    path: "/sendmail/MailInter",
    component: _41916028,
    name: "sendmail-MailInter"
  }, {
    path: "/sendmail/MailOffer",
    component: _3531456c,
    name: "sendmail-MailOffer"
  }, {
    path: "/sendmail/MailThank",
    component: _1e78ca0c,
    name: "sendmail-MailThank"
  }, {
    path: "/templatemail/add",
    component: _0944c454,
    name: "templatemail-add"
  }, {
    path: "/widgets/Widgets",
    component: _4307116a,
    name: "widgets-Widgets"
  }, {
    path: "/widgets/WidgetsBrand",
    component: _296816ed,
    name: "widgets-WidgetsBrand"
  }, {
    path: "/widgets/WidgetsDropdown",
    component: _e8b771ca,
    name: "widgets-WidgetsDropdown"
  }, {
    path: "/candidate/:id",
    component: _169c33c1,
    name: "candidate-id"
  }, {
    path: "/templatemail/:id",
    component: _cbcd3b22,
    name: "templatemail-id"
  }, {
    path: "/",
    component: _1070c7d0,
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
