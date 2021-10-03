import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NotFound from "../components/NotFound.vue";
import ConfirmationEmailSent from "../pages/ConfirmationEmailSent.vue";
import Events from "../pages/Events.vue";
import EventDetail from '../pages/events/EventDetail.vue';
import NewEvent from '../pages/events/NewEvent.vue';
import Feed from '../pages/Feed.vue';
import Landing from '../pages/Landing.vue';
import Login from "../pages/Login.vue";
import Profile from "../pages/Profile.vue";
import Settings from "../pages/Settings.vue";
import SignUp from "../pages/SignUp.vue";
import VerifyMagicEmailLink from '../pages/VerifyMagicEmailLink.vue';
import { store } from '../store';

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