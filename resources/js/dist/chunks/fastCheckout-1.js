"use strict";
(self["webpackChunkfastcheckout"] = self["webpackChunkfastcheckout"] || []).push([[1],{

/***/ "./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue":
/*!*******************************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddressInputGroup_vue_vue_type_template_id_6c395654__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddressInputGroup.vue?vue&type=template&id=6c395654 */ "./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=template&id=6c395654");
/* harmony import */ var _AddressInputGroup_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddressInputGroup.vue?vue&type=script&lang=js */ "./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=script&lang=js");
/* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AddressInputGroup_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddressInputGroup_vue_vue_type_template_id_6c395654__WEBPACK_IMPORTED_MODULE_0__.render,
  _AddressInputGroup_vue_vue_type_template_id_6c395654__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _SalutationSelect_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SalutationSelect.vue */ "./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue");
/* harmony import */ var _customer_CountrySelect_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../customer/CountrySelect.vue */ "./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue");
/* harmony import */ var _VatId_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VatId.vue */ "./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue");






/* harmony default export */ __webpack_exports__["default"] = ({

    name: "address-input-group",

    components:
    {
        SalutationSelect: _SalutationSelect_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
        CountrySelect: _customer_CountrySelect_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
        VatId: _VatId_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
    },

    props:
    {
        defaultCountry: {
            type: String,
            default: "DE"
        },
        addressType: String,
        modalType: String,
        template: String,
        value: {
            type: Object,
            default()
            {
                return {};
            }
        },
        optionalAddressFields: {
            type: Object,
            default: () =>
            {
                return {
                    de:[],
                    uk:[]
                };
            }
        },
        requiredAddressFields: {
            type: Object,
            default: () =>
            {
                return {
                    de:[],
                    uk:[]
                };
            }
        },
        defaultSalutation: {
            type: String,
            default: App.config.addresses.defaultSalutation
        }
    },

    computed:
    {
        isMyAccount()
        {
            return App.templateType === "my-account";
        },

        isPickupStation()
        {
            return this.value && this.value.address1 === "PACKSTATION" && this.isParcelBoxAvailable;
        },

        isPostOffice()
        {
            return this.value && this.value.address1 === "POSTFILIALE" && this.isPostOfficeAvailable;
        },

        isParcelOrOfficeAvailable()
        {
            return (this.isParcelBoxAvailable || this.isPostOfficeAvailable) && this.selectedCountry && this.selectedCountry.isoCode2 === "DE" && this.addressType === "2";
        },

        ...(0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapState)({
            isParcelBoxAvailable: state => state.checkout.shipping.isParcelBoxAvailable,
            isPostOfficeAvailable: state => state.checkout.shipping.isPostOfficeAvailable
        })
    },

    data()
    {
        return {
            stateList  : [],
            countryLocaleList: ["DE", "GB"],
            localeToShow: this.defaultCountry,
            selectedCountry: null
        };
    },

    methods:
    {
        /**
         * Update the address input group to show.
         * @param shippingCountry
         */
        onSelectedCountryChanged(shippingCountry)
        {
            this.selectedCountry = shippingCountry;
            if (shippingCountry && this.countryLocaleList.indexOf(shippingCountry.isoCode2) >= 0)
            {
                this.localeToShow = shippingCountry.isoCode2;
            }
            else
            {
                this.localeToShow = this.defaultCountry;
            }

            this.emitInputEvent("countryId", shippingCountry.id);

            if (this.isPickupStation || this.isPostOffice)
            {
                this.togglePickupStation(false);
            }
        },

        togglePickupStation(showPickupStation)
        {
            const emitInputs =
                {
                    address1: "",
                    address2: "",
                    address3: "",
                    showPickupStation: showPickupStation
                };

            if (showPickupStation)
            {
                emitInputs.address1 = this.isParcelBoxAvailable ? "PACKSTATION" : "POSTFILIALE";
            }

            for (const input in emitInputs)
            {
                this.emitInputEvent(input, emitInputs[input]);
            }
        },

        /**
         * @param {string} field
         * @param {number} value
         */
        emitInputEvent(field, value)
        {
            this.$emit("input", { field, value });
        },

        isInOptionalFields(locale, key)
        {
            return this.optionalAddressFields[locale].includes(key);
        },

        isInRequiredFields(locale, key)
        {
            return (this.requiredAddressFields && this.requiredAddressFields[locale] && this.requiredAddressFields[locale].includes(key));
        },

        transformTranslation(translationKey, locale, addressKey)
        {
            const translation = this.$translate(translationKey);
            const isRequired = this.isInRequiredFields(locale, addressKey);

            return translation + (isRequired ? "*" : "");
        },

        areNameFieldsShown(locale, keyPrefix)
        {
            const isSalutationActive = this.isInOptionalFields(locale, `${keyPrefix}.salutation`);
            const isContactPersonActive = this.isInOptionalFields(locale, `${keyPrefix}.contactPerson`);
            const isName1Active = this.isInOptionalFields(locale, `${keyPrefix}.name1`);
            const isSelectedSalutationCompany = this.value.gender === "company";

            const condition1 = isSalutationActive && isContactPersonActive && isSelectedSalutationCompany;
            const condition2 = !isSalutationActive && isName1Active && isContactPersonActive;

            return !(condition1 || condition2);
        },

        areNameFieldsRequired(locale, keyPrefix)
        {
            const isSalutationActive = this.isInOptionalFields(locale, `${keyPrefix}.salutation`);
            const isName1Active = this.isInOptionalFields(locale, `${keyPrefix}.name1`);
            const isContactPersonRequired = this.isInRequiredFields(locale, `${keyPrefix}.contactPerson`);
            const isSelectedSalutationCompany = this.value.gender === "company";

            const condition1 = isSalutationActive && !isSelectedSalutationCompany;
            const condition2 = isSalutationActive && isSelectedSalutationCompany && isContactPersonRequired;
            const condition3 = !isSalutationActive && isName1Active && isContactPersonRequired;
            const condition4 = !isSalutationActive && !isName1Active;

            return condition1 || condition2 || condition3 || condition4;
        }
    }
});


/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue":
/*!***************************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CountrySelect_vue_vue_type_template_id_3594079d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CountrySelect.vue?vue&type=template&id=3594079d */ "./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue?vue&type=template&id=3594079d");
/* harmony import */ var _CountrySelect_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CountrySelect.vue?vue&type=script&lang=js */ "./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue?vue&type=script&lang=js");
/* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CountrySelect_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _CountrySelect_vue_vue_type_template_id_3594079d__WEBPACK_IMPORTED_MODULE_0__.render,
  _CountrySelect_vue_vue_type_template_id_3594079d__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_TranslationService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/TranslationService */ "./node_modules/Ceres/resources/js/src/app/services/TranslationService.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper/utils */ "./node_modules/Ceres/resources/js/src/app/helper/utils.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");





/* harmony default export */ __webpack_exports__["default"] = ({

    name: "country-select",

    props:
    {
        selectedCountryId: Number,
        selectedStateId: Number,
        addressType: {
            type: String,
            required: true
        },
        optionalAddressFields: {
            type: Object,
            default: () =>
            {}
        },
        requiredAddressFields: {
            type: Object,
            default: () =>
            {}
        }
    },

    data()
    {
        return {
            stateList  : [],
            selectedCountry: {}
        };
    },

    computed:
    {
        addressKeyPrefix()
        {
            return this.addressType === "1" ? "billing_address." : "delivery_address.";
        },

        optionalFields()
        {
            const iso = this.selectedCountry.isoCode2.toLowerCase();

            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isNullOrUndefined)(this.optionalAddressFields[iso]))
            {
                return this.optionalAddressFields.de;
            }

            return this.optionalAddressFields[iso];
        },

        requiredFields()
        {
            const iso = this.selectedCountry.isoCode2.toLowerCase();

            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isNullOrUndefined)(this.requiredAddressFields[iso]))
            {
                return this.requiredAddressFields.de;
            }

            return this.requiredAddressFields[iso];
        },

        countryList()
        {
            // if it's for a billing address we add every eu country to the list due to legal obligations
            if (this.addressType === "1")
            {
                const activeCountries = this.$store.state.localization.shippingCountries;
                const euCountries = this.$store.state.localization.euShippingCountries;
                const allCountries = [...activeCountries, ...euCountries];

                let combinedCountries = {};
                allCountries.forEach(country => {
                    combinedCountries[country.id] = country;
                });

                combinedCountries = Object.values(combinedCountries);
                combinedCountries = combinedCountries.sort((a, b) => a.currLangName.localeCompare(b.currLangName));

                return combinedCountries;
            }

            return this.$store.state.localization.shippingCountries
        },

        ...(0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapState)({
            shippingCountryId: state => state.localization.shippingCountryId
        })
    },

    /**
     * Get the shipping countries
     */
    created()
    {
        this.updateSelectedCountry();
    },

    methods: {
        /**
         * Method to fire when the country has changed
         */
        countryChanged(value)
        {
            this.$emit("country-changed", this.getCountryById(parseInt(value)) ?? this.countryList[0]);
            this.$emit("state-changed", null);
        },

        /**
         * @param {*} value
         */
        stateChanged(value)
        {
            this.$emit("state-changed", parseInt(value));
        },

        /**
         * @param countryId
         * @returns {*}
         */
        getCountryById(countryId)
        {
            return this.countryList.find(
                function(country)
                {
                    if (country.id === countryId)
                    {
                        return country;
                    }

                    return null;
                });
        },

        updateSelectedCountry()
        {
            const countryId = this.selectedCountryId || this.shippingCountryId;

            this.selectedCountry = this.getCountryById(countryId) ?? this.countryList[0];

            if (this.selectedCountry)
            {
                this.stateList = this.selectedCountry.states || [];
            }

            this.countryChanged(countryId);
        },

        isInOptionalFields(key)
        {
            return this.optionalFields.includes(this.addressKeyPrefix + key);
        },

        isInRequiredFields(key)
        {
            return this.requiredFields.includes(this.addressKeyPrefix + key);
        },

        transformTranslation(translationKey, addressKey)
        {
            const translation = _services_TranslationService__WEBPACK_IMPORTED_MODULE_0__["default"].translate(translationKey);
            const isRequired = this.isInRequiredFields(addressKey);

            return translation + (isRequired ? "*" : "");
        }
    },

    watch: {
        selectedCountryId()
        {
            this.updateSelectedCountry();
        }
    }
});


