const Vue = window.Vue

Vue.component("FastCheckout", () => import("./app/components/checkout/FastCheckout.vue"))
Vue.component("QuickRegistration", () => import("./app/components/account/QuickRegistration.vue"))
