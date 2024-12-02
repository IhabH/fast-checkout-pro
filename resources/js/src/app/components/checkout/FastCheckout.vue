<template>
  <div class="fast-checkout">
    <div
      v-if="!email"
    >
      <div class="card border-0 mb-4">
        <div
          id="guestCard"
          class="card-header border-0 bg-white px-0"
        >
          <div class="h1">
            {{ $translate("FastCheckout::Template.newCustomer") }}
          </div>
        </div>

        <div
          id="collapseGuest"
          aria-labelledby="guestCard"
        >
          <div class="card-body p-0">
            <account-email
              :show-register-note="showRegisterNote"
              :customer-benefits="customerBenefits"
            />
            <invoice-address
              :optional-address-fields="optionalInvoiceAddressFields"
              :required-address-fields="requiredInvoiceAddressFields"
              :default-salutation="defaultSalutation"
              :email="email"
              @save-addresses="saveAddresses"
            />
            <shipping-address
              :is-shop-builder="isShopBuilder"
              :optional-address-fields="optionalShippingAddressFields"
              :required-address-fields="requiredShippingAddressFields"
              :default-salutation="defaultSalutation"
              :email="email"
              @save-addresses="saveAddresses"
            />
          </div>
        </div>
      </div>
      <div
        id="customerCardAction"
        class="accordion"
      >
        <div
          :class="{'border-bottom mb-4 h-auto': showLoginCard, 'border-0': !showLoginCard}"
          class="card"
        >
          <div
            id="loginCard"
            class="card-header border-bottom-0 bg-white"
          >
            <h1 class="mb-0">
              <button
                class="btn btn-link position-relative btn-block d-block text-left px-1 collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseLogin"
                aria-expanded="true"
                aria-controls="collapseLogin"
              >
                {{ $translate("FastCheckout::Template.alreadyCustomer") }}
              </button>
            </h1>
          </div>

          <div
            id="collapseLogin"
            class="collapse"
            aria-labelledby="loginCard"
            data-parent="#customerCardAction"
          >
            <div class="card-body px-3">
              <login />
            </div>
          </div>
        </div>

        <div
          :class="{'border-bottom mb-4 h-auto': showRegisterCard, 'border-0': !showRegisterCard}"
          class="card"
        >
          <div
            id="registerCard"
            class="card-header border-bottom-0 bg-white"
          >
            <h1 class="mb-0">
              <button
                class="btn btn-link position-relative btn-block d-block text-left px-1 collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseRegister"
                aria-expanded="true"
                aria-controls="collapseRegister"
              >
                {{ $translate("FastCheckout::Template.registerMe") }}
              </button>
            </h1>
          </div>

          <div
            id="collapseRegister"
            class="collapse"
            aria-labelledby="registerCard"
            data-parent="#customerCardAction"
          >
            <div class="card-body px-3">
              <registration :is-simple-registration="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <slot name="addresses" />
    </div>
  </div>
</template>

<script>
import loadFastCheckoutModule from "../../helper/loadFastCheckoutModule"
import AccountEmail from "../account/AccountEmail.vue"
import ShippingAddress from "../addresses/ShippingAddress.vue"
import InvoiceAddress from "../addresses/InvoiceAddress.vue"
import { isNull } from "../../helper/utils"
import { mapState } from "vuex"

