import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NotFound from "../components/NotFound.vue";
import ConfirmationEmailSent from "../views/ConfirmationEmailSent.vue";
import Feed from '../views/Feed.vue';
import Landing from '../views/Landing.vue';
import Login from "../views/Login.vue";
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
        path: "/:catchAll(.*)",
        component: NotFound,
    } ];

const router = createRouter( {
    history: createWebHistory(),
    routes
} );

export default router;