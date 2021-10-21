import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NotFound from "../components/NotFound.vue";
import { store } from '../store';
import ConfirmationEmailSent from "../views/ConfirmationEmailSent.vue";
import EventDetail from '../views/events/EventDetail.vue';
import Events from "../views/events/Events.vue";
import NewEvent from '../views/events/NewEvent.vue';
import Feed from '../views/Feed.vue';
import Landing from '../views/Landing.vue';
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Settings from "../views/Settings.vue";
import SignUp from "../views/SignUp.vue";
import VerifyMagicEmailLink from '../views/VerifyMagicEmailLink.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Landing',
        component: Landing
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp
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
        component: ConfirmationEmailSent
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
        path: "/events/new",
        name: "NewEvent",
        component: NewEvent,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/events/:id/detail",
        name: "EventDetail",
        component: EventDetail,
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
        path: '/verifyMagicEmailLink',
        name: "VerifyMagicEmailLink",
        component: VerifyMagicEmailLink,
    },
    {
        path: "/notfound",
        component: NotFound,
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
        if ( user && ( to.name === 'Landing' || to.name === 'Login' || to.name === 'SignUp' ) ) {
            next( { name: 'Feed' } );
        } else {
            next();
        }
    }
} );

export default router;