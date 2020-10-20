import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import DropCourses from '../views/DropCourses.vue'
import AllCourses from '../views/AllCourses.vue'
import InstructorCourses from '../views/InstructorCourses.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/dropcourses',
        name: 'DropCourses',
        component: DropCourses
    },
    {
        path: '/allcourses',
        name: 'AllCourses',
        component: AllCourses
    },
    {
        path: '/instructorcourses',
        name: 'InstructorCourses',
        component: InstructorCourses
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
