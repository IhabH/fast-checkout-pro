"use strict";
(self["webpackChunkfastcheckout"] = self["webpackChunkfastcheckout"] || []).push([[2],{

/***/ "./node_modules/Ceres/resources/js/src/app/exceptions/ExceptionMap.js":
/*!****************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/exceptions/ExceptionMap.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exceptionMap: function() { return /* binding */ exceptionMap; }
/* harmony export */ });
const exceptionMap = new Map(
    [
        ["0", "errorActionIsNotExecuted"],
        ["1", "notificationsItemNotAdded"],
        ["2", "notificationsNotEnoughStockItem"],
        ["3", "notificationsInvalidResetPasswordUrl"],
        ["4", "notificationsCheckPassword"],
        ["5", "notificationsItemBundleSplitted"],
        ["6", "notificationsItemOutOfStock"],
        ["7", "newsletterOptOutSuccessMessage"],
        ["8", "newsletterOptInMessage"],
        ["9", "notificationsBasketItemsRemoved"],
        ["10", "notificationsBasketItemsRemovedForLanguage"],
        ["11", "notificationsNoEmailEntered"],
        ["12", "notificationsWarningOverselling"],
        ["13", "consentReCaptchaCookieNotSet"],
        ["14", "notificationsBasketItemsRemovedForCurrency"],
        ["15", "notificationsBasketItemsRemovedForShippingCountry"],
        ["16", "notificationsBasketItemsRemovedForContactClass"],
        ["110", "errorBasketItemVariationNotFound"],
        ["111", "errorBasketItemNotEnoughStockForVariation"],
        ["112", "errorBasketItemMaximumQuantityReachedForItem"],
        ["113", "errorBasketItemMaximumQuantityReachedForVariation"],
        ["114", "errorBasketItemMinimumQuantityNotReachedForVariation"],
        ["115", "errorCreateOrderRetryTimeNotReached"],
        ["210", "errorVatService"],
        ["211", "errorVatNumberValidation"],
        ["212", "errorVatServiceFallback"],
        ["301", "notificationRemoveCouponMinimumOrderValueIsNotReached"],
        ["302", "couponNoMatchingItemInBasket"],
        ["401", "notificationsCalculateShippingFailed"],
        ["501", "couponPromotionRequired"],
        ["502", "errorGiftCardReturnQuantity"],
        ["1018", "couponMinOrderValueNotReached"],
        ["1051", "couponnotUsableForSpecialOffer"],
        ["1070", "couponAlreadyUsedOrInvalidCouponCode"],
        ["1078", "couponCampaignExpired"],
        ["1126", "couponNoMatchingItemInBasket"],
        ["1329", "couponOnlySubscription"],
        ["1330", "couponOnlySingleUsage"],
        ["1331", "couponNoOpenAmount"],
        ["1332", "couponExpired"],
        ["1334", "couponOnlyForNewCustomers"],
        ["1335", "couponOnlyForExistingCustomers"],
        ["1336", "couponWrongCustomerGroup"],
        ["1337", "couponWrongCustomerType"],
        ["1338", "couponNoCustomerTypeProvided"],
        ["1339", "couponNoCustomerTypeActivated"],
        ["1340", "couponNoCustomerGroupActivated"],
        ["1341", "couponCampaignNoWebstoreActivated"],
        ["1342", "couponCampaignWrongWebstoreId"],
        ["1343", "couponCampaignNoWebstoreIdGiven"],
        ["1400", "csrfTokenMismatch"],
        ["1401", "accessKeyMailSent"],
        ["1402", "accessKeyMailFailed"]
    ]
);

/* harmony default export */ __webpack_exports__["default"] = (exceptionMap);



