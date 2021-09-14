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
        component: Login
    },
    {
        path: "/feed",
        name: "Feed",
        component: Feed
    },
    {
        path: "/confirmationEmailSent",
        name: "ConfirmationEmailSent",
        component: ConfirmationEmailSent
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile
    },
    {
        path: "/events",
        name: "Events",
        component: Events
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings
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
    if ( ( to.name === 'Feed' || to.name === 'Profile' ) && !store.user ) {
        next( { name: 'Login' } );
    } else if ( ( to.name === 'Login' || to.name === 'SignUp' || to.name === 'Landing' ) && store.user ) {
        next( { name: 'Feed' } );
    } else {
        next();
    }
} );

export default router;