/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue":
/*!******************************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SalutationSelect_vue_vue_type_template_id_0a026b19__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SalutationSelect.vue?vue&type=template&id=0a026b19 */ "./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=template&id=0a026b19");
/* harmony import */ var _SalutationSelect_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SalutationSelect.vue?vue&type=script&lang=js */ "./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=script&lang=js");
/* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SalutationSelect_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _SalutationSelect_vue_vue_type_template_id_0a026b19__WEBPACK_IMPORTED_MODULE_0__.render,
  _SalutationSelect_vue_vue_type_template_id_0a026b19__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./node_modules/Ceres/resources/js/src/app/helper/utils.js");



/* harmony default export */ __webpack_exports__["default"] = ({

    name: "salutation-select",

    props:
    {
        addressData:
        {
            type: Object,
            required: true
        },
        addressType:
        {
            type: [Number, String],
            default: 1
        },
        enabledAddressFields:
        {
            type: Object,
            default: () => []
        },
        defaultSalutation: {
            type: String,
            default: App.config.addresses.defaultSalutation
        }
    },

    data()
    {
        return {
            salutations: [
                {
                    key: "please select",
                    name: "addressSalutationPleaseSelect"
                },
                {
                    key: "male",
                    name: "addressSalutationMale"
                },
                {
                    key: "female",
                    name: "addressSalutationFemale"
                },
                {
                    key: "diverse",
                    name: "addressSalutationDiverse"
                },
                {
                    key: "company",
                    name: "addressSalutationCompany"
                }
            ]
        };
    },

    computed:
    {
        currentSalutation()
        {
            const countryId = parseInt(this.addressData.countryId) || 1;
            const addressKey = parseInt(this.addressType) === 1 ? "billing_address" : "delivery_address";
            const countryKey = countryId === 12 ? "gb" : "de";

            const salutations = this.salutations.map(salutation =>
            {
                return {
                    key: salutation.key,
                    name: this.$translate("Ceres::Template." + salutation.name)
                };
            });

            if (this.enabledAddressFields[countryKey].includes(`${addressKey}.name1`) || this.enabledAddressFields[countryKey].includes(`${addressKey}.salutation`))
            {
                return salutations;
            }

            return salutations.filter(salutation => salutation.key !== "company" && salutation.key !== "please select");
        }
    },

    /**
     * Get the shipping countries
     */
    created()
    {
        this.$options.template = this.template;

        let selectedSalutation = this.defaultSalutation;

        if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(selectedSalutation))
        {
            selectedSalutation = this.currentSalutation[0].key;
        }

        this.emitInputEvent(selectedSalutation);
    },

    methods:
    {
        emitInputEvent(value)
        {
            const isNewGenderPersonal = this.getIsGenderPersonal(value)
            const isOldGenderPersonal = this.getIsGenderPersonal(this.addressData.gender)
            
            this.$emit("input", { field: "gender", value: value });

            // just reset the input fields, when switching the gender between a personal one and company
            if (isNewGenderPersonal !== isOldGenderPersonal)
            {
                this.$emit("input", { field: "name1", value: "" });
                this.$emit("input", { field: "name2", value: "" });
                this.$emit("input", { field: "name3", value: "" });
                this.$emit("input", { field: "vatNumber", value: "" });
                this.$emit("input", { field: "contactPerson", value: "" });
            }
        },

        checkGenderCompany(gender)
        {
            if (gender === "company")
            {
                return (this.addressData.name1 !== null) || (this.addressData.name1 !== "");
            }
            return true;
        },

        getIsGenderPersonal(gender)
        {
            return ["male", "female", "diverse", "please select"].includes(gender);
        }
    },

    watch:
    {
        currentSalutation(newVal, oldVal)
        {
            if (newVal !== oldVal)
            {
                const selectedSalutation = this.addressData.gender;

                // cleanse the current selected salutation, if it's not longer included in the choice
                if (!newVal.map(salutation => salutation.key).includes(selectedSalutation))
                {
                    this.emitInputEvent(newVal[0].key);
                }
            }
        }
    }
});


/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue":
/*!*******************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VatId_vue_vue_type_template_id_dc9c08e2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VatId.vue?vue&type=template&id=dc9c08e2 */ "./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue?vue&type=template&id=dc9c08e2");
/* harmony import */ var _VatId_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VatId.vue?vue&type=script&lang=js */ "./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue?vue&type=script&lang=js");
/* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VatId_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _VatId_vue_vue_type_template_id_dc9c08e2__WEBPACK_IMPORTED_MODULE_0__.render,
  _VatId_vue_vue_type_template_id_dc9c08e2__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "vat-id",

    props:
    {
        selectedCountryId: Number,
        value: String,
        isRequired: Boolean,
        showInput: Boolean
    },

    data()
    {
        return {
            vatNumber: "",
            vatPrefix: "",
            isPrefixValid: false
        }
    },

    computed:
    {
        vatCodes()
        {
            this.vatPrefix = this.selectedCountry?.vatCodes && this.selectedCountry?.vatCodes[0] ? this.selectedCountry.vatCodes[0] : "";
            return this.selectedCountry?.vatCodes ? this.selectedCountry.vatCodes : [];
        },

        isEU()
        {
            return this.vatCodes?.length > 0;
        },

        selectedCountry()
        {
            return this.$store.state.localization.shippingCountries.find(country => country.id === this.selectedCountryId);
        }
    },

    watch:
    {
        value(newValue)
        {
            this.setValues(newValue);
        },

        showInput()
        {
            if (!this.showInput)
            {
                this.deleteValue();
            }
        },

        vatNumber()
        {
            this.emitChange();
        },

        vatPrefix()
        {
          this.emitChange();
        }
    },

    created()
    {
        this.setValues(this.value);
    },

    methods:
    {
        transformTranslation(translationKey)
        {
            const translation = this.$translate(translationKey);
            return translation + (this.isRequired ? "*" : "");
        },

        deleteValue()
        {
            this.vatNumber = "";
            this.vatPrefix = this.selectedCountry?.vatCodes && this.selectedCountry?.vatCodes[0] ? this.selectedCountry.vatCodes[0] : "";
        },

        emitChange()
        {
            const value = !!this.vatNumber ? this.vatPrefix + this.vatNumber : "";
            this.$emit('input', value);
        },

        setValues(value)
        {
            const vatPrefix = this.getVatPrefix(value);
            this.isPrefixValid = !!vatPrefix;

            if (this.isPrefixValid)
            {
                this.vatPrefix = vatPrefix;
                this.vatNumber = value.slice(vatPrefix.length);
            }
            else
            {
                this.vatNumber = value;
            }
        },

        /**
         * @param value
         * @returns {string} - Returns the best matching vat code
         */
        getVatPrefix(value)
        {
            let result = "";

            this.vatCodes?.forEach(vatCode => {
                if (value.startsWith(vatCode) && vatCode.length > result.length) {
                    result = vatCode;
                }
            });

            return result;
        }
    }
});


