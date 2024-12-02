import FastCheckoutModule from "../store/FastCheckoutModule"

export default {
    created ()
    {
        if (!this.$store.hasModule("fastCheckout") && !App.isSSR)
        {
            this.$store.registerModule("fastCheckout", FastCheckoutModule, { preserveState: !!this.$store.state.fastCheckout })
        }
    }
}
