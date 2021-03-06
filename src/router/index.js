import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 我的献血状态
  {
    path: '/myblood',
    component: Layout,
    redirect: '/myblood/index',
    hidden: false,
    children: [
      {
        path: 'MyloodIndex',
        component: () => import('@/views/myblood/index'),
        name: 'MyloodIndex',
        meta: { title: '我的献血', icon: 'skill', noCache: true, roles: ['user'] }
      }
    ]
  },
  // 我的献血详细信息
  {
    path: '/bloodrecord',
    component: Layout,
    redirect: '/bloodrecord/index',
    hidden: false,
    children: [
      {
        path: 'BloodRecordIndex',
        component: () => import('@/views/bloodrecord/index'),
        name: 'BloodRecordIndex',
        meta: { title: '献血信息', icon: 'skill', noCache: true, roles: ['user'] }
      }
    ]
  },
  // 健康自测
  {
    path: '/selftest',
    component: Layout,
    redirect: '/selftest/index',
    hidden: false,
    children: [
      {
        path: 'SelfTestIndex',
        component: () => import('@/views/selftest/index'),
        name: 'SelfTestIndex',
        meta: { title: '健康自测', icon: 'skill', noCache: true, roles: ['user'] }
      }
    ]
  },
  // 预约
  {
    path: '/appointment',
    component: Layout,
    redirect: '/appointment/index',
    hidden: false,
    meta: { title: '预约', icon: 'skill', noCache: true, roles: ['user'] },
    children: [
      {
        path: 'yuyue',
        component: () => import('@/views/appointment/yuyue'),
        name: 'Yuyue',
        meta: { title: '我要预约', icon: 'skill', noCache: true, roles: ['user'] }
      },
      {
        path: 'address',
        component: () => import('@/views/appointment/address'),
        name: 'addressIndex',
        meta: { title: '献血地点查看', icon: 'skill', noCache: true, roles: ['user'] }
      }
    ]
  },

  // 电子献血证
  {
    path: '/zhengming',
    component: Layout,
    redirect: '/zhengming/index',
    hidden: false,
    children: [
      {
        path: 'ZhengmingIndex',
        component: () => import('@/views/zhengming/index'),
        name: 'ZhengmingIndex',
        meta: { title: '献血证', icon: 'skill', noCache: true, roles: ['user'] }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    hidden: true,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