/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_loader_lib_index_js_vue_loader_options_AddressInputGroup_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../vue-loader/lib/index.js??vue-loader-options!./AddressInputGroup.vue?vue&type=script&lang=js */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=script&lang=js");
 /* harmony default export */ __webpack_exports__["default"] = (_vue_loader_lib_index_js_vue_loader_options_AddressInputGroup_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_loader_lib_index_js_vue_loader_options_CountrySelect_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../vue-loader/lib/index.js??vue-loader-options!./CountrySelect.vue?vue&type=script&lang=js */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue?vue&type=script&lang=js");
 /* harmony default export */ __webpack_exports__["default"] = (_vue_loader_lib_index_js_vue_loader_options_CountrySelect_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_loader_lib_index_js_vue_loader_options_SalutationSelect_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../vue-loader/lib/index.js??vue-loader-options!./SalutationSelect.vue?vue&type=script&lang=js */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=script&lang=js");
 /* harmony default export */ __webpack_exports__["default"] = (_vue_loader_lib_index_js_vue_loader_options_SalutationSelect_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_loader_lib_index_js_vue_loader_options_VatId_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../vue-loader/lib/index.js??vue-loader-options!./VatId.vue?vue&type=script&lang=js */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue?vue&type=script&lang=js");
 /* harmony default export */ __webpack_exports__["default"] = (_vue_loader_lib_index_js_vue_loader_options_VatId_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=template&id=6c395654":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=template&id=6c395654 ***!
  \*************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_vue_loader_lib_index_js_vue_loader_options_AddressInputGroup_vue_vue_type_template_id_6c395654__WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_vue_loader_lib_index_js_vue_loader_options_AddressInputGroup_vue_vue_type_template_id_6c395654__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_vue_loader_lib_index_js_vue_loader_options_AddressInputGroup_vue_vue_type_template_id_6c395654__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../../vue-loader/lib/index.js??vue-loader-options!./AddressInputGroup.vue?vue&type=template&id=6c395654 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=template&id=6c395654");


/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue?vue&type=template&id=3594079d":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue?vue&type=template&id=3594079d ***!
  \*********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_vue_loader_lib_index_js_vue_loader_options_CountrySelect_vue_vue_type_template_id_3594079d__WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_vue_loader_lib_index_js_vue_loader_options_CountrySelect_vue_vue_type_template_id_3594079d__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_vue_loader_lib_index_js_vue_loader_options_CountrySelect_vue_vue_type_template_id_3594079d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../../vue-loader/lib/index.js??vue-loader-options!./CountrySelect.vue?vue&type=template&id=3594079d */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue?vue&type=template&id=3594079d");


/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=template&id=0a026b19":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=template&id=0a026b19 ***!
  \************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_vue_loader_lib_index_js_vue_loader_options_SalutationSelect_vue_vue_type_template_id_0a026b19__WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_vue_loader_lib_index_js_vue_loader_options_SalutationSelect_vue_vue_type_template_id_0a026b19__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_vue_loader_lib_index_js_vue_loader_options_SalutationSelect_vue_vue_type_template_id_0a026b19__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../../vue-loader/lib/index.js??vue-loader-options!./SalutationSelect.vue?vue&type=template&id=0a026b19 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=template&id=0a026b19");


/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue?vue&type=template&id=dc9c08e2":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue?vue&type=template&id=dc9c08e2 ***!
  \*************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_vue_loader_lib_index_js_vue_loader_options_VatId_vue_vue_type_template_id_dc9c08e2__WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_vue_loader_lib_index_js_vue_loader_options_VatId_vue_vue_type_template_id_dc9c08e2__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_vue_loader_lib_index_js_vue_loader_options_VatId_vue_vue_type_template_id_dc9c08e2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../../vue-loader/lib/index.js??vue-loader-options!./VatId.vue?vue&type=template&id=dc9c08e2 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue?vue&type=template&id=dc9c08e2");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=template&id=6c395654":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=template&id=6c395654 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; },
/* harmony export */   staticRenderFns: function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    { staticClass: "row" },
    [
      _vm.value.showPickupStation &&
      _vm.selectedCountry.isoCode2 === "DE" &&
      _vm.addressType === "2"
        ? [
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "delivery_address.salutation")
                  ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: _vm.isInRequiredFields(
                                "de",
                                "delivery_address.salutation"
                              ),
                              expression:
                                "isInRequiredFields('de', 'delivery_address.salutation')",
                            },
                          ],
                          staticClass: "input-unit",
                        },
                        [
                          _c("salutation-select", {
                            attrs: {
                              id: "txtSalutation" + _vm._uid,
                              "address-type": _vm.addressType,
                              "address-data": _vm.value,
                              "enabled-address-fields":
                                _vm.optionalAddressFields,
                            },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  $event.field,
                                  $event.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtSalutation" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressSalutation",
                                      "de",
                                      "delivery_address.salutation"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                (_vm.isInOptionalFields("de", "delivery_address.salutation") &&
                  _vm.value.gender === "company") ||
                (_vm.isInOptionalFields("de", "delivery_address.name1") &&
                  !_vm.isInOptionalFields("de", "delivery_address.salutation"))
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          staticClass: "input-unit",
                          attrs: {
                            "data-model": "name1",
                            "data-validate": "text",
                          },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "company",
                              id: "txtCompany" + _vm._uid,
                              "data-testing": "packing-station-de-company",
                            },
                            domProps: { value: _vm.value.name1 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "name1",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtCompany" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressCompany"
                                  )
                                ) + "*"
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c(
                "div",
                { staticClass: "row" },
                [
                  _vm.isInOptionalFields("de", "delivery_address.title")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.title"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.title')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "title" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "title",
                                id: "txtTitle" + _vm._uid,
                              },
                              domProps: { value: _vm.value.title },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "title",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTitle" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTitle",
                                        "de",
                                        "delivery_address.title"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.areNameFieldsShown("de", "delivery_address")
                    ? [
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('de', 'delivery_address')",
                                  arg: "text",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name2" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "firstName",
                                  id: "txtFirstName" + _vm._uid,
                                  "data-testing":
                                    "packing-station-de-firstname",
                                },
                                domProps: { value: _vm.value.name2 },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "name2",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtFirstName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressFirstName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e(),
                                ],
                                2
                              ),
                            ]
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('de', 'delivery_address')",
                                  arg: "text",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name3" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "lastName",
                                  id: "txtLastName" + _vm._uid,
                                  "data-testing": "packing-station-de-lastname",
                                },
                                domProps: { value: _vm.value.name3 },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "name3",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtLastName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressLastName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e(),
                                ],
                                2
                              ),
                            ]
                          ),
                        ]),
                      ]
                    : _c("div", { staticClass: "col-12 col-sm-8" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.contactPerson"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.contactPerson')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "contactPerson" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "lastName",
                                id: "txtContactPerson" + _vm._uid,
                              },
                              domProps: { value: _vm.value.contactPerson },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "contactPerson",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtContactPerson" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressContactPerson",
                                        "de",
                                        "delivery_address.contactPerson"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]),
                  _vm._v(" "),
                  _vm.isInOptionalFields("de", "delivery_address.name4")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.name4"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.name4')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "name4" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "decorateName",
                                id: "txtAdditionalName" + _vm._uid,
                              },
                              domProps: { value: _vm.value.name4 },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "name4",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              {
                                attrs: { for: "txtAdditionalName" + _vm._uid },
                              },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressAdditionalName",
                                        "de",
                                        "delivery_address.name4"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isInOptionalFields("de", "delivery_address.phoneNumber")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.phoneNumber"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.phoneNumber')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "telephone" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "telephone",
                                id: "txtTelephone" + _vm._uid,
                              },
                              domProps: { value: _vm.value.telephone },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "telephone",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTelephone" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTelephone",
                                        "de",
                                        "delivery_address.phoneNumber"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                ],
                2
              ),
            ]),
            _vm._v(" "),
            _vm.isParcelOrOfficeAvailable
              ? _c("div", { staticClass: "col-12" }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-12" }, [
                      _c("input", {
                        attrs: {
                          type: "checkbox",
                          name: "togglePickup",
                          id: "showPickup" + _vm._uid,
                        },
                        domProps: { checked: _vm.value.showPickupStation },
                        on: {
                          change: function ($event) {
                            return _vm.togglePickupStation(
                              $event.target.checked
                            )
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "showPickup" + _vm._uid } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.addressToPickupStation"
                            )
                          )
                        ),
                      ]),
                    ]),
                  ]),
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-12 col-sm-8" }, [
                  _c(
                    "div",
                    {
                      staticClass: "input-unit",
                      attrs: { "data-validate": "", "data-model": "address1" },
                    },
                    [
                      _c(
                        "select",
                        {
                          staticClass: "custom-select",
                          attrs: { id: "address1" + _vm._uid },
                          domProps: { value: _vm.value.address1 },
                          on: {
                            change: function ($event) {
                              return _vm.emitInputEvent(
                                "address1",
                                $event.target.value
                              )
                            },
                          },
                        },
                        [
                          _vm.isParcelBoxAvailable
                            ? _c(
                                "option",
                                {
                                  attrs: { value: "PACKSTATION" },
                                  domProps: { selected: _vm.isPickupStation },
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressPackingStation"
                                      )
                                    )
                                  ),
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.isPostOfficeAvailable
                            ? _c(
                                "option",
                                {
                                  attrs: { value: "POSTFILIALE" },
                                  domProps: { selected: _vm.isPostOffice },
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressPostOffice"
                                      )
                                    )
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ]
                      ),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "'address1' + _uid" } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.addressPickupLocation"
                            )
                          )
                        ),
                      ]),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-12 col-sm-4" }, [
                  _c(
                    "div",
                    {
                      staticClass: "input-unit",
                      attrs: {
                        "data-validate": "text",
                        "data-model": "address2",
                      },
                    },
                    [
                      _c("input", {
                        attrs: {
                          type: "text",
                          name: "housenumber",
                          autocomplete: "address-line2",
                          id: "txtNumber" + _vm._uid,
                        },
                        domProps: { value: _vm.value.address2 },
                        on: {
                          input: function ($event) {
                            return _vm.emitInputEvent(
                              "address2",
                              $event.target.value
                            )
                          },
                        },
                      }),
                      _vm._v(" "),
                      _vm.isPickupStation
                        ? _c(
                            "label",
                            { attrs: { for: "txtNumber" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressPackingStationNumber"
                                  )
                                ) + "*"
                              ),
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isPostOffice
                        ? _c(
                            "label",
                            { attrs: { for: "txtNumber" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressPostOfficeNumber"
                                  )
                                ) + "*"
                              ),
                            ]
                          )
                        : _vm._e(),
                    ]
                  ),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-12 col-sm-6" }, [
                  _c(
                    "div",
                    {
                      staticClass: "input-unit",
                      attrs: {
                        "data-validate": "text",
                        "data-model": "postNumber",
                      },
                    },
                    [
                      _c("input", {
                        attrs: {
                          type: "text",
                          name: "postnumber",
                          id: "postnumber" + _vm._uid,
                          "data-testing": "packing-station-de-postnumber",
                        },
                        domProps: { value: _vm.value.postNumber },
                        on: {
                          input: function ($event) {
                            return _vm.emitInputEvent(
                              "postNumber",
                              $event.target.value
                            )
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "postnumber" + _vm._uid } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate("Ceres::Template.addressPostNummer")
                          ) + "*"
                        ),
                      ]),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _vm.isInOptionalFields("de", "delivery_address.address4")
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "delivery_address.address4"
                              ),
                              expression:
                                "isInRequiredFields('de', 'delivery_address.address4')",
                              arg: "text",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address4" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "decorateAddress",
                              id: "decorateAddress1" + _vm._uid,
                            },
                            domProps: { value: _vm.value.address4 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "address4",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress1" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressAdditionalAddress2",
                                      "de",
                                      "delivery_address.address4"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: {
                    "data-validate": "text",
                    "data-model": "postalCode",
                  },
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "zip",
                      id: "txtZip" + _vm._uid,
                      "data-testing": "packing-station-de-postalcode",
                    },
                    domProps: { value: _vm.value.postalCode },
                    on: {
                      input: function ($event) {
                        return _vm.emitInputEvent(
                          "postalCode",
                          $event.target.value
                        )
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtZip" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressZip")) + "*"
                    ),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "town" },
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "town",
                      id: "txtPlace" + _vm._uid,
                      "data-testing": "packing-station-de-town",
                    },
                    domProps: { value: _vm.value.town },
                    on: {
                      input: function ($event) {
                        return _vm.emitInputEvent("town", $event.target.value)
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtPlace" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressPlace")) +
                        "*"
                    ),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12 col-sm-4",
                attrs: { "data-testing": "address-country-select" },
              },
              [
                _c("country-select", {
                  attrs: {
                    "selected-country-id": _vm.value.countryId,
                    "selected-state-id": _vm.value.stateId,
                    "address-type": _vm.addressType,
                    "optional-address-fields": _vm.optionalAddressFields,
                    "required-address-fields": _vm.requiredAddressFields,
                  },
                  on: {
                    "country-changed": function ($event) {
                      return _vm.onSelectedCountryChanged($event)
                    },
                    "state-changed": function ($event) {
                      return _vm.emitInputEvent("stateId", $event)
                    },
                  },
                }),
              ],
              1
            ),
            _vm._v(" "),
            _vm._t("custom-address-fields"),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("hr", { staticClass: "mt-0" }),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "delivery_address.email")
                  ? _c("div", { staticClass: "col-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:mail",
                              value: _vm.isInOptionalFields(
                                "de",
                                "delivery_address.email"
                              ),
                              expression:
                                "isInOptionalFields('de', 'delivery_address.email')",
                              arg: "mail",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "email" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "email",
                              name: "email",
                              id: "email" + _vm._uid,
                              "data-testing": "packing-station-de-email-input",
                            },
                            domProps: { value: _vm.value.email },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "email",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "email" + _vm._uid } }, [
                            _vm._v(
                              _vm._s(
                                _vm.transformTranslation(
                                  "Ceres::Template.addressMail",
                                  "de",
                                  "delivery_address.email"
                                )
                              )
                            ),
                          ]),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
          ]
        : _vm.localeToShow == "DE" && _vm.addressType === "1"
        ? [
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "billing_address.salutation")
                  ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: _vm.isInRequiredFields(
                                "de",
                                "billing_address.salutation"
                              ),
                              expression:
                                "isInRequiredFields('de', 'billing_address.salutation')",
                            },
                          ],
                          staticClass: "input-unit",
                        },
                        [
                          _c("salutation-select", {
                            attrs: {
                              id: "txtSalutation" + _vm._uid,
                              "address-type": _vm.addressType,
                              "address-data": _vm.value,
                              "enabled-address-fields":
                                _vm.optionalAddressFields,
                              "default-salutation": _vm.defaultSalutation,
                            },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  $event.field,
                                  $event.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtSalutation" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressSalutation",
                                      "de",
                                      "billing_address.salutation"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                (_vm.isInOptionalFields("de", "billing_address.salutation") &&
                  _vm.value.gender === "company") ||
                (_vm.isInOptionalFields("de", "billing_address.name1") &&
                  !_vm.isInOptionalFields("de", "billing_address.salutation"))
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          staticClass: "input-unit",
                          attrs: {
                            "data-validate": "text",
                            "data-model": "name1",
                          },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "company",
                              id: "txtCompany" + _vm._uid,
                              "data-autofocus": "",
                              "data-testing": "billing-address-de-company",
                            },
                            domProps: { value: _vm.value.name1 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "name1",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtCompany" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressCompany"
                                  )
                                ) + "*"
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "col-12 col-sm-6" },
                  [
                    _c("vat-id", {
                      attrs: {
                        "is-required": _vm.isInRequiredFields(
                          "de",
                          "billing_address.vatNumber"
                        ),
                        "selected-country-id": _vm.value.countryId,
                        value: _vm.value.vatNumber || "",
                        "show-input":
                          (_vm.isInOptionalFields(
                            "de",
                            "billing_address.salutation"
                          ) &&
                            _vm.value.gender === "company" &&
                            _vm.isInOptionalFields(
                              "de",
                              "billing_address.vatNumber"
                            )) ||
                          (!_vm.isInOptionalFields(
                            "de",
                            "billing_address.salutation"
                          ) &&
                            _vm.isInOptionalFields(
                              "de",
                              "billing_address.name1"
                            ) &&
                            _vm.isInOptionalFields(
                              "de",
                              "billing_address.vatNumber"
                            )),
                      },
                      on: {
                        input: function ($event) {
                          return _vm.emitInputEvent("vatNumber", $event)
                        },
                      },
                    }),
                  ],
                  1
                ),
              ]),
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12",
                attrs: { "data-testing": "billing-address-de-name-inputs" },
              },
              [
                _c(
                  "div",
                  { staticClass: "row" },
                  [
                    _vm.isInOptionalFields("de", "billing_address.title")
                      ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.isInRequiredFields(
                                    "de",
                                    "billing_address.title"
                                  ),
                                  expression:
                                    "isInRequiredFields('de', 'billing_address.title')",
                                  arg: "text",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "title" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "title",
                                  id: "txtTitle" + _vm._uid,
                                  "data-autofocus": "",
                                  "data-testing": "billing-address-de-title",
                                },
                                domProps: { value: _vm.value.title },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "title",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtTitle" + _vm._uid } },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.transformTranslation(
                                          "Ceres::Template.addressTitle",
                                          "de",
                                          "billing_address.title"
                                        )
                                      ) +
                                      "\n                        "
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.areNameFieldsShown("de", "billing_address")
                      ? [
                          _c("div", { staticClass: "col-12 col-sm-4" }, [
                            _c(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "validate",
                                    rawName: "v-validate:text",
                                    value: _vm.areNameFieldsRequired(
                                      "de",
                                      "billing_address"
                                    ),
                                    expression:
                                      "areNameFieldsRequired('de', 'billing_address')",
                                    arg: "text",
                                  },
                                ],
                                staticClass: "input-unit",
                                attrs: { "data-model": "name2" },
                              },
                              [
                                _c("input", {
                                  attrs: {
                                    type: "text",
                                    name: "firstName",
                                    id: "txtFirstName" + _vm._uid,
                                    "data-autofocus": "",
                                    "data-testing":
                                      "billing-address-de-firstname",
                                  },
                                  domProps: { value: _vm.value.name2 },
                                  on: {
                                    input: function ($event) {
                                      return _vm.emitInputEvent(
                                        "name2",
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                                _vm._v(" "),
                                _c(
                                  "label",
                                  { attrs: { for: "txtFirstName" + _vm._uid } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.addressFirstName"
                                        )
                                      )
                                    ),
                                    _vm.areNameFieldsRequired(
                                      "de",
                                      "billing_address"
                                    )
                                      ? [_vm._v("*")]
                                      : _vm._e(),
                                  ],
                                  2
                                ),
                              ]
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-12 col-sm-4" }, [
                            _c(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "validate",
                                    rawName: "v-validate:text",
                                    value: _vm.areNameFieldsRequired(
                                      "de",
                                      "billing_address"
                                    ),
                                    expression:
                                      "areNameFieldsRequired('de', 'billing_address')",
                                    arg: "text",
                                  },
                                ],
                                staticClass: "input-unit",
                                attrs: { "data-model": "name3" },
                              },
                              [
                                _c("input", {
                                  attrs: {
                                    type: "text",
                                    name: "lastName",
                                    id: "txtLastName" + _vm._uid,
                                    "data-testing":
                                      "billing-address-de-lastname",
                                  },
                                  domProps: { value: _vm.value.name3 },
                                  on: {
                                    input: function ($event) {
                                      return _vm.emitInputEvent(
                                        "name3",
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                                _vm._v(" "),
                                _c(
                                  "label",
                                  { attrs: { for: "txtLastName" + _vm._uid } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.addressLastName"
                                        )
                                      )
                                    ),
                                    _vm.areNameFieldsRequired(
                                      "de",
                                      "billing_address"
                                    )
                                      ? [_vm._v("*")]
                                      : _vm._e(),
                                  ],
                                  2
                                ),
                              ]
                            ),
                          ]),
                        ]
                      : _c("div", { staticClass: "col-12 col-sm-8" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.isInRequiredFields(
                                    "de",
                                    "billing_address.contactPerson"
                                  ),
                                  expression:
                                    "isInRequiredFields('de', 'billing_address.contactPerson')",
                                  arg: "text",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "contactPerson" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "lastName",
                                  id: "txtContactPerson" + _vm._uid,
                                },
                                domProps: { value: _vm.value.contactPerson },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "contactPerson",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                {
                                  attrs: { for: "txtContactPerson" + _vm._uid },
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.transformTranslation(
                                          "Ceres::Template.addressContactPerson",
                                          "de",
                                          "billing_address.contactPerson"
                                        )
                                      ) +
                                      "\n                        "
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ]),
                    _vm._v(" "),
                    _vm.isInOptionalFields("de", "billing_address.name4")
                      ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.isInRequiredFields(
                                    "de",
                                    "billing_address.name4"
                                  ),
                                  expression:
                                    "isInRequiredFields('de', 'billing_address.name4')",
                                  arg: "text",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name4" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "decorateName",
                                  id: "txtAdditionalName" + _vm._uid,
                                },
                                domProps: { value: _vm.value.name4 },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "name4",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                {
                                  attrs: {
                                    for: "txtAdditionalName" + _vm._uid,
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.transformTranslation(
                                          "Ceres::Template.addressAdditionalName",
                                          "de",
                                          "billing_address.name4"
                                        )
                                      ) +
                                      "\n                        "
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.isInOptionalFields("de", "billing_address.birthday")
                      ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:date",
                                  value:
                                    _vm.isInRequiredFields(
                                      "de",
                                      "billing_address.birthday"
                                    ) ||
                                    (!!_vm.value.birthday &&
                                      !!_vm.value.birthday.length),
                                  expression:
                                    "isInRequiredFields('de', 'billing_address.birthday') || !!value.birthday && !!value.birthday.length",
                                  arg: "date",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "birthday" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "date",
                                  min: "1901-12-14",
                                  max: new Date().toISOString().split("T")[0],
                                  name: "birthday",
                                  placeholder: _vm.$translate(
                                    "Ceres::Template.addressBirthdatePlaceholder"
                                  ),
                                  id: "txtBirthdate" + _vm._uid,
                                },
                                domProps: { value: _vm.value.birthday },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "birthday",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtBirthdate" + _vm._uid } },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.transformTranslation(
                                          "Ceres::Template.addressBirthdate",
                                          "de",
                                          "billing_address.birthday"
                                        )
                                      ) +
                                      "\n                        "
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.isInOptionalFields("de", "billing_address.phoneNumber")
                      ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.isInRequiredFields(
                                    "de",
                                    "billing_address.phoneNumber"
                                  ),
                                  expression:
                                    "isInRequiredFields('de', 'billing_address.phoneNumber')",
                                  arg: "text",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "telephone" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "telephone",
                                  id: "txtTelephone" + _vm._uid,
                                },
                                domProps: { value: _vm.value.telephone },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "telephone",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtTelephone" + _vm._uid } },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.transformTranslation(
                                          "Ceres::Template.addressTelephone",
                                          "de",
                                          "billing_address.phoneNumber"
                                        )
                                      ) +
                                      "\n                        "
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ])
                      : _vm._e(),
                  ],
                  2
                ),
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12",
                attrs: { "data-testing": "billing-address-de-street-inputs" },
              },
              [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-12 col-sm-8" }, [
                    _c(
                      "div",
                      {
                        staticClass: "input-unit",
                        attrs: {
                          "data-validate": "text",
                          "data-model": "address1",
                        },
                      },
                      [
                        _c("input", {
                          attrs: {
                            type: "text",
                            name: "street",
                            autocomplete: "address-line1",
                            id: "txtStreet" + _vm._uid,
                            "data-testing": "billing-address-de-street",
                          },
                          domProps: { value: _vm.value.address1 },
                          on: {
                            input: function ($event) {
                              return _vm.emitInputEvent(
                                "address1",
                                $event.target.value
                              )
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c(
                          "label",
                          { attrs: { for: "txtStreet" + _vm._uid } },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.$translate("Ceres::Template.addressStreet")
                              ) + "*"
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-12 col-sm-4" }, [
                    _c(
                      "div",
                      {
                        staticClass: "input-unit",
                        attrs: {
                          "data-validate": "text",
                          "data-model": "address2",
                        },
                      },
                      [
                        _c("input", {
                          attrs: {
                            type: "text",
                            name: "housenumber",
                            autocomplete: "address-line2",
                            id: "txtNumber" + _vm._uid,
                            "data-testing": "billing-address-de-house-number",
                          },
                          domProps: { value: _vm.value.address2 },
                          on: {
                            input: function ($event) {
                              return _vm.emitInputEvent(
                                "address2",
                                $event.target.value
                              )
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c(
                          "label",
                          { attrs: { for: "txtNumber" + _vm._uid } },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.$translate("Ceres::Template.addressNumber")
                              ) + "*"
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]),
                ]),
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "billing_address.address3")
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "billing_address.address3"
                              ),
                              expression:
                                "isInRequiredFields('de', 'billing_address.address3')",
                              arg: "text",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address3" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "decorateAddress",
                              id: "decorateAddress0" + _vm._uid,
                            },
                            domProps: { value: _vm.value.address3 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "address3",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress0" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressAdditionalAddress1",
                                      "de",
                                      "billing_address.address3"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.isInOptionalFields("de", "billing_address.address4")
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "billing_address.address4"
                              ),
                              expression:
                                "isInRequiredFields('de', 'billing_address.address4')",
                              arg: "text",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address4" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "decorateAddress",
                              id: "decorateAddress1" + _vm._uid,
                            },
                            domProps: { value: _vm.value.address4 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "address4",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress1" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressAdditionalAddress2",
                                      "de",
                                      "billing_address.address4"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: {
                    "data-validate": "text",
                    "data-model": "postalCode",
                  },
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "zip",
                      id: "txtZip" + _vm._uid,
                      "data-testing": "billing-address-de-zip",
                    },
                    domProps: { value: _vm.value.postalCode },
                    on: {
                      input: function ($event) {
                        return _vm.emitInputEvent(
                          "postalCode",
                          $event.target.value
                        )
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtZip" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressZip")) + "*"
                    ),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "town" },
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "town",
                      id: "txtPlace" + _vm._uid,
                      "data-testing": "billing-address-de-town",
                    },
                    domProps: { value: _vm.value.town },
                    on: {
                      input: function ($event) {
                        return _vm.emitInputEvent("town", $event.target.value)
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtPlace" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressPlace")) +
                        "*"
                    ),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12 col-sm-4",
                attrs: { "data-testing": "address-country-select" },
              },
              [
                _c("country-select", {
                  attrs: {
                    "selected-country-id": _vm.value.countryId,
                    "selected-state-id": _vm.value.stateId,
                    "address-type": _vm.addressType,
                    "optional-address-fields": _vm.optionalAddressFields,
                    "required-address-fields": _vm.requiredAddressFields,
                  },
                  on: {
                    "country-changed": function ($event) {
                      return _vm.onSelectedCountryChanged($event)
                    },
                    "state-changed": function ($event) {
                      return _vm.emitInputEvent("stateId", $event)
                    },
                  },
                }),
              ],
              1
            ),
            _vm._v(" "),
            _vm._t("custom-address-fields"),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("hr", { staticClass: "mt-0" }),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "billing_address.email")
                  ? _c("div", { staticClass: "col-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:mail",
                              value: _vm.isInOptionalFields(
                                "de",
                                "billing_address.email"
                              ),
                              expression:
                                "isInOptionalFields('de', 'billing_address.email')",
                              arg: "mail",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "email" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "email",
                              name: "email",
                              id: "email" + _vm._uid,
                              "data-testing": "billing-address-de-email-input",
                            },
                            domProps: { value: _vm.value.email },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "email",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "email" + _vm._uid } }, [
                            _vm._v(
                              _vm._s(
                                _vm.transformTranslation(
                                  "Ceres::Template.addressMail",
                                  "de",
                                  "billing_address.email"
                                )
                              )
                            ),
                          ]),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
          ]
        : _vm.localeToShow == "GB" && _vm.addressType === "1"
        ? [
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("gb", "billing_address.salutation")
                  ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "billing_address.salutation"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'billing_address.salutation')",
                            },
                          ],
                          staticClass: "input-unit",
                        },
                        [
                          _c("salutation-select", {
                            attrs: {
                              id: "txtSalutation" + _vm._uid,
                              "address-type": _vm.addressType,
                              "address-data": _vm.value,
                              "enabled-address-fields":
                                _vm.optionalAddressFields,
                            },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  $event.field,
                                  $event.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtSalutation" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressSalutation",
                                      "gb",
                                      "billing_address.salutation"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                (_vm.isInOptionalFields("gb", "billing_address.salutation") &&
                  _vm.value.gender === "company") ||
                (_vm.isInOptionalFields("gb", "billing_address.name1") &&
                  !_vm.isInOptionalFields("gb", "billing_address.salutation"))
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          staticClass: "input-unit",
                          attrs: {
                            "data-validate": "text",
                            "data-model": "name1",
                          },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "company",
                              id: "txtCompany" + _vm._uid,
                              "data-autofocus": "",
                            },
                            domProps: { value: _vm.value.name1 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "name1",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtCompany" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressCompany"
                                  )
                                ) + "*"
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "col-12 col-sm-6" },
                  [
                    _c("vat-id", {
                      attrs: {
                        "is-required": _vm.isInRequiredFields(
                          "gb",
                          "billing_address.vatNumber"
                        ),
                        "selected-country-id": _vm.value.countryId,
                        value: _vm.value.vatNumber || "",
                        "show-input":
                          (_vm.isInOptionalFields(
                            "gb",
                            "billing_address.salutation"
                          ) &&
                            _vm.value.gender === "company" &&
                            _vm.isInOptionalFields(
                              "gb",
                              "billing_address.vatNumber"
                            )) ||
                          (!_vm.isInOptionalFields(
                            "gb",
                            "billing_address.salutation"
                          ) &&
                            _vm.isInOptionalFields(
                              "gb",
                              "billing_address.name1"
                            ) &&
                            _vm.isInOptionalFields(
                              "gb",
                              "billing_address.vatNumber"
                            )),
                      },
                      on: {
                        input: function ($event) {
                          return _vm.emitInputEvent("vatNumber", $event)
                        },
                      },
                    }),
                  ],
                  1
                ),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c(
                "div",
                { staticClass: "row" },
                [
                  _vm.isInOptionalFields("gb", "billing_address.title")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "billing_address.title"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'billing_address.title')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "title" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "title",
                                id: "txtTitle" + _vm._uid,
                                "data-autofocus": "",
                              },
                              domProps: { value: _vm.value.title },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "title",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTitle" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTitle",
                                        "gb",
                                        "billing_address.title"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.areNameFieldsShown("gb", "billing_address")
                    ? [
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "gb",
                                    "billing_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('gb', 'billing_address')",
                                  arg: "text",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name2" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "firstName",
                                  id: "txtFirstName" + _vm._uid,
                                  "data-model": "name2",
                                  "data-autofocus": "",
                                },
                                domProps: { value: _vm.value.name2 },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "name2",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtFirstName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressFirstName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "gb",
                                    "billing_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e(),
                                ],
                                2
                              ),
                            ]
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "gb",
                                    "billing_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('gb', 'billing_address')",
                                  arg: "text",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name3" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "lastName",
                                  id: "txtLastName" + _vm._uid,
                                  "data-model": "name3",
                                },
                                domProps: { value: _vm.value.name3 },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "name3",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtLastName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressLastName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "gb",
                                    "billing_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e(),
                                ],
                                2
                              ),
                            ]
                          ),
                        ]),
                      ]
                    : _c("div", { staticClass: "col-12 col-sm-8" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "billing_address.contactPerson"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'billing_address.contactPerson')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "contactPerson" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "lastName",
                                id: "txtContactPerson" + _vm._uid,
                              },
                              domProps: { value: _vm.value.contactPerson },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "contactPerson",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtContactPerson" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressContactPerson",
                                        "gb",
                                        "billing_address.contactPerson"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]),
                  _vm._v(" "),
                  _vm.isInOptionalFields("gb", "billing_address.name4")
                    ? _c("div", { staticClass: "col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "billing_address.name4"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'billing_address.name4')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "name4" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "decorateName",
                                id: "txtAdditionalName" + _vm._uid,
                              },
                              domProps: { value: _vm.value.name4 },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "name4",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              {
                                attrs: { for: "txtAdditionalName" + _vm._uid },
                              },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressGBNameAffix",
                                        "gb",
                                        "billing_address.name4"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isInOptionalFields("gb", "billing_address.birthday")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:date",
                                value:
                                  _vm.isInRequiredFields(
                                    "gb",
                                    "billing_address.birthday"
                                  ) ||
                                  (!!_vm.value.birthday &&
                                    !!_vm.value.birthday.length),
                                expression:
                                  "isInRequiredFields('gb', 'billing_address.birthday') || !!value.birthday && !!value.birthday.length",
                                arg: "date",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "birthday" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "date",
                                min: "1901-12-14",
                                max: new Date().toISOString().split("T")[0],
                                name: "birthday",
                                placeholder: _vm.$translate(
                                  "Ceres::Template.addressBirthdatePlaceholder"
                                ),
                                id: "txtBirthdate" + _vm._uid,
                              },
                              domProps: { value: _vm.value.birthday },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "birthday",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtBirthdate" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressBirthdate",
                                        "gb",
                                        "billing_address.birthday"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isInOptionalFields("gb", "billing_address.phoneNumber")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "billing_address.phoneNumber"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'billing_address.phoneNumber')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "telephone" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "telephone",
                                id: "txtTelephone" + _vm._uid,
                              },
                              domProps: { value: _vm.value.telephone },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "telephone",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTelephone" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTelephone",
                                        "gb",
                                        "billing_address.phoneNumber"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                ],
                2
              ),
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12",
                attrs: { "data-testing": "invoice-addresses-street-select-gb" },
              },
              [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-12 col-sm-12" }, [
                    _c(
                      "div",
                      {
                        staticClass: "input-unit",
                        attrs: {
                          "data-validate": "text",
                          "data-model": "address1",
                        },
                      },
                      [
                        _c("input", {
                          attrs: {
                            type: "text",
                            name: "street",
                            autocomplete: "address-line1",
                            id: "txtStreet" + _vm._uid,
                          },
                          domProps: { value: _vm.value.address1 },
                          on: {
                            input: function ($event) {
                              return _vm.emitInputEvent(
                                "address1",
                                $event.target.value
                              )
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c(
                          "label",
                          { attrs: { for: "txtStreet" + _vm._uid } },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.addressENAddressLine1"
                                )
                              ) + "*"
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _vm.isInOptionalFields("gb", "billing_address.address2")
                    ? _c("div", { staticClass: "col-12 col-sm-12" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "billing_address.address2"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'billing_address.address2')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "address2" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "housenumber",
                                autocomplete: "address-line2",
                                id: "txtNumber" + _vm._uid,
                              },
                              domProps: { value: _vm.value.address2 },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "address2",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtNumber" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressENAddressLine2",
                                        "gb",
                                        "billing_address.address2"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                ]),
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("gb", "billing_address.address3")
                  ? _c("div", { staticClass: "col-12 col-sm-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "billing_address.address3"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'billing_address.address3')",
                              arg: "text",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address3" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "buildingName",
                              id: "decorateAddress0" + _vm._uid,
                            },
                            domProps: { value: _vm.value.address3 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "address3",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress0" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressENAddressLine3",
                                      "gb",
                                      "billing_address.address3"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.isInOptionalFields("gb", "billing_address.address4")
                  ? _c("div", { staticClass: "col-12 col-sm-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "billing_address.address4"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'billing_address.address4')",
                              arg: "text",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address4" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "buildingName",
                              id: "decorateAddress0" + _vm._uid,
                            },
                            domProps: { value: _vm.value.address4 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "address4",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress0" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressENAddressLine4",
                                      "gb",
                                      "billing_address.address4"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "town" },
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "town",
                      id: "txtPlace" + _vm._uid,
                    },
                    domProps: { value: _vm.value.town },
                    on: {
                      input: function ($event) {
                        return _vm.emitInputEvent("town", $event.target.value)
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtPlace" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressPlace")) +
                        "*"
                    ),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: {
                    "data-validate": "text",
                    "data-model": "postalCode",
                  },
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "zip",
                      id: "txtZip" + _vm._uid,
                    },
                    domProps: { value: _vm.value.postalCode },
                    on: {
                      input: function ($event) {
                        return _vm.emitInputEvent(
                          "postalCode",
                          $event.target.value
                        )
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtZip" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressZip")) + "*"
                    ),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12 col-sm-4",
                attrs: { "data-testing": "address-country-select" },
              },
              [
                _c("country-select", {
                  attrs: {
                    "selected-country-id": _vm.value.countryId,
                    "selected-state-id": _vm.value.stateId,
                    "address-type": _vm.addressType,
                    "optional-address-fields": _vm.optionalAddressFields,
                    "required-address-fields": _vm.requiredAddressFields,
                  },
                  on: {
                    "country-changed": function ($event) {
                      return _vm.onSelectedCountryChanged($event)
                    },
                    "state-changed": function ($event) {
                      return _vm.emitInputEvent("stateId", $event)
                    },
                  },
                }),
              ],
              1
            ),
            _vm._v(" "),
            _vm._t("custom-address-fields"),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("hr", { staticClass: "mt-0" }),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("gb", "billing_address.email")
                  ? _c("div", { staticClass: "col-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:mail",
                              value: _vm.isInOptionalFields(
                                "gb",
                                "billing_address.email"
                              ),
                              expression:
                                "isInOptionalFields('gb', 'billing_address.email')",
                              arg: "mail",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "email" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "email",
                              name: "email",
                              id: "email" + _vm._uid,
                              "data-testing": "billing-address-gb-email-input",
                            },
                            domProps: { value: _vm.value.email },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "email",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "email" + _vm._uid } }, [
                            _vm._v(
                              _vm._s(
                                _vm.transformTranslation(
                                  "Ceres::Template.addressMail",
                                  "gb",
                                  "billing_address.email"
                                )
                              )
                            ),
                          ]),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
          ]
        : _vm.localeToShow == "DE" && _vm.addressType === "2"
        ? [
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "delivery_address.salutation")
                  ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: _vm.isInRequiredFields(
                                "de",
                                "delivery_address.salutation"
                              ),
                              expression:
                                "isInRequiredFields('de', 'delivery_address.salutation')",
                            },
                          ],
                          staticClass: "input-unit",
                        },
                        [
                          _c("salutation-select", {
                            attrs: {
                              id: "txtSalutation" + _vm._uid,
                              "address-type": _vm.addressType,
                              "address-data": _vm.value,
                              "enabled-address-fields":
                                _vm.optionalAddressFields,
                            },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  $event.field,
                                  $event.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtSalutation" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressSalutation",
                                      "de",
                                      "delivery_address.salutation"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                (_vm.isInOptionalFields("de", "delivery_address.salutation") &&
                  _vm.value.gender === "company") ||
                (_vm.isInOptionalFields("de", "delivery_address.name1") &&
                  !_vm.isInOptionalFields("de", "delivery_address.salutation"))
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          staticClass: "input-unit",
                          attrs: {
                            "data-validate": "text",
                            "data-model": "name1",
                          },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "company",
                              id: "txtCompany" + _vm._uid,
                              "data-autofocus": "",
                            },
                            domProps: { value: _vm.value.name1 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "name1",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtCompany" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressCompany"
                                  )
                                ) + "*"
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "col-12 col-sm-6" },
                  [
                    _c("vat-id", {
                      attrs: {
                        "is-required": _vm.isInRequiredFields(
                          "de",
                          "delivery_address.vatNumber"
                        ),
                        "selected-country-id": _vm.value.countryId,
                        value: _vm.value.vatNumber || "",
                        "show-input":
                          (_vm.isInOptionalFields(
                            "de",
                            "delivery_address.salutation"
                          ) &&
                            _vm.value.gender === "company" &&
                            _vm.isInOptionalFields(
                              "de",
                              "delivery_address.vatNumber"
                            )) ||
                          (!_vm.isInOptionalFields(
                            "de",
                            "delivery_address.salutation"
                          ) &&
                            _vm.isInOptionalFields(
                              "de",
                              "delivery_address.name1"
                            ) &&
                            _vm.isInOptionalFields(
                              "de",
                              "delivery_address.vatNumber"
                            )),
                      },
                      on: {
                        input: function ($event) {
                          return _vm.emitInputEvent("vatNumber", $event)
                        },
                      },
                    }),
                  ],
                  1
                ),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c(
                "div",
                { staticClass: "row" },
                [
                  _vm.isInOptionalFields("de", "delivery_address.title")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.title"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.title')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "title" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "title",
                                id: "txtTitle" + _vm._uid,
                                "data-autofocus": "",
                              },
                              domProps: { value: _vm.value.title },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "title",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTitle" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTitle",
                                        "de",
                                        "delivery_address.title"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.areNameFieldsShown("de", "delivery_address")
                    ? [
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('de', 'delivery_address')",
                                  arg: "text",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name2" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "firstName",
                                  id: "txtFirstName" + _vm._uid,
                                  "data-autofocus": "",
                                  "data-testing":
                                    "delivery-address-de-firstname",
                                },
                                domProps: { value: _vm.value.name2 },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "name2",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtFirstName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressFirstName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e(),
                                ],
                                2
                              ),
                            ]
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('de', 'delivery_address')",
                                  arg: "text",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name3" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "lastName",
                                  id: "txtLastName" + _vm._uid,
                                  "data-testing":
                                    "delivery-address-de-lastname",
                                },
                                domProps: { value: _vm.value.name3 },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "name3",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtLastName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressLastName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e(),
                                ],
                                2
                              ),
                            ]
                          ),
                        ]),
                      ]
                    : _c("div", { staticClass: "col-12 col-sm-8" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.contactPerson"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.contactPerson')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "contactPerson" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "lastName",
                                id: "txtContactPerson" + _vm._uid,
                              },
                              domProps: { value: _vm.value.contactPerson },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "contactPerson",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtContactPerson" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressContactPerson",
                                        "de",
                                        "delivery_address.contactPerson"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]),
                  _vm._v(" "),
                  _vm.isInOptionalFields("de", "delivery_address.name4")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.name4"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.name4')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "name4" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "decorateName",
                                id: "txtAdditionalName" + _vm._uid,
                              },
                              domProps: { value: _vm.value.name4 },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "name4",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              {
                                attrs: { for: "txtAdditionalName" + _vm._uid },
                              },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressAdditionalName",
                                        "de",
                                        "delivery_address.name4"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isInOptionalFields("de", "delivery_address.phoneNumber")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.phoneNumber"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.phoneNumber')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "telephone" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "telephone",
                                id: "txtTelephone" + _vm._uid,
                              },
                              domProps: { value: _vm.value.telephone },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "telephone",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTelephone" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTelephone",
                                        "de",
                                        "delivery_address.phoneNumber"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                ],
                2
              ),
            ]),
            _vm._v(" "),
            _vm.isParcelOrOfficeAvailable
              ? _c("div", { staticClass: "col-12" }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-12" }, [
                      _c("input", {
                        attrs: {
                          type: "checkbox",
                          name: "togglePickup",
                          id: "showPickup" + _vm._uid,
                        },
                        domProps: { checked: _vm.value.showPickupStation },
                        on: {
                          change: function ($event) {
                            return _vm.togglePickupStation(
                              $event.target.checked
                            )
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "showPickup" + _vm._uid } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.addressToPickupStation"
                            )
                          )
                        ),
                      ]),
                    ]),
                  ]),
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-12 col-sm-8" }, [
                  _c(
                    "div",
                    {
                      staticClass: "input-unit",
                      attrs: {
                        "data-validate": "text",
                        "data-model": "address1",
                      },
                    },
                    [
                      _c("input", {
                        attrs: {
                          type: "text",
                          name: "street",
                          autocomplete: "address-line1",
                          id: "txtStreet" + _vm._uid,
                          "data-testing": "delivery-address-de-street",
                        },
                        domProps: { value: _vm.value.address1 },
                        on: {
                          input: function ($event) {
                            return _vm.emitInputEvent(
                              "address1",
                              $event.target.value
                            )
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "txtStreet" + _vm._uid } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate("Ceres::Template.addressStreet")
                          ) + "*"
                        ),
                      ]),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-12 col-sm-4" }, [
                  _c(
                    "div",
                    {
                      staticClass: "input-unit",
                      attrs: {
                        "data-validate": "text",
                        "data-model": "address2",
                      },
                    },
                    [
                      _c("input", {
                        attrs: {
                          type: "text",
                          name: "housenumber",
                          autocomplete: "address-line2",
                          id: "txtNumber" + _vm._uid,
                          "data-testing": "delivery-address-de-housenumber",
                        },
                        domProps: { value: _vm.value.address2 },
                        on: {
                          input: function ($event) {
                            return _vm.emitInputEvent(
                              "address2",
                              $event.target.value
                            )
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "txtNumber" + _vm._uid } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate("Ceres::Template.addressNumber")
                          ) + "*"
                        ),
                      ]),
                    ]
                  ),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "delivery_address.address3")
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "delivery_address.address3"
                              ),
                              expression:
                                "isInRequiredFields('de', 'delivery_address.address3')",
                              arg: "text",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address3" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "decorateAddress",
                              id: "decorateAddress0" + _vm._uid,
                            },
                            domProps: { value: _vm.value.address3 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "address3",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress0" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressAdditionalAddress1",
                                      "de",
                                      "delivery_address.address3"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.isInOptionalFields("de", "delivery_address.address4")
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "delivery_address.address4"
                              ),
                              expression:
                                "isInRequiredFields('de', 'delivery_address.address4')",
                              arg: "text",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address4" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "decorateAddress",
                              id: "decorateAddress1" + _vm._uid,
                            },
                            domProps: { value: _vm.value.address4 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "address4",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress1" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressAdditionalAddress2",
                                      "de",
                                      "delivery_address.address4"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: {
                    "data-validate": "text",
                    "data-model": "postalCode",
                  },
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "zip",
                      id: "txtZip" + _vm._uid,
                      "data-testing": "delivery-address-de-zip",
                    },
                    domProps: { value: _vm.value.postalCode },
                    on: {
                      input: function ($event) {
                        return _vm.emitInputEvent(
                          "postalCode",
                          $event.target.value
                        )
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtZip" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressZip")) + "*"
                    ),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "town" },
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "town",
                      id: "txtPlace" + _vm._uid,
                      "data-testing": "delivery-address-de-town",
                    },
                    domProps: { value: _vm.value.town },
                    on: {
                      input: function ($event) {
                        return _vm.emitInputEvent("town", $event.target.value)
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtPlace" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressPlace")) +
                        "*"
                    ),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12 col-sm-4",
                attrs: { "data-testing": "address-country-select" },
              },
              [
                _c("country-select", {
                  attrs: {
                    "selected-country-id": _vm.value.countryId,
                    "selected-state-id": _vm.value.stateId,
                    "address-type": _vm.addressType,
                    "optional-address-fields": _vm.optionalAddressFields,
                    "required-address-fields": _vm.requiredAddressFields,
                  },
                  on: {
                    "country-changed": function ($event) {
                      return _vm.onSelectedCountryChanged($event)
                    },
                    "state-changed": function ($event) {
                      return _vm.emitInputEvent("stateId", $event)
                    },
                  },
                }),
              ],
              1
            ),
            _vm._v(" "),
            _vm._t("custom-address-fields"),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("hr", { staticClass: "mt-0" }),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "delivery_address.email")
                  ? _c("div", { staticClass: "col-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:mail",
                              value: _vm.isInOptionalFields(
                                "de",
                                "delivery_address.email"
                              ),
                              expression:
                                "isInOptionalFields('de', 'delivery_address.email')",
                              arg: "mail",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "email" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "email",
                              name: "email",
                              id: "email" + _vm._uid,
                              "data-testing": "delivery-address-de-email-input",
                            },
                            domProps: { value: _vm.value.email },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "email",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "email" + _vm._uid } }, [
                            _vm._v(
                              _vm._s(
                                _vm.transformTranslation(
                                  "Ceres::Template.addressMail",
                                  "de",
                                  "delivery_address.email"
                                )
                              )
                            ),
                          ]),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
          ]
        : _vm.localeToShow == "GB" && _vm.addressType === "2"
        ? [
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("gb", "delivery_address.salutation")
                  ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "delivery_address.salutation"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'delivery_address.salutation')",
                            },
                          ],
                          staticClass: "input-unit",
                        },
                        [
                          _c("salutation-select", {
                            attrs: {
                              id: "txtSalutation" + _vm._uid,
                              "address-type": _vm.addressType,
                              "address-data": _vm.value,
                              "enabled-address-fields":
                                _vm.optionalAddressFields,
                            },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  $event.field,
                                  $event.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtSalutation" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressSalutation",
                                      "gb",
                                      "delivery_address.salutation"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                (_vm.isInOptionalFields("gb", "delivery_address.salutation") &&
                  _vm.value.gender === "company") ||
                (_vm.isInOptionalFields("gb", "delivery_address.name1") &&
                  !_vm.isInOptionalFields("gb", "delivery_address.salutation"))
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          staticClass: "input-unit",
                          attrs: {
                            "data-validate": "text",
                            "data-model": "name1",
                          },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "company",
                              id: "txtCompany" + _vm._uid,
                              "data-autofocus": "",
                            },
                            domProps: { value: _vm.value.name1 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "name1",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtCompany" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressCompany"
                                  )
                                ) + "*"
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "col-12 col-sm-6" },
                  [
                    _c("vat-id", {
                      attrs: {
                        "is-required": _vm.isInRequiredFields(
                          "gb",
                          "delivery_address.vatNumber"
                        ),
                        "selected-country-id": _vm.value.countryId,
                        value: _vm.value.vatNumber || "",
                        "show-input":
                          (_vm.isInOptionalFields(
                            "gb",
                            "delivery_address.salutation"
                          ) &&
                            _vm.value.gender === "company" &&
                            _vm.isInOptionalFields(
                              "gb",
                              "delivery_address.vatNumber"
                            )) ||
                          (!_vm.isInOptionalFields(
                            "gb",
                            "delivery_address.salutation"
                          ) &&
                            _vm.isInOptionalFields(
                              "gb",
                              "delivery_address.name1"
                            ) &&
                            _vm.isInOptionalFields(
                              "gb",
                              "delivery_address.vatNumber"
                            )),
                      },
                      on: {
                        input: function ($event) {
                          return _vm.emitInputEvent("vatNumber", $event)
                        },
                      },
                    }),
                  ],
                  1
                ),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c(
                "div",
                { staticClass: "row" },
                [
                  _vm.isInOptionalFields("gb", "delivery_address.title")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "delivery_address.title"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'delivery_address.title')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "title" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "title",
                                id: "txtTitle" + _vm._uid,
                                "data-autofocus": "",
                              },
                              domProps: { value: _vm.value.title },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "title",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTitle" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTitle",
                                        "gb",
                                        "delivery_address.title"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.areNameFieldsShown("gb", "delivery_address")
                    ? [
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "gb",
                                    "delivery_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('gb', 'delivery_address')",
                                  arg: "text",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name2" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "firstName",
                                  id: "txtFirstName" + _vm._uid,
                                  "data-autofocus": "",
                                },
                                domProps: { value: _vm.value.name2 },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "name2",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtFirstName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressFirstName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "gb",
                                    "delivery_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e(),
                                ],
                                2
                              ),
                            ]
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "gb",
                                    "delivery_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('gb', 'delivery_address')",
                                  arg: "text",
                                },
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name3" },
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "lastName",
                                  id: "txtLastName" + _vm._uid,
                                },
                                domProps: { value: _vm.value.name3 },
                                on: {
                                  input: function ($event) {
                                    return _vm.emitInputEvent(
                                      "name3",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtLastName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressLastName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "gb",
                                    "delivery_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e(),
                                ],
                                2
                              ),
                            ]
                          ),
                        ]),
                      ]
                    : _c("div", { staticClass: "col-12 col-sm-8" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "delivery_address.contactPerson"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'delivery_address.contactPerson')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "contactPerson" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "lastName",
                                id: "txtContactPerson" + _vm._uid,
                              },
                              domProps: { value: _vm.value.contactPerson },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "contactPerson",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtContactPerson" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressContactPerson",
                                        "gb",
                                        "delivery_address.contactPerson"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]),
                  _vm._v(" "),
                  _vm.isInOptionalFields("gb", "delivery_address.name4")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "delivery_address.name4"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'delivery_address.name4')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "name4" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "decorateName",
                                id: "txtAdditionalName" + _vm._uid,
                              },
                              domProps: { value: _vm.value.name4 },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "name4",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              {
                                attrs: { for: "txtAdditionalName" + _vm._uid },
                              },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressGBNameAffix",
                                        "gb",
                                        "delivery_address.name4"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isInOptionalFields("gb", "delivery_address.phoneNumber")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "delivery_address.phoneNumber"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'delivery_address.phoneNumber')",
                                arg: "text",
                              },
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "telephone" },
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "telephone",
                                id: "txtTelephone" + _vm._uid,
                              },
                              domProps: { value: _vm.value.telephone },
                              on: {
                                input: function ($event) {
                                  return _vm.emitInputEvent(
                                    "telephone",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTelephone" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTelephone",
                                        "gb",
                                        "delivery_address.phoneNumber"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                ],
                2
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-12 col-sm-8" }, [
                  _c(
                    "div",
                    {
                      staticClass: "input-unit",
                      attrs: {
                        "data-validate": "text",
                        "data-model": "address1",
                      },
                    },
                    [
                      _c("input", {
                        attrs: {
                          type: "text",
                          name: "street",
                          autocomplete: "address-line1",
                          id: "txtStreet" + _vm._uid,
                        },
                        domProps: { value: _vm.value.address1 },
                        on: {
                          input: function ($event) {
                            return _vm.emitInputEvent(
                              "address1",
                              $event.target.value
                            )
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "txtStreet" + _vm._uid } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.addressENAddressLine1"
                            )
                          ) + "*"
                        ),
                      ]),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _vm.isInOptionalFields("gb", "delivery_address.address2")
                  ? _c("div", { staticClass: "col-12 col-sm-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "delivery_address.address2"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'delivery_address.address2')",
                              arg: "text",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address2" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "housenumber",
                              autocomplete: "address-line2",
                              id: "txtNumber" + _vm._uid,
                            },
                            domProps: { value: _vm.value.address2 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "address2",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtNumber" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressENAddressLine2",
                                      "gb",
                                      "delivery_address.address2"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("gb", "delivery_address.address3")
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "delivery_address.address3"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'delivery_address.address3')",
                              arg: "text",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address3" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "buildingName",
                              id: "decorateAddress0" + _vm._uid,
                            },
                            domProps: { value: _vm.value.address3 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "address3",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress0" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressENAddressLine3",
                                      "gb",
                                      "delivery_address.address3"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.isInOptionalFields("gb", "delivery_address.address4")
                  ? _c("div", { staticClass: "col-12 col-sm-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "delivery_address.address4"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'delivery_address.address4')",
                              arg: "text",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address4" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "buildingName",
                              id: "decorateAddress1" + _vm._uid,
                            },
                            domProps: { value: _vm.value.address4 },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "address4",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress1" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressENAddressLine4",
                                      "gb",
                                      "delivery_address.address4"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "town" },
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "town",
                      id: "txtPlace" + _vm._uid,
                    },
                    domProps: { value: _vm.value.town },
                    on: {
                      input: function ($event) {
                        return _vm.emitInputEvent("town", $event.target.value)
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtPlace" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressPlace")) +
                        "*"
                    ),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: {
                    "data-validate": "text",
                    "data-model": "postalCode",
                  },
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "zip",
                      id: "txtZip" + _vm._uid,
                    },
                    domProps: { value: _vm.value.postalCode },
                    on: {
                      input: function ($event) {
                        return _vm.emitInputEvent(
                          "postalCode",
                          $event.target.value
                        )
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtZip" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressZip")) + "*"
                    ),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12 col-sm-4",
                attrs: { "data-testing": "address-country-select" },
              },
              [
                _c("country-select", {
                  attrs: {
                    "selected-country-id": _vm.value.countryId,
                    "selected-state-id": _vm.value.stateId,
                    "address-type": _vm.addressType,
                    "optional-address-fields": _vm.optionalAddressFields,
                    "required-address-fields": _vm.requiredAddressFields,
                  },
                  on: {
                    "country-changed": function ($event) {
                      return _vm.onSelectedCountryChanged($event)
                    },
                    "state-changed": function ($event) {
                      return _vm.emitInputEvent("stateId", $event)
                    },
                  },
                }),
              ],
              1
            ),
            _vm._v(" "),
            _vm._t("custom-address-fields"),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("hr", { staticClass: "mt-0" }),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("gb", "delivery_address.email")
                  ? _c("div", { staticClass: "col-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:mail",
                              value: _vm.isInOptionalFields(
                                "gb",
                                "delivery_address.email"
                              ),
                              expression:
                                "isInOptionalFields('gb', 'delivery_address.email')",
                              arg: "mail",
                            },
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "email" },
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "email",
                              name: "email",
                              id: "email" + _vm._uid,
                              "data-testing": "delivery-address-gb-email-input",
                            },
                            domProps: { value: _vm.value.email },
                            on: {
                              input: function ($event) {
                                return _vm.emitInputEvent(
                                  "email",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "email" + _vm._uid } }, [
                            _vm._v(
                              _vm._s(
                                _vm.transformTranslation(
                                  "Ceres::Template.addressMail",
                                  "gb",
                                  "delivery_address.email"
                                )
                              )
                            ),
                          ]),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
          ]
        : _vm._e(),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue?vue&type=template&id=3594079d":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/CountrySelect.vue?vue&type=template&id=3594079d ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; },
