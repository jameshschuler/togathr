import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NotFound from "../components/NotFound.vue";
import ConfirmationEmailSent from "../views/ConfirmationEmailSent.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";

const routes: Array<RouteRecordRaw> = [ {
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