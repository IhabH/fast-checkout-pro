<template>
  <div
    v-if="!registered"
    ref="registrationForm"
    class="row"
  >
    <div class="col-sm-6">
      <div
        ref="passwordInput"
        class="input-unit"
        data-validate="password"
      >
        <popper
          v-cloak
          ref="passwordHint"
          trigger="focus"
          placement="bottom"
        >
          <template #handle>
            <input
              :id="'new-password-' + _uid"
              v-model="password"
              data-testing="password-register"
              type="password"
              name="password"
              autocomplete="new-password"
            >
          </template>

          <template #title>
            <div>
              {{ $translate("Ceres::Template.regPasswordHintTitle") }}
            </div>
          </template>

          <template #content>
            <ul class="pl-3">
              <li>{{ $translate("Ceres::Template.regPasswordHintLength") }}</li>
              <li>{{ $translate("Ceres::Template.regPasswordHintDigit") }}</li>
              <li>{{ $translate("Ceres::Template.regPasswordHintChar") }}</li>
            </ul>
          </template>
        </popper>

        <label :for="'new-password-' + _uid">{{ $translate("Ceres::Template.regPassword") }}*</label>
      </div>
    </div>

    <div class="col-sm-6 input-unit-group">
      <div
        class="input-unit"
        data-validate="ref"
      >
        <input
          :id="'new-password-repeat-' + _uid"
          v-model="passwordRepeat"
          type="password"
          name="password-repeat"
          autocomplete="new-password"
          :data-validate-ref="'#new-password-' + _uid"
          data-testing="repeat-password-register"
        >
        <label :for="'new-password-repeat-' + _uid">{{ $translate("Ceres::Template.regRepeatPassword") }}*</label>
      </div>
    </div>
    <div
      class="col-12 mt-2"
    >
      <button
        :disabled="isDisabled"
        class="btn btn-block btn-appearance btn-primary btn-medium"
        @click="validate"
      >
        {{ $translate("Ceres::Template.regRegister") }}
        <icon
          icon="user-plus"
          class="default-float"
          :loading="isDisabled"
        />
      </button>
    </div>
  </div>
</template>

<script>
import ApiService from "Ceres/resources/js/src/app/services/ApiService"
import { isNullOrUndefined } from "../../helper/utils"
import ValidationService from "Ceres/resources/js/src/app/services/ValidationService"

export default {

    name: "QuickRegistration",

    props: {
        order: Object
    },

    data ()
    {
        return {
            isDisabled: false,
            registered: false,
            password: "",
            passwordRepeat: ""
        }
    },

    methods: {

        /**
       * Send the registration
       */
        sendRegistration (recaptchaToken)
        {
            const addressId = this.getAddressId()

            this.isDisabled = true

            ApiService.post("/rest/fast/checkout/contact", { addressId, password: this.password })
                .done(response =>
                {
                    window.CeresNotification.success(
                        this.$translate("Ceres::Template.regSuccessful")
                    ).closeAfter(3000)

                    this.isDisabled = false
                    this.registered = true
                })
                .fail(() =>
                {
                    window.CeresNotification.error(
                        this.$translate("Ceres::Template.regError")
                    ).closeAfter(10000)

                    this.isDisabled = false
                })
        },

        validate ()
        {
            ValidationService.validate(this.$refs.registrationForm)
                .done(() =>
                {
                    this.sendRegistration()
                }).fail(invalidFields =>
                {
                    if (!isNullOrUndefined(this.$refs.passwordHint) && invalidFields.indexOf(this.$refs.passwordInput) >= 0)
                    {
                        this.$refs.passwordHint.showPopper()
                    }

                    const invalidFieldNames = this.getInvalidFieldNames(invalidFields)

                    if (invalidFieldNames.length > 0)
                    {
                        window.CeresNotification.error(
                            this.$translate("Ceres::Template.checkoutCheckAddressFormFields", { fields: invalidFieldNames.join(", ") })
                        )
                    }

                    ValidationService.markInvalidFields(invalidFields, "error")
                })
        },

        getInvalidFieldNames (invalidFields = [])
        {
            const fieldNames = []

            for (const field of invalidFields)
            {
                let fieldName = field.lastElementChild.innerHTML.trim()

                fieldName = fieldName.slice(-1) === "*" ? fieldName.slice(0, fieldName.length - 1) : fieldName
                fieldNames.push(fieldName)
            }

            return fieldNames
        },

        getAddressId ()
        {
            return this.order.billingAddress.id
        }
    }
}
</script>
