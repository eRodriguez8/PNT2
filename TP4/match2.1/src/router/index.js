import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Matches from '../components/Matches'

export default new Router({
    routes: [{
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/matches',
            component: Matches
        }
    ]
})