<?php

namespace FastCheckout\Middlewares;

use FastCheckout\Controllers\CustomCheckoutController;
use IO\Controllers\CheckoutController;
use Plenty\Plugin\Application;
use Plenty\Plugin\ConfigRepository;
use Plenty\Plugin\Http\Request;
use Plenty\Plugin\Http\Response;
use Plenty\Plugin\Middleware;

class CheckOutMiddleWare extends Middleware
{
    public $includeRestRoutes = false;

    public function __construct()
    {
        $this->includeRestRoutes = true;
    }

    public function before(Request $request)
    {
        /** @var Application $app */
        $app = pluginApp(Application::class);

        /** @var ConfigRepository $config */
        $config = pluginApp(ConfigRepository::class);

        $app->bind(CheckoutController::class, CustomCheckoutController::class);
    }

    public function after(Request $request, Response $response)
    {
        return $response;
    }
}