export default {

    name: "FastCheckout",

    components: {
        AccountEmail,
        InvoiceAddress,
        ShippingAddress
    },

    mixins: [loadFastCheckoutModule],

    props: {
        isShopBuilder: {
            type: Boolean,
            default: false
        },
        optionalInvoiceAddressFields: {
            type: Object,
            default: () =>
            {
                return {}
            }
        },
        requiredInvoiceAddressFields: {
            type: Object,
            default: () =>
            {
                return {}
            }
        },
        optionalShippingAddressFields: {
            type: Object,
            default: () =>
            {
                return {}
            }
        },
        requiredShippingAddressFields: {
            type: Object,
            default: () =>
            {
                return {}
            }
        },
        defaultSalutation: {
            type: String,
            default: App.config.addresses.defaultSalutation
        },
        email: {
            type: String,
            default: null
        },
        showRegisterNote: {
            type: Boolean,
            default: true
        },
        customerBenefits: {
            type: Array,
            default: () =>
            {
                return []
            }
        },
        isLoggedIn: {
            type: Boolean,
            default: true
        }
    },

    data ()
    {
        return {
            guestOpen: true,
            loginOpen: false,
            registerOpen: false,
            currentNotification: null
        }
    },

    computed: {
        showLoginCard ()
        {
            if (this.$store.state.fastCheckout.showLoginCard)
            {
                $("#collapseLogin").collapse("show")
            }

            return this.$store.state.fastCheckout.showLoginCard
        },
        showRegisterCard ()
        {
            if (this.$store.state.fastCheckout.showRegisterCard)
            {
                $("#collapseRegister").collapse("show")
            }

            return this.$store.state.fastCheckout.showRegisterCard
        },
        ...mapState({
            showError: state => state.checkout.validation.gtc.showError,
            checkoutValidation: state => state.checkout.validation,
            silentValidation: state => state.fastCheckout.validation,
            username: state => state.fastCheckout.username,
            billingAddress: state => state.fastCheckout.billingAddress,
            deliveryAddress: state => state.fastCheckout.deliveryAddress,
            withDeliveryAddress: state => state.fastCheckout.withDeliveryAddress,
            userData: state => state.user.userData
        })
    },

    created ()
    {
        this.$store.commit("setGtcValidator", this.validate)

        this.initCollapseEventListener()
    },

    methods:
        {
            async saveAddresses ()
            {
                this.silentValidation.username.validate()

                if (this.silentValidation.invoiceAddress.validate)
                {
                    await this.silentValidation.invoiceAddress.validate()
                }

                if (this.withDeliveryAddress && this.silentValidation.deliveryAddress.validate)
                {
                    await this.silentValidation.deliveryAddress.validate()
                }

                if (!this.silentValidation.username.showError && ((!this.silentValidation.invoiceAddress.showError && !this.withDeliveryAddress) ||
                (this.withDeliveryAddress && !this.silentValidation.deliveryAddress.showError && !this.silentValidation.invoiceAddress.showError)))
                {
                    await this.$store.dispatch("registerContact", { withDeliveryAddress: this.withDeliveryAddress })
                }
            },

            async validate ()
            {
                let isValid = true

                if (this.checkGuestCollapseOpen())
                {
                    for (const index in this.checkoutValidation)
                    {
                        if (index !== "gtc" && this.checkoutValidation[index].validate)
                        {
                            this.checkoutValidation[index].validate()

                            if (this.checkoutValidation[index].showError)
                            {
                                isValid = false
                                this.$store.commit("setGtcShowError", true)
                            }
                        }
                    }
                    if (isValid)
                    {
                        this.$store.commit("setGtcShowError", false)
                    }
                }
                else
                {
                    this.$store.commit("setGtcShowError", true)
                }
            },

            checkGuestCollapseOpen ()
            {
                if (!isNull(this.currentNotification)) this.currentNotification.close()

                if ((this.loginOpen || this.registerOpen))
                {
                    this.currentNotification = window.CeresNotification.warn(
                        window.ceresTranslate("FastCheckout::Template.fillOneData"))

                    return false
                }

                return true
            },

            initCollapseEventListener ()
            {
                Vue.nextTick(() =>
                {
                    const collapseLogin = $("#collapseLogin")
                    const collapseRegister = $("#collapseRegister")
                    const collapseGuest = $("#collapseGuest")

                    collapseLogin.on("shown.bs.collapse", () =>
                    {
                        this.loginOpen = true
                        this.scrollTo(collapseLogin)
                    })

                    collapseRegister.on("shown.bs.collapse", () =>
                    {
                        this.registerOpen = true
                        this.scrollTo(collapseRegister)
                    })

                    collapseLogin.on("hidden.bs.collapse", () =>
                    {
                        this.loginOpen = false
                        this.scrollTo(collapseGuest)
                    })

                    collapseRegister.on("hidden.bs.collapse", () =>
                    {
                        this.registerOpen = false
                        this.scrollTo(collapseGuest)
                    })
                })
            },

            toggleCollapsedClass ()
            {
                $("#guestCollapseBtn").toggleClass("collapsed")
            },

            scrollTo (element)
            {
                $("html").animate(
                    {
                        scrollTop: element.offset().top - 100
                    },
                    800
                )
            }
        }
}
</script>
