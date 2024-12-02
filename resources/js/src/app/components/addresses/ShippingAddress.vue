<template>
  <div>
    <div class="form-check mt-1 mb-4">
      <input
        id="diffAddress"
        type="checkbox"
        class="form-check-input"
        :value="showAddressForm"
        @change="toggleAddressForm()"
      >
      <label
        for="diffAddress"
        class="form-check-label"
      >{{
        $translate("FastCheckout::Template.diffDeliveryAddress") }}</label>
    </div>
    <div>
      <div
        id="shippingAddressCollapse"
        class="collapse"
        :class="{'show': isShopBuilder}"
      >
        <div class="card card-body border-0 p-0">
          <div class="mb-3">
            <h3 class="mb-0">
              {{ $translate("Ceres::Template.checkoutShippingAddress") }}
            </h3>
          </div>
          <div>
            <form ref="deliveryAddressForm">
              <address-input-group
                ref="shipping"
                address-type="2"
                :show-error="showError"
                :optional-address-fields="optionalAddressFields"
                :required-address-fields="requiredAddressFields"
                :default-salutation="defaultSalutation"
                :padding-classes="paddingClasses"
                :padding-inline-styles="paddingInlineStyles"
                :email="email"
                :value="deliveryAddress"
                @input="onInputChange"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import AddressInputGroup from "ceres/app/components/customer/AddressInputGroup.vue"
import { isNull } from "../../helper/utils"

const ValidationService = require("ceres/app/services/ValidationService")

export default {

    name: "ShippingAddress",

    components:
        {
            AddressInputGroup
        },

    props: {
        isShopBuilder: {
            type: Boolean,
            default: false
        },
        optionalAddressFields:
        {
            type: Object,
            default: () =>
            {
                return {}
            }
        },
        requiredAddressFields:
        {
            type: Object,
            default: () =>
            {
                return {}
            }
        },
        defaultSalutation:
        {
            type: String,
            default: App.config.addresses.defaultSalutation
        },
        hasToValidate:
        {
            type: Boolean,
            default: false
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        },
        email: String
    },

    data ()
    {
        return {
            showAddressForm: this.isShopBuilder,
            currentNotification: null,
            silentTimeout: null,
            deliveryAddress: {
                countryId: 1,
                stateId: null,
                gender: App.config.addresses.defaultSalutation
            }
        }
    },

    computed: mapState({
        showError: state => state.checkout.validation.deliveryAddress.showError,
        billingAddress: state => state.fastCheckout.billingAddress
    }),

    watch:
    {
        deliveryAddress ()
        {
            if (this.showError)
            {
                this.validate()
            }
        }
    },

    /**
     * Initialise the event listener
     */
    created ()
    {
        this.$store.commit("setDeliveryAddressValidator", this.validate)
        this.$store.commit("setDeliAddressSilentValidator", this.silentValidation)

        if (this.isShopBuilder)
        {
            this.toggleAddressForm()
        }
    },

    methods:
        {
            async onInputChange (event)
            {
                this.deliveryAddress[event.field] = event.value
                this.deliveryAddress = Object.assign({}, this.deliveryAddress)
                this.$store.commit("setDeliveryAddress", this.deliveryAddress)

                if (event.field === "countryId")
                {
                    await this.$store.dispatch("setShippingCountry", event.value)
                }

                if (!isNull(this.silentTimeout)) clearTimeout(this.silentTimeout)

                this.silentTimeout = setTimeout(() =>
                {
                    this.$emit("save-addresses")
                }, 1000)
            },

            toggleAddressForm ()
            {
                this.showAddressForm = !this.showAddressForm
                this.$store.commit("setWithDeliveryAddress", this.showAddressForm)
                this.toggleCountryIdByAddress()
                $("#shippingAddressCollapse").collapse("toggle")
            },

            toggleCountryIdByAddress ()
            {
                const countryId = this.showAddressForm ? this.deliveryAddress.countryId : this.billingAddress.countryId

                this.$store.commit("setShippingCountryId", countryId)
            },

            silentValidation ()
            {
                ValidationService.validate(this.$refs.deliveryAddressForm)
                    .done(() =>
                    {
                        this.$store.commit("setDeliAddressSilentShowError", false)
                    })
                    .fail(() =>
                    {
                        this.$store.commit("setDeliAddressSilentShowError", true)
                    })
            },

            validate ()
            {
                return new Promise((resolve) =>
                {
                    ValidationService.validate(this.$refs.deliveryAddressForm)
                        .done(() =>
                        {
                            this.$store.commit("setDeliveryAddress", this.deliveryAddress)

                            if (!isNull(this.currentNotification)) this.currentNotification.close()

                            this.$store.commit("setDeliveryAddressShowError", false)

                            resolve(true)
                        })
                        .fail(invalidFields =>
                        {
                            const fieldNames = []

                            for (const field of invalidFields)
                            {
                                let fieldName = field.lastElementChild.innerHTML.trim()

                                fieldName = fieldName.slice(-1) === "*"
                                    ? fieldName.slice(0, fieldName.length - 1)
                                    : fieldName

                                fieldNames.push(fieldName)
                            }

                            ValidationService.markInvalidFields(invalidFields, "error")

                            if (!isNull(this.currentNotification)) this.currentNotification.close()

                            this.currentNotification = window.CeresNotification.error(
                                window.ceresTranslate("Ceres::Template.checkoutCheckAddressFormFields",
                                    { fields: fieldNames.join(", ") })
                            )

                            this.$store.commit("setDeliveryAddressShowError", true)

                            resolve(false)
                        })
                })
            }
        }
}
</script>
