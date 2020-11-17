import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import DropCourses from '../views/DropCourses.vue'
import AllCourses from '../views/AllCourses.vue'
import MyCourses from '../views/MyCourses.vue'
import CreateAccount from '../views/CreateAccount.vue'
import InstructorCourses from '../views/InstructorCourses.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/dropcourses',
        name: 'DropCourses',
        component: DropCourses,
    },
    {
        path: '/allcourses',
        name: 'AllCourses',
        component: AllCourses,
    },
    {
        path: '/mycourses',
        name: 'MyCourses',
        component: MyCourses,
    },
    {
        path: '/instructorcourses',
        name: 'InstructorCourses',
        component: InstructorCourses,
    },
    {
        path: '/createaccount',
        name: 'CreateAccount',
        component: CreateAccount,
    },
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes,
})

export default router
