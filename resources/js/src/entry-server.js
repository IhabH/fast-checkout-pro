import FastCheckoutModule from "./app/store/FastCheckoutModule"

const Vue = window.Vue

function beforeCreate (context)
{
    Vue.component("FastCheckout", () => import("./app/components/checkout/FastCheckout.vue"))
    Vue.component("QuickRegistration", () => import("./app/components/account/QuickRegistration.vue"))
}

function beforeRender (vueApp)
{
    vueApp.$store.registerModule("fastCheckout", FastCheckoutModule)
}

export { beforeCreate, beforeRender }
