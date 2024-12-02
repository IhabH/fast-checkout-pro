<template>
  <div>
    <div class="mb-3">
      <h3 class="mb-0">
        {{ $translate("Ceres::Template.checkoutInvoiceAddress") }}
      </h3>
    </div>
    <div>
      <form ref="invoiceAddressForm">
        <address-input-group
          ref="invoice"
          address-type="1"
          :show-error="showError"
          :optional-address-fields="optionalAddressFields"
          :required-address-fields="requiredAddressFields"
          :default-salutation="defaultSalutation"
          :padding-classes="paddingClasses"
          :padding-inline-styles="paddingInlineStyles"
          :email="email"
          :value="billingAddress"
          @input="onInputChange"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import AddressInputGroup from "ceres/app/components/customer/AddressInputGroup.vue"
import { isNull } from "../../helper/utils"

const ValidationService = require("ceres/app/services/ValidationService")

export default {

    name: "InvoiceAddress",

    components:
    {
        AddressInputGroup
    },

    props: {
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
            currentNotification: null,
            silentTimeout: null,
            billingAddress: {
                countryId: 1,
                stateId: null,
                gender: "male"
            },
            initialValidation: 1
        }
    },

    computed: mapState({
        showError: state => state.checkout.validation.invoiceAddress.showError,
        withDeliveryAddress: state => state.fastCheckout.withDeliveryAddress
    }),

    watch: {
        billingAddress ()
        {
            if (this.showError)
            {
                this.validate()
            }
        },

        withDeliveryAddress: function (newValue, oldValue)
        {
            if (newValue)
            {
                this.$store.dispatch("setShippingCountry", this.billingAddress.countryId)
            }
        }
    },

    created ()
    {
        this.$store.commit("setInvoiceAddressValidator", this.validate)
        this.$store.commit("setInvAddressSilentValidator", this.silentValidation)
    },

    methods:
            {
                async onInputChange (event)
                {
                    this.billingAddress[event.field] = event.value
                    this.billingAddress = Object.assign({}, this.billingAddress)
                    this.$store.commit("setBillingAddress", this.billingAddress)

                    if (event.field === "countryId" && !this.withDeliveryAddress)
                    {
                        await this.$store.dispatch("setShippingCountry", event.value)
                    }

                    if (!isNull(this.silentTimeout)) clearTimeout(this.silentTimeout)

                    this.silentTimeout = setTimeout(() =>
                    {
                        this.$emit("save-addresses")
                    }, 1000)
                },

                silentValidation ()
                {
                    ValidationService.validate(this.$refs.invoiceAddressForm)
                        .done(() =>
                        {
                            this.$store.commit("setInvAddressSilentShowError", false)
                        })
                        .fail(() =>
                        {
                            this.$store.commit("setInvAddressSilentShowError", true)
                        })
                },

                validate ()
                {
                    return new Promise((resolve) =>
                    {
                        ValidationService.validate(this.$refs.invoiceAddressForm)
                            .done(() =>
                            {
                                this.$store.commit("setBillingAddress", this.billingAddress)

                                if (!isNull(this.currentNotification)) this.currentNotification.close()

                                this.$store.commit("setInvoiceAddressShowError", false)

                                resolve(true)
                            })
                            .fail(invalidFields =>
                            {
                                const fieldNames = []

                                for (const field of invalidFields)
                                {
                                    let fieldName = field.lastElementChild.innerHTML.trim()

                                    fieldName = fieldName.slice(-1) === "*" ? fieldName.slice(0, fieldName.length - 1) : fieldName
                                    fieldNames.push(fieldName)
                                }

                                if (this.initialValidation !== 1)
                                {
                                    ValidationService.markInvalidFields(invalidFields, "error")

                                    if (!isNull(this.currentNotification)) this.currentNotification.close()

                                    this.currentNotification = window.CeresNotification.error(
                                        window.ceresTranslate("Ceres::Template.checkoutCheckAddressFormFields", { fields: fieldNames.join(", ") }))
                                }
                                else
                                {
                                    this.initialValidation = 2
                                }

                                this.$store.commit("setInvoiceAddressShowError", true)

                                resolve(false)
                            })
                    })
                }
            }
}
</script>