/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/helper/url.js":
/*!***************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/helper/url.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeUrl: function() { return /* binding */ normalizeUrl; },
/* harmony export */   pathnameEquals: function() { return /* binding */ pathnameEquals; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/Ceres/resources/js/src/app/helper/utils.js");


function normalizeUrl(url)
{
    const urlParts = url.split("?");
    const urlParams = urlParts[1];

    let urlPath = urlParts[0];

    if (App.urlTrailingSlash && urlPath.substr(-1, 1) !== "/")
    {
        urlPath += "/";
    }
    else if (!App.urlTrailingSlash && urlPath.substr(-1, 1) === "/")
    {
        urlPath = urlPath.substr(0, urlPath.length - 1);
    }

    let targetUrl = urlPath;

    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(urlParams) && urlParams.length > 0)
    {
        targetUrl += "?" + urlParams;
    }

    return targetUrl;
}

function pathnameEquals(pathname)
{
    return window.location.pathname === pathname ||
        window.location.pathname === pathname + "/" ||
        window.location.pathname + "/" === pathname;
}


/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/services/ApiService.js":
/*!************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/services/ApiService.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   after: function() { return /* binding */ after; },
/* harmony export */   before: function() { return /* binding */ before; },
/* harmony export */   del: function() { return /* binding */ del; },
/* harmony export */   get: function() { return /* binding */ get; },
/* harmony export */   getToken: function() { return /* binding */ getToken; },
/* harmony export */   initListener: function() { return /* binding */ initListener; },
/* harmony export */   listen: function() { return /* binding */ listen; },
/* harmony export */   post: function() { return /* binding */ post; },
/* harmony export */   put: function() { return /* binding */ put; },
/* harmony export */   send: function() { return /* binding */ send; },
/* harmony export */   setToken: function() { return /* binding */ setToken; },
/* harmony export */   triggerEvent: function() { return /* binding */ triggerEvent; }
/* harmony export */ });
/* harmony import */ var _helper_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/url */ "./node_modules/Ceres/resources/js/src/app/helper/url.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/utils */ "./node_modules/Ceres/resources/js/src/app/helper/utils.js");



const NotificationService = __webpack_require__(/*! ./NotificationService */ "./node_modules/Ceres/resources/js/src/app/services/NotificationService.js");

const _eventListeners = {};

let _initialRestCall = true;

function initListener()
{
    $(document).ready(() =>
    {
        const token = $("input[id=\"csrf-token\"]").val();

        $.ajaxSetup({
            beforeSend: (jqxhr, settings) =>
            {
                /*
                    Setting the csrf token for every ajax call can hinder cross origin rest calls from workinmg.
                    Using beforeSend makes sure that the header is only set for requests to our backend.
                 */
                if (token && (settings.url.includes(document.location.hostname) || settings.url.startsWith("/")))
                {
                    jqxhr.setRequestHeader("X-CSRF-TOKEN", token);
                }
            }
        });
    });

    $(document).ajaxComplete((ajaxEvent, xhr, options) =>
    {
        let response;

        try
        {
            response = JSON.parse(xhr.responseText);
        }
        catch (exception)
        {

        }

        if (response)
        {
            triggerEvent("_before", response);

            for (const event in response.events)
            {
                triggerEvent("_before_" + event, response.events[event]);
                triggerEvent(event, response.events[event]);
                triggerEvent("_after_" + event, response.events[event]);
            }

            if (!options.supressNotifications)
            {
                _printMessages(response);
            }

            triggerEvent("_after", response);

            if (response.error?.code === 1400)
            {
                window.location.reload();
            }
        }
    });
}

function listen(event, handler)
{
    _eventListeners[event] = _eventListeners[event] || [];
    _eventListeners[event].push(handler);
}

function before(event, handler)
{
    if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isNullOrUndefined)(handler) && typeof event === "function")
    {
        listen("_before", event);
    }
    else
    {
        listen("_before_" + event, handler);
    }
}

function after(event, handler)
{
    if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isNullOrUndefined)(handler) && typeof event === "function")
    {
        listen("_after", event);
    }
    else
    {
        listen("_after_" + event, handler);
    }
}

