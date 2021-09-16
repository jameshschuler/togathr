import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NotFound from "../components/NotFound.vue";
import { store } from '../store';
import ConfirmationEmailSent from "../views/ConfirmationEmailSent.vue";
import Events from "../views/Events.vue";
import Feed from '../views/Feed.vue';
import Landing from '../views/Landing.vue';
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Settings from "../views/Settings.vue";
import SignUp from "../views/SignUp.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Landing',
        component: Landing,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/feed",
        name: "Feed",
        component: Feed,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/confirmationEmailSent",
        name: "ConfirmationEmailSent",
        component: ConfirmationEmailSent,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/events",
        name: "Events",
        component: Events,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    } ];

const router = createRouter( {
    history: createWebHistory(),
    routes
} );

router.beforeEach( ( to, from, next ) => {
    const user = store.user;
    const requiresAuth = to.matched.some( record => record.meta.requiresAuth );

    if ( requiresAuth && user === null ) {
        next( { name: 'Login' } );
    }
    else {
        if ( to.name === 'Landing' || to.name === 'Login' || to.name === 'SignUp' ) {
            next( { name: 'Feed' } );
            return;
        }

        next();
    }
} );

export default router;