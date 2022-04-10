import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _90f7ca0a = () => interopDefault(import('..\\pages\\candidate\\index.vue' /* webpackChunkName: "pages/candidate/index" */))
const _121c14ee = () => interopDefault(import('..\\pages\\charts\\index.js' /* webpackChunkName: "pages/charts/index" */))
const _14f197d0 = () => interopDefault(import('..\\pages\\Dashboard.vue' /* webpackChunkName: "pages/Dashboard" */))
const _aae3976c = () => interopDefault(import('..\\pages\\history\\index.vue' /* webpackChunkName: "pages/history/index" */))
const _4e8c8c10 = () => interopDefault(import('..\\pages\\item.js' /* webpackChunkName: "pages/item" */))
const _70d71c6d = () => interopDefault(import('..\\pages\\Login.vue' /* webpackChunkName: "pages/Login" */))
const _1706094f = () => interopDefault(import('..\\pages\\Register.vue' /* webpackChunkName: "pages/Register" */))
const _4c6b7b25 = () => interopDefault(import('..\\pages\\templatemail\\index.vue' /* webpackChunkName: "pages/templatemail/index" */))
const _4f06db8a = () => interopDefault(import('..\\pages\\candidate\\add.vue' /* webpackChunkName: "pages/candidate/add" */))
const _39c622b3 = () => interopDefault(import('..\\pages\\charts\\CChartBarExample.vue' /* webpackChunkName: "pages/charts/CChartBarExample" */))
const _44d9dd79 = () => interopDefault(import('..\\pages\\charts\\CChartBarSimple.vue' /* webpackChunkName: "pages/charts/CChartBarSimple" */))
const _36b69a5c = () => interopDefault(import('..\\pages\\charts\\CChartDoughnutExample.vue' /* webpackChunkName: "pages/charts/CChartDoughnutExample" */))
const _656d85ac = () => interopDefault(import('..\\pages\\charts\\CChartLineExample.vue' /* webpackChunkName: "pages/charts/CChartLineExample" */))
const _51de1822 = () => interopDefault(import('..\\pages\\charts\\CChartLineSimple.vue' /* webpackChunkName: "pages/charts/CChartLineSimple" */))
const _b80c10cc = () => interopDefault(import('..\\pages\\charts\\CChartPieExample.vue' /* webpackChunkName: "pages/charts/CChartPieExample" */))
const _28fe204a = () => interopDefault(import('..\\pages\\charts\\CChartPolarAreaExample.vue' /* webpackChunkName: "pages/charts/CChartPolarAreaExample" */))
const _249464e0 = () => interopDefault(import('..\\pages\\charts\\CChartRadarExample.vue' /* webpackChunkName: "pages/charts/CChartRadarExample" */))
const _98572154 = () => interopDefault(import('..\\pages\\charts\\Charts.vue' /* webpackChunkName: "pages/charts/Charts" */))
const _45b8e874 = () => interopDefault(import('..\\pages\\charts\\MainChartExample.vue' /* webpackChunkName: "pages/charts/MainChartExample" */))
const _4e1abff1 = () => interopDefault(import('..\\pages\\pages\\Page404.vue' /* webpackChunkName: "pages/pages/Page404" */))
const _fa6ec5a4 = () => interopDefault(import('..\\pages\\pages\\Page500.vue' /* webpackChunkName: "pages/pages/Page500" */))
const _fb215e6c = () => interopDefault(import('..\\pages\\sendmail\\MailInter.vue' /* webpackChunkName: "pages/sendmail/MailInter" */))
const _4f2d736c = () => interopDefault(import('..\\pages\\sendmail\\MailOffer.vue' /* webpackChunkName: "pages/sendmail/MailOffer" */))
const _d808c850 = () => interopDefault(import('..\\pages\\sendmail\\MailThank.vue' /* webpackChunkName: "pages/sendmail/MailThank" */))
const _3bbc3e34 = () => interopDefault(import('..\\pages\\templatemail\\add.vue' /* webpackChunkName: "pages/templatemail/add" */))
const _2b782568 = () => interopDefault(import('..\\pages\\widgets\\Widgets.vue' /* webpackChunkName: "pages/widgets/Widgets" */))
const _42b94f6a = () => interopDefault(import('..\\pages\\widgets\\WidgetsBrand.vue' /* webpackChunkName: "pages/widgets/WidgetsBrand" */))
const _b37fbe06 = () => interopDefault(import('..\\pages\\widgets\\WidgetsDropdown.vue' /* webpackChunkName: "pages/widgets/WidgetsDropdown" */))
const _247abfba = () => interopDefault(import('..\\pages\\candidate\\_id.vue' /* webpackChunkName: "pages/candidate/_id" */))
const _4b0ffa66 = () => interopDefault(import('..\\pages\\templatemail\\_id.vue' /* webpackChunkName: "pages/templatemail/_id" */))
const _2fbd5976 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _90f7ca0a,
    name: "candidate"
  }, {
    path: "/charts",
    component: _121c14ee,
    name: "charts"
  }, {
    path: "/Dashboard",
    component: _14f197d0,
    name: "Dashboard"
  }, {
    path: "/history",
    component: _aae3976c,
    name: "history"
  }, {
    path: "/item",
    component: _4e8c8c10,
    name: "item"
  }, {
    path: "/Login",
    component: _70d71c6d,
    name: "Login"
  }, {
    path: "/Register",
    component: _1706094f,
    name: "Register"
  }, {
    path: "/templatemail",
    component: _4c6b7b25,
    name: "templatemail"
  }, {
    path: "/candidate/add",
    component: _4f06db8a,
    name: "candidate-add"
  }, {
    path: "/charts/CChartBarExample",
    component: _39c622b3,
    name: "charts-CChartBarExample"
  }, {
    path: "/charts/CChartBarSimple",
    component: _44d9dd79,
    name: "charts-CChartBarSimple"
  }, {
    path: "/charts/CChartDoughnutExample",
    component: _36b69a5c,
    name: "charts-CChartDoughnutExample"
  }, {
    path: "/charts/CChartLineExample",
    component: _656d85ac,
    name: "charts-CChartLineExample"
  }, {
    path: "/charts/CChartLineSimple",
    component: _51de1822,
    name: "charts-CChartLineSimple"
  }, {
    path: "/charts/CChartPieExample",
    component: _b80c10cc,
    name: "charts-CChartPieExample"
  }, {
    path: "/charts/CChartPolarAreaExample",
    component: _28fe204a,
    name: "charts-CChartPolarAreaExample"
  }, {
    path: "/charts/CChartRadarExample",
    component: _249464e0,
    name: "charts-CChartRadarExample"
  }, {
    path: "/charts/Charts",
    component: _98572154,
    name: "charts-Charts"
  }, {
    path: "/charts/MainChartExample",
    component: _45b8e874,
    name: "charts-MainChartExample"
  }, {
    path: "/pages/Page404",
    component: _4e1abff1,
    name: "pages-Page404"
  }, {
    path: "/pages/Page500",
    component: _fa6ec5a4,
    name: "pages-Page500"
  }, {
    path: "/sendmail/MailInter",
    component: _fb215e6c,
    name: "sendmail-MailInter"
  }, {
    path: "/sendmail/MailOffer",
    component: _4f2d736c,
    name: "sendmail-MailOffer"
  }, {
    path: "/sendmail/MailThank",
    component: _d808c850,
    name: "sendmail-MailThank"
  }, {
    path: "/templatemail/add",
    component: _3bbc3e34,
    name: "templatemail-add"
  }, {
    path: "/widgets/Widgets",
    component: _2b782568,
    name: "widgets-Widgets"
  }, {
    path: "/widgets/WidgetsBrand",
    component: _42b94f6a,
    name: "widgets-WidgetsBrand"
  }, {
    path: "/widgets/WidgetsDropdown",
    component: _b37fbe06,
    name: "widgets-WidgetsDropdown"
  }, {
    path: "/candidate/:id",
    component: _247abfba,
    name: "candidate-id"
  }, {
    path: "/templatemail/:id",
    component: _4b0ffa66,
    name: "templatemail-id"
  }, {
    path: "/",
    component: _2fbd5976,
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