function triggerEvent(event, payload)
{
    if (_eventListeners[event])
    {
        for (let i = 0; i < _eventListeners[event].length; i++)
        {
            const listener = _eventListeners[event][i];

            if (typeof listener !== "function")
            {
                continue;
            }
            listener.call(Object, payload);
        }
    }
}

function get(url, data, config)
{
    config = config || {};
    config.method = "GET";
    if (_initialRestCall)
    {
        data = data || {};
        data.initialRestCall = true;
        _initialRestCall = false;
    }

    return send(url, data, config);
}

function put(url, data, config)
{
    config = config || {};
    config.method = "PUT";
    return send(url, data, config);
}

function post(url, data, config)
{
    config = config || {};
    config.method = "POST";
    return send(url, data, config);
}

function del(url, data, config)
{
    config = config || {};
    config.method = "DELETE";
    return send(url, data, config);
}

function send(url, data = {}, config)
{
    const deferred = $.Deferred();

    data = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isDefined)(data) ? data : {};
    url = (0,_helper_url__WEBPACK_IMPORTED_MODULE_0__.normalizeUrl)(url);
    config = config || {};
    config.dataType = config.dataType || "json";
    config.contentType = typeof config.contentType !== "undefined" ? config.contentType : "application/x-www-form-urlencoded; charset=UTF-8";
    config.doInBackground = !!config.doInBackground;
    config.supressNotifications = !!config.supressNotifications;
    config.keepOriginalResponse = !!config.keepOriginalResponse;
    config.headers = config.headers || { "Accept-Language": App.language };

    const csrfToken = config.headers["X-CSRF-TOKEN"] || (document.getElementById("csrf-token") || {}).value;

    if (csrfToken)
    {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
    }

    data.templateType = App.templateType;
    config.data = data;

    const request = $.ajax(url, config)
        .done(function(response)
        {
            if (config.keepOriginalResponse)
            {
                deferred.resolve(response);
            }
            else
            {
                deferred.resolve(response.data || response);
            }
        })
        .fail(function(jqXHR)
        {
            const response = jqXHR.responseText ? $.parseJSON(jqXHR.responseText) : {};

            deferred.reject(response, jqXHR.status);
        });

    deferred.abort = request.abort;

    return deferred;
}

function _printMessages(response)
{
    let notification;

    if (response.error && response.error.message.length > 0)
    {
        notification = NotificationService.error(response.error);
    }

    if (response.success && response.success.message.length > 0)
    {
        notification = NotificationService.success(response.success);
    }

    if (response.warn && response.warn.message.length > 0)
    {
        notification = NotificationService.warn(response.warn);
    }

    if (response.info && response.info.message.length > 0)
    {
        notification = NotificationService.info(response.info);
    }

    if (response.debug && response.debug.class.length > 0)
    {
        notification.trace(response.debug.file + "(" + response.debug.line + "): " + response.debug.class);
        for (let i = 0; i < response.debug.trace.length; i++)
        {
            notification.trace(response.debug.trace[i]);
        }
    }
}

function setToken(token)
{
    this._token = token;
}

function getToken()
{
    return this._token;
}

/* harmony default export */ __webpack_exports__["default"] = ({ get, put, post, del, send, setToken, getToken, listen, before, after, initListener });


/***/ }),

/***/ "./node_modules/Ceres/resources/js/src/app/services/NotificationService.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/Ceres/resources/js/src/app/services/NotificationService.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   error: function() { return /* binding */ error; },
/* harmony export */   getNotifications: function() { return /* binding */ getNotifications; },
/* harmony export */   info: function() { return /* binding */ info; },
/* harmony export */   listen: function() { return /* binding */ listen; },
/* harmony export */   log: function() { return /* binding */ log; },
/* harmony export */   success: function() { return /* binding */ success; },
/* harmony export */   warn: function() { return /* binding */ warn; }
/* harmony export */ });
/* harmony import */ var _exceptions_ExceptionMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../exceptions/ExceptionMap */ "./node_modules/Ceres/resources/js/src/app/exceptions/ExceptionMap.js");
/* harmony import */ var _TranslationService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TranslationService */ "./node_modules/Ceres/resources/js/src/app/services/TranslationService.js");



