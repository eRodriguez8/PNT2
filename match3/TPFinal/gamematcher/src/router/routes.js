
const routes = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/matches', component: () => import('pages/MatchesLayout.vue') },
      { path: '/games', component: () => import('pages/GamesLayout.vue') },
      { path: '/users', component: () => import('pages/UsersLayout.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('pages/RegisterLayout.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
