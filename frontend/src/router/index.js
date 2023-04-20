import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/author/myBook/:user_id',
    name: 'authorBook',
    component: () => import('../views/AuthorBook.vue')
  },
  {
    path: '/novel/createNovel/:user_id',
    name: 'createNovel',
    component: () => import('../views/Novel/CreateNovel.vue')
  },
  {
    path: '/novel/chapter/:novel_id',
    name: 'chapterNovel',
    component: () => import('../views/Novel/Chapter/Chapter.vue')
  },
  {
    path: '/novel/chapter/showChapter/:chapter_id/:novel_id',
    name: 'chapterDetail',
    component: () => import('../views/Novel/Chapter/ShowChapter.vue')
  },
  {
    path: '/novel/chapter/createChapter/:novel_id',
    name: 'createChapter',
    component: () => import('../views/Novel/Chapter/CreateChapter.vue')
  },
  {
    path: '/novel/:novel_id/chapter/:chapter_id',
    name: 'editChapter',
    component: () => import('../views/Novel/Chapter/EditChapter.vue')
  },
  {
    path: '/novel/:novel_id',
    name: 'editNovel',
    component: () => import('../views/Novel/EditNovel.vue')
  },
  {
    path: '/:user_id',
    name: 'shelfBook',
    component: () => import('../views/ShelfBook.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/user/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  
]

const router = new VueRouter({ routes })

export default router
