<?php

namespace FastCheckout\Providers;

use Plenty\Plugin\RouteServiceProvider;
use Plenty\Plugin\Routing\ApiRouter;
use Plenty\Plugin\Routing\Router;

class FastCheckoutRouteServiceProvider extends RouteServiceProvider
{
    public function register()
    {}

    /**
     * @param ApiRouter $api
     */
    public function map(ApiRouter $api)
    {
        $api->version(['v1'], ['namespace' => 'FastCheckout\Controllers'], function (ApiRouter $api) {
            $api->get('fast/checkout/email', 'CustomerController@checkEmail');
            $api->post('fast/checkout/register', 'CustomerController@registerContact');
            $api->post('fast/checkout/contact', 'CustomerController@createContact');
        });
    }
}