let notificationCount = 0;
const notifications     = new NotificationList();
const handlerList = [];

function listen(handler)
{
    handlerList.push(handler);
}

function _trigger()
{
    for (let i = 0; i < handlerList.length; i++)
    {
        handlerList[i].call({}, notifications.all());
    }
}

function log(message, prefix)
{
    const notification = new Notification(message);

    if (App.config.log.data.indexOf("log_messages") >= 0)
    {
        console.log((prefix || "") + "[" + notification.code + "] " + notification.message);

        for (let i = 0; i < notification.stackTrace.length; i++)
        {
            log(notification.stackTrace[i], " + ");
        }
    }

    return notification;
}

function info(message)
{
    const notification = new Notification(message, "info");

    if (App.config.log.data.indexOf("print_infos") >= 0)
    {
        _printNotification(notification);
    }

    return notification;
}

function warn(message)
{
    const notification = new Notification(message, "warning");

    if (App.config.log.data.indexOf("print_warnings") >= 0)
    {
        _printNotification(notification);
    }

    return notification;
}

function error(message)
{
    const notification = new Notification(message, "danger");

    if (App.config.log.data.indexOf("print_errors") >= 0)
    {
        _printNotification(notification);
    }

    return notification;
}

function success(message)
{
    const notification = new Notification(message, "success");

    if (App.config.log.data.indexOf("print_success") >= 0)
    {
        _printNotification(notification);
    }

    return notification;
}

function getNotifications()
{
    return notifications;
}

function _printNotification(notification)
{
    if (notification.code > 0 && _exceptions_ExceptionMap__WEBPACK_IMPORTED_MODULE_0__.exceptionMap.has(notification.code.toString()))
    {
        notification.message = _TranslationService__WEBPACK_IMPORTED_MODULE_1__["default"].translate(
            "Ceres::Template." + _exceptions_ExceptionMap__WEBPACK_IMPORTED_MODULE_0__.exceptionMap.get(notification.code.toString()),
            notification.placeholder
        );
    }
    notifications.add(notification);
    log(notification);

    _trigger();

    return notification;
}

function Notification(data, context)
{
    if (App.config.log.data.indexOf("print_stack_trace") < 0 && typeof (data) === "object")
    {
        data.stackTrace = [];
    }
    const id   = notificationCount++;
    const self = {
        id        : id,
        code      : data.code || 0,
        message   : data.message || data || "",
        placeholder: data.placeholder || null,
        context   : context || "info",
        stackTrace: data.stackTrace || [],
        close     : close,
        closeAfter: closeAfter,
        trace     : trace
    };

    return self;

    function close()
    {
        notifications.remove(self);
        _trigger();
    }

    function closeAfter(timeout)
    {
        setTimeout(function()
        {
            notifications.remove(self);
            _trigger();
        }, timeout);
    }

    function trace(message, code)
    {
        if (App.config.log.data.indexOf("print_stack_trace") >= 0)
        {
            self.stackTrace.push({
                code   : code || 0,
                message: message
            });
        }
    }
}

function NotificationList()
{
    const elements = [];

    return {
        all   : all,
        add   : add,
        remove: remove
    };

    function all()
    {
        return elements;
    }

    function add(notification)
    {
        elements.push(notification);
    }

    function remove(notification)
    {
        for (let i = 0; i < elements.length; i++)
        {
            if (elements[i].id === notification.id)
            {
                elements.splice(i, 1);
                break;
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = ({ log, info, warn, error, success, getNotifications, listen });


/***/ })

}]);
//# sourceMappingURL=fastCheckout-2.js.map