/* harmony export */   staticRenderFns: function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    [
      _c(
        "div",
        {
          staticClass: "input-unit",
          attrs: { "data-validate": "", "data-model": "countryId" },
        },
        [
          _c(
            "select",
            {
              staticClass: "custom-select",
              attrs: { id: "country-id-select" + _vm._uid },
              domProps: { value: _vm.selectedCountryId },
              on: {
                change: function ($event) {
                  return _vm.countryChanged($event.target.value)
                },
              },
            },
            _vm._l(_vm.countryList, function (country) {
              return _c(
                "option",
                {
                  key: country.id,
                  domProps: {
                    value: country.id,
                    selected: country.id === _vm.selectedCountryId,
                  },
                },
                [
                  _vm._v(
                    "\n                " +
                      _vm._s(country.currLangName) +
                      "\n            "
                  ),
                ]
              )
            }),
            0
          ),
          _vm._v(" "),
          _c("label", { attrs: { for: "country-id-select" + _vm._uid } }, [
            _vm._v(_vm._s(_vm.$translate("Ceres::Template.headerCountry"))),
          ]),
        ]
      ),
      _vm._v(" "),
      _vm.isInOptionalFields("stateId")
        ? [
            _vm.stateList && _vm.stateList.length > 0
              ? _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "validate",
                        rawName: "v-validate:StateSelect",
                        value: _vm.isInRequiredFields("stateId"),
                        expression: "isInRequiredFields('stateId')",
                        arg: "StateSelect",
                      },
                    ],
                    staticClass: "input-unit",
                    attrs: { "data-model": "stateId" },
                  },
                  [
                    _c(
                      "select",
                      {
                        staticClass: "custom-select",
                        attrs: { id: "state-id-select" + _vm._uid },
                        domProps: { value: _vm.selectedStateId },
                        on: {
                          change: function ($event) {
                            return _vm.stateChanged($event.target.value)
                          },
                        },
                      },
                      [
                        _c(
                          "option",
                          {
                            domProps: {
                              selected: _vm.selectedStateId === null,
                            },
                          },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.addressPleaseSelect"
                                )
                              )
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _vm._l(_vm.stateList, function (state) {
                          return _c(
                            "option",
                            {
                              key: state.id,
                              domProps: {
                                value: state.id,
                                selected: state.id === _vm.selectedStateId,
                              },
                            },
                            [
                              _vm._v(
                                "\n                    " +
                                  _vm._s(state.name) +
                                  "\n                "
                              ),
                            ]
                          )
                        }),
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c(
                      "label",
                      { attrs: { for: "state-id-select" + _vm._uid } },
                      [
                        _vm._v(
                          _vm._s(
                            _vm.transformTranslation(
                              "Ceres::Template.headerState",
                              "stateId"
                            )
                          )
                        ),
                      ]
                    ),
                  ]
                )
              : _vm._e(),
          ]
        : _vm._e(),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=template&id=0a026b19":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=template&id=0a026b19 ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; },
