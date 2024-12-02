<template>
  <form
    ref="accountForm"
    class="w-100 mb-4"
    autocomplete="on"
  >
    <div class="row">
      <div class="col-sm-12">
        <div
          class="input-unit mb-2"
          data-validate="mail"
        >
          <input
            :id="'email'+_uid"
            v-model="username"
            data-testing="mail-register"
            type="email"
            name="email"
            autocomplete="email"
            @change="onUserNameChange($event)"
          >
          <label :for="'email'+_uid">
            {{ $translate("Ceres::Template.regEmail") }}*
          </label>
        </div>
        <div
          v-if="showDuplicateMailMsg"
          class="my-2"
        >
          <div
            class="d-block alert alert-warning shadow-none border-right border-top border-bottom border-warning p-2"
          >
            <div class="d-flex align-items-center justify-content-between">
              <span>{{ $translate("FastCheckout::Template.emailAlreadyExist") }}</span>
              <a
                class="btn btn-primary btn-appearance"
                href="#"
                @click.prevent="goToLogin"
              >
                {{ $translate("FastCheckout::Template.loginNow") }}
              </a>
            </div>
          </div>
        </div>
        <div
          v-if="!showDuplicateMailMsg && showRegisterNote"
          class="my-2"
        >
          <div class="d-flex align-items-center">
            <a
              href="#"
              @click.prevent="goToRegister()"
            >{{
              $translate("FastCheckout::Template.createAccount")
            }}</a>
            <popper
              v-if="customerFilteredBenefits.length > 0"
              v-cloak
              trigger="focus"
            >
              <template #handle>
                <button
                  class="btn btn-sm"
                  type="button"
                >
                  <i class="fa fa-info-circle" />
                </button>
              </template>
              <template #content>
                <ul class="fa-ul my-2">
                  <li
                    v-for="(benefit, index) in customerBenefits"
                    :key="'b' + index"
                    class="mb-1"
                  >
                    <i class="fa fa-check fa-li" />
                    {{ benefit }}
                  </li>
                </ul>
              </template>
            </popper>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex"
import ValidationService from "Ceres/resources/js/src/app/services/ValidationService"
import { isNull } from "../../helper/utils"

export default {

    name: "AccountEmail",

    props: {
        template: String,
        email: {
            type: String,
            default: ""
        },
        showRegisterNote: {
            type: Boolean,
            default: true
        },
        customerBenefits: {
            type: Array,
            default: () => []
        }
    },

    data ()
    {
        return {
            username            : "",
            currentTimeout      : null,
            showDuplicateMailMsg: false,
            currentNotification : null
        }
    },

    computed: {
        customerFilteredBenefits ()
        {
            return this.customerBenefits.filter(benefit => benefit !== "")
        },
        ...mapState({
            showError: state => state.checkout.validation.account.showError
        })

    },

    watch:
    {
        username ()
        {
            if (this.showError)
            {
                this.validate()
            }
        }
    },

    created ()
    {
        this.$store.commit("addDynamicCheckoutValidator",
            { name: "account", validator: this.validate })

        this.$store.commit("setUsernameSilentValidator", this.silentValidation)

        this.username = this.email
    },

    methods:
        {
            onUserNameChange (event)
            {
                this.username = event.target.value
                this.$store.commit("setUserName", this.username)

                if (!isNull(this.currentTimeout)) clearTimeout(this.currentTimeout)

                setTimeout(() =>
                {
                    this.checkEmail()
                }, 800)
            },

            goToLogin ()
            {
                this.loadComponent("login-modal")

                $(".login-pwd-reset input[type='email']")
                    .trigger("focus").val(this.username)

                document.querySelector(".login-pwd-reset input[type='email']")
                    .dispatchEvent(new Event("input", { bubbles: true }))
            },

            goToRegister ()
            {
                this.loadComponent("register-modal")
            },

            silentValidation ()
            {
                ValidationService.validate(this.$refs.accountForm)
                    .done(() =>
                    {
                        this.$store.commit("setUsernameSilentShowError", false)
                    })
                    .fail(() =>
                    {
                        this.$store.commit("setUsernameSilentShowError", true)
                    })
            },

            validate ()
            {
                return new Promise((resolve) =>
                {
                    ValidationService.validate(this.$refs.accountForm)
                        .done(() =>
                        {
                            if (!isNull(this.currentNotification)) this.currentNotification.close()

                            this.$store.commit("setDynamicCheckoutShowError",
                                { name: "account", showError: false })

                            resolve(true)
                        })
                        .fail(invalidFields =>
                        {
                            this.$store.commit("setDynamicCheckoutShowError",
                                { name: "account", showError: true })

                            const fieldNames = []

                            for (const field of invalidFields)
                            {
                                let fieldName = field.lastElementChild.innerHTML.trim()

                                fieldName = fieldName.slice(-1) === "*" ? fieldName.slice(0, fieldName.length - 1) : fieldName
                                fieldNames.push(fieldName)
                            }

                            if (fieldNames.length > 0)
                            {
                                if (!isNull(this.currentNotification)) this.currentNotification.close()

                                this.currentNotification = window.CeresNotification.error(
                                    window.ceresTranslate("Ceres::Template.checkoutCheckAddressFormFields", { fields: fieldNames.join(", ") })
                                )
                            }

                            ValidationService.markInvalidFields(invalidFields, "error")

                            resolve(false)
                        })
                })
            },

            checkEmail ()
            {
                if (/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(this.username))
                {
                    $.ajax({
                        type: "GET",
                        url: "/rest/fast/checkout/email",
                        data: { email: this.username },
                        dataType: "json",
                        success: (response) =>
                        {
                            this.setDuplicateEmailStatus(response.email)
                        },
                        error: (jqXHR, textStatus, errorThrown) =>
                        {
                            console.log("Fehler beim überprüfen der E-Mail")
                        }
                    })
                }
                else
                {
                    this.setDuplicateEmailStatus(false)
                    this.$store.commit("toggleShowLogin", false)
                }
            },

            setDuplicateEmailStatus (status)
            {
                this.showDuplicateMailMsg = status
                this.$emit("save-addresses")
            },

            ...mapActions([
                "loadComponent"
            ])
        }
}
</script>
