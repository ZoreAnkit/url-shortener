import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "./stores/AuthStore";

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("./components/Login.vue"),
    },
    {
        path: "/",
        name: "landing",
        exact: true,
        component: () => import("../src/components/Landing.vue"),
        meta: {
            breadcrumb: [{ label: "Login" }],
            authRequired: true,
        },
    },
    {
        path: "/package",
        name: "package",
        exact: true,
        component: () => import("../src/components/Package.vue"),
        meta: {
            breadcrumb: [{ label: "Package" }],
            authRequired: true,
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    },
});

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
    const authStore = useAuthStore();
    // Check if auth is required on this route
    // (including nested routes).
    const authRequired = routeTo.matched.some((route) => route.meta.authRequired);

    // If auth isn't required for the route, just continue.
    if (!authRequired) return next();

    // If auth is required and the user is logged in...
    if (authStore.loggedIn) {
        // Validate the local user token...
        return authStore.validate().then((validUser) => {
            // Then continue if the token still represents a valid user,
            // otherwise redirect to login.
            validUser ? next() : redirectToLogin();
        });
    }

    // If auth is required and the user is NOT currently logged in,
    // redirect to login.
    redirectToLogin();

    function redirectToLogin() {
        // Pass the original route to the login component
        next({ name: "login", query: { redirectFrom: routeTo.fullPath } });
    }
});

export default router;