/* harmony export */   staticRenderFns: function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "select",
    {
      staticClass: "custom-select",
      attrs: { "data-testing": "salutation-select", "data-autofocus": "" },
      domProps: { value: _vm.addressData.gender },
      on: {
        change: function ($event) {
          return _vm.emitInputEvent($event.target.value)
        },
      },
    },
    _vm._l(_vm.currentSalutation, function (salutation, index) {
      return _c(
        "option",
        {
          key: index,
          domProps: {
            value: salutation.key,
            selected:
              _vm.addressData.gender === salutation.key &&
              _vm.checkGenderCompany(salutation.key),
          },
        },
        [_vm._v("\n        " + _vm._s(salutation.name) + "\n    ")]
      )
    }),
    0
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue?vue&type=template&id=dc9c08e2":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/Ceres/resources/js/src/app/components/customer/VatId.vue?vue&type=template&id=dc9c08e2 ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; },
/* harmony export */   staticRenderFns: function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _vm.showInput
    ? _c(
        "div",
        {
          staticClass: "input-group flex-nowrap",
          attrs: { "data-model": "vatNumber" },
        },
        [
          _vm.isEU
            ? _c(
                "div",
                { staticClass: "input-unit w-auto input-group-prepend" },
                [
                  _vm.vatCodes.length === 1
                    ? _c(
                        "span",
                        {
                          staticClass: "input-group-text h-100 border-0",
                          attrs: { id: "basic-addon1" },
                        },
                        [_vm._v(_vm._s(_vm.vatCodes[0]))]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.vatCodes.length > 1
                    ? _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.vatPrefix,
                              expression: "vatPrefix",
                            },
                          ],
                          staticClass: "custom-select",
                          on: {
                            change: function ($event) {
                              var $$selectedVal = Array.prototype.filter
                                .call($event.target.options, function (o) {
                                  return o.selected
                                })
                                .map(function (o) {
                                  var val = "_value" in o ? o._value : o.value
                                  return val
                                })
                              _vm.vatPrefix = $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            },
                          },
                        },
                        _vm._l(_vm.vatCodes, function (vatCode, index) {
                          return _c(
                            "option",
                            { key: index, domProps: { value: vatCode } },
                            [_vm._v(_vm._s(vatCode))]
                          )
                        }),
                        0
                      )
                    : _vm._e(),
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "validate",
                  rawName: "v-validate:text",
                  value: _vm.isRequired,
                  expression: "isRequired",
                  arg: "text",
                },
              ],
              staticClass: "input-unit flex-fill w-auto",
            },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model.trim",
                    value: _vm.vatNumber,
                    expression: "vatNumber",
                    modifiers: { trim: true },
                  },
                ],
                attrs: {
                  "aria-describedby": "basic-addon1",
                  type: "text",
                  name: "vatNumber",
                  id: "txtVatNumber" + _vm._uid,
                  "data-autofocus": "",
                  "data-testing": "vat-id",
                },
                domProps: { value: _vm.vatNumber },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) return
                    _vm.vatNumber = $event.target.value.trim()
                  },
                  blur: function ($event) {
                    return _vm.$forceUpdate()
                  },
                },
              }),
              _vm._v(" "),
              _c("label", { attrs: { for: "txtVatNumber" + _vm._uid } }, [
                _vm._v(
                  "\n            " +
                    _vm._s(
                      _vm.transformTranslation(
                        "Ceres::Template.addressVatNumber",
                        "de",
                        "billing_address.vatNumber"
                      )
                    ) +
                    "\n        "
                ),
              ]),
            ]
          ),
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vuex/dist/vuex.esm.js":
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Store: function() { return /* binding */ Store; },
/* harmony export */   createLogger: function() { return /* binding */ createLogger; },
/* harmony export */   createNamespacedHelpers: function() { return /* binding */ createNamespacedHelpers; },
/* harmony export */   install: function() { return /* binding */ install; },
/* harmony export */   mapActions: function() { return /* binding */ mapActions; },
/* harmony export */   mapGetters: function() { return /* binding */ mapGetters; },
/* harmony export */   mapMutations: function() { return /* binding */ mapMutations; },
/* harmony export */   mapState: function() { return /* binding */ mapState; }
/* harmony export */ });
/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof __webpack_require__.g !== 'undefined'
    ? __webpack_require__.g
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

