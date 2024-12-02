const state = () => ({
    showLoginCard: false,
    showRegisterCard: false,
    username: "",
    billingAddress: {
        countryId: 1,
        stateId: null,
        gender: "male"
    },
    deliveryAddress: {
        countryId: 1,
        stateId: null,
        gender: "male"
    },
    withDeliveryAddress: false,
    duplicateEmail: false,
    validation: {
        username: {
            showError: false,
            validate: null
        },
        invoiceAddress: {
            showError: false,
            validate: null
        },
        deliveryAddress: {
            showError: false,
            validate: null
        }
    }
})

const mutations =
    {
        setUserName (state, username)
        {
            state.username = username
        },

        setBillingAddress (state, billingAddress)
        {
            state.billingAddress = Object.assign({}, billingAddress)
        },

        setUsernameSilentValidator (state, usernameValidator)
        {
            state.validation.username.validate = usernameValidator
        },

        setUsernameSilentShowError (state, showError)
        {
            state.validation.username.showError = showError
        },

        setInvAddressSilentValidator (state, invoiceAddressValidator)
        {
            state.validation.invoiceAddress.validate = invoiceAddressValidator
        },

        setInvAddressSilentShowError (state, showError)
        {
            state.validation.invoiceAddress.showError = showError
        },

        setDeliAddressSilentValidator (state, deliveryAddressValidator)
        {
            state.validation.deliveryAddress.validate = deliveryAddressValidator
        },

        setDeliAddressSilentShowError (state, showError)
        {
            state.validation.deliveryAddress.showError = showError
        },

        setDeliveryAddress (state, deliveryAddress)
        {
            state.deliveryAddress = Object.assign({}, deliveryAddress)
        },

        setWithDeliveryAddress (state, withDeliveryAddress)
        {
            state.withDeliveryAddress = withDeliveryAddress
        },

        setDuplicateEmail (state, duplicateEmail)
        {
            state.duplicateEmail = duplicateEmail
        },

        toggleShowLogin (state, showLoginCard)
        {
            state.showLoginCard = showLoginCard
        },

        toggleShowRegister (state, showRegisterCard)
        {
            state.showRegisterCard = showRegisterCard
        }
    }

const actions =
    {
        setShippingCountry ({ commit, state }, shippingCountryId)
        {
            return new Promise((resolve, reject) =>
            {
                const csrf = (document.getElementById("csrf-token") || {}).value

                commit("setShippingCountryId", shippingCountryId)

                $.ajax({
                    type: "POST",
                    url: "/rest/io/shipping/country",
                    headers: {
                        "X-CSRF-TOKEN": csrf
                    },
                    data: JSON.stringify({ shippingCountryId: shippingCountryId }),
                    dataType: "json",
                    contentType: "application/json",
                    success: (response) =>
                    {
                        resolve(response)
                    },
                    error: (jqXHR, textStatus, errorThrown) =>
                    {
                        resolve(false)
                    }
                })
            })
        },

        registerContact ({ commit, getters, state }, { withDeliveryAddress })
        {
            return new Promise((resolve, reject) =>
            {
                const csrf = (document.getElementById("csrf-token") || {}).value

                const contactData = getters.getContactData(withDeliveryAddress)

                $.ajax({
                    type: "POST",
                    url: "/rest/fast/checkout/register",
                    headers: {
                        "X-CSRF-TOKEN": csrf
                    },
                    data: JSON.stringify(contactData),
                    dataType: "json",
                    contentType: "application/json",
                    success: (response) =>
                    {
                        document.dispatchEvent(new CustomEvent("onSignUpSuccess", { detail: response }))
                        commit("setUserData", contactData)
                        commit("setGtcShowError", false)
                        resolve(true)
                    },
                    error: (jqXHR, textStatus, errorThrown) =>
                    {
                        commit("setGtcShowError", true)
                        resolve(false)
                    }
                })
            })
        }
    }

const getters =
    {
        // LNS1XJ7MS 17166 C2J45WFN3 17168
        getContactData: (state) => (withDeliveryAddress) =>
        {
            const contact = {
                email: state.username,
                billingAddress: { ...state.billingAddress, email: state.username }
            }

            if (state.withDeliveryAddress || withDeliveryAddress)
            {
                contact.deliveryAddress = state.deliveryAddress
            }

            return contact
        }
    }

export default {
    state,
    actions,
    getters,
    mutations
}
