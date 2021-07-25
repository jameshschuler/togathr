import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NotFound from "../components/NotFound.vue";
import SignUp from "../components/SignUp.vue";

const routes: Array<RouteRecordRaw> = [ {
    path: "/signup",
    name: "SignUp",
    component: SignUp
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