/* harmony default export */ __webpack_exports__["default"] = (index);



/***/ }),

/***/ "./node_modules/core-js/internals/array-for-each.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-for-each.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var $forEach = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach);
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "./node_modules/core-js/internals/date-to-primitive.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/date-to-primitive.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "./node_modules/core-js/internals/ordinary-to-primitive.js");

var $TypeError = TypeError;

// `Date.prototype[@@toPrimitive](hint)` method implementation
// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
module.exports = function (hint) {
  anObject(this);
  if (hint === 'string' || hint === 'default') hint = 'string';
  else if (hint !== 'number') throw new $TypeError('Incorrect hint');
  return ordinaryToPrimitive(this, hint);
};


/***/ }),

/***/ "./node_modules/core-js/internals/inherit-if-required.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/inherit-if-required.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-assign.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-assign.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol('assign detection');
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/internals/this-number-value.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/this-number-value.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.filter.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.filter.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $filter = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").filter);
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.date.to-primitive.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es.date.to-primitive.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "./node_modules/core-js/internals/define-built-in.js");
var dateToPrimitive = __webpack_require__(/*! ../internals/date-to-primitive */ "./node_modules/core-js/internals/date-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var DatePrototype = Date.prototype;

// `Date.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
if (!hasOwn(DatePrototype, TO_PRIMITIVE)) {
  defineBuiltIn(DatePrototype, TO_PRIMITIVE, dateToPrimitive);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.json.to-string-tag.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.json.to-string-tag.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");

// JSON[@@toStringTag] property
// https://tc39.es/ecma262/#sec-json-@@tostringtag
setToStringTag(globalThis.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/core-js/modules/es.math.to-string-tag.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.math.to-string-tag.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");

// Math[@@toStringTag] property
// https://tc39.es/ecma262/#sec-math-@@tostringtag
setToStringTag(Math, 'Math', true);


/***/ }),

/***/ "./node_modules/core-js/modules/es.number.constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.number.constructor.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "./node_modules/core-js/internals/inherit-if-required.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var getOwnPropertyNames = (__webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js").f);
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f);
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f);
var thisNumberValue = __webpack_require__(/*! ../internals/this-number-value */ "./node_modules/core-js/internals/this-number-value.js");
var trim = (__webpack_require__(/*! ../internals/string-trim */ "./node_modules/core-js/internals/string-trim.js").trim);

var NUMBER = 'Number';
var NativeNumber = globalThis[NUMBER];
var PureNumberNamespace = path[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = globalThis.TypeError;
var stringSlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw new TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        // fast equal of /^0b[01]+$/i
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal of /^0o[0-7]+$/i
        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        default:
          return +it;
      }
      digits = stringSlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

var FORCED = isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'));

var calledWithNew = function (dummy) {
  // includes check on 1..constructor(foo) case
  return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); });
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
var NumberWrapper = function Number(value) {
  var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
  return calledWithNew(this) ? inheritIfRequired(Object(n), this, NumberWrapper) : n;
};

NumberWrapper.prototype = NumberPrototype;
if (FORCED && !IS_PURE) NumberPrototype.constructor = NumberWrapper;

$({ global: true, constructor: true, wrap: true, forced: FORCED }, {
  Number: NumberWrapper
});

// Use `internal/copy-constructor-properties` helper in `core-js@4`
var copyConstructorProperties = function (target, source) {
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(source) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(source, key = keys[j]) && !hasOwn(target, key)) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

if (IS_PURE && PureNumberNamespace) copyConstructorProperties(path[NUMBER], PureNumberNamespace);
if (FORCED || IS_PURE) copyConstructorProperties(path[NUMBER], NativeNumber);


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.assign.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.assign.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var assign = __webpack_require__(/*! ../internals/object-assign */ "./node_modules/core-js/internals/object-assign.js");

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var nativeGetOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f);
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var FORCED = !DESCRIPTORS || fails(function () { nativeGetOwnPropertyDescriptor(1); });

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js":
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.get-prototype-of.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.get-prototype-of.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var nativeGetPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),

/***/ "./node_modules/core-js/modules/es.object.keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.keys.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var nativeKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.async-iterator.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.async-iterator.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js/internals/well-known-symbol-define.js");

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');


/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.to-primitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.to-primitive.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js/internals/well-known-symbol-define.js");
var defineSymbolToPrimitive = __webpack_require__(/*! ../internals/symbol-define-to-primitive */ "./node_modules/core-js/internals/symbol-define-to-primitive.js");

// `Symbol.toPrimitive` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol('toPrimitive');

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive();


/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.to-string-tag.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.to-string-tag.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ "./node_modules/core-js/internals/well-known-symbol-define.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");

// `Symbol.toStringTag` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag(getBuiltIn('Symbol'), 'Symbol');


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.for-each.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.for-each.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var DOMTokenListPrototype = __webpack_require__(/*! ../internals/dom-token-list-prototype */ "./node_modules/core-js/internals/dom-token-list-prototype.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ })

}]);
//# sourceMappingURL=fastCheckout-1.js.map