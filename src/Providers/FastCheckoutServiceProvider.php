<?php

namespace FastCheckout\Providers;

use FastCheckout\Extensions\TwigServiceProvider;
use FastCheckout\Middlewares\CheckOutMiddleWare;
use FastCheckout\Widgets\FastCheckoutWidget;
use IO\Helper\ResourceContainer;
use Plenty\Modules\ShopBuilder\Contracts\ContentWidgetRepositoryContract;
use Plenty\Modules\Webshop\Template\Providers\TemplateServiceProvider;
use Plenty\Plugin\Events\Dispatcher;
use Plenty\Plugin\Templates\Twig;

class FastCheckoutServiceProvider extends TemplateServiceProvider
{
    const EVENT_LISTENER_PRIORITY = 100;

    public function register()
    {
        $this->getApplication()->register(FastCheckoutRouteServiceProvider::class);

        $this->addGlobalMiddleware(CheckOutMiddleWare::class);
    }

    public function boot(Twig $twig, Dispatcher $eventDispatcher)
    {
        $twig->addExtension(TwigServiceProvider::class);

        /** @var ContentWidgetRepositoryContract $widgetRepository */
        $widgetRepository = pluginApp(ContentWidgetRepositoryContract::class);

        $widgetRepository->registerWidget(FastCheckoutWidget::class);

        // $eventDispatcher->listen('IO.tpl.checkout', function (TemplateContainer $container, $templateData) {
        //     $container->setTemplate('FastCheckout::Checkout.Checkout');
        //     $container->setTemplateData([
        //         "assetName" => "ceres-checkout",
        //     ]);
        //     return false;
        // }, self::EVENT_LISTENER_PRIORITY);

        $eventDispatcher->listen(
            'IO.Resources.Import',
            function (ResourceContainer $resourceContainer) {
                $resourceContainer->addScriptTemplate('FastCheckout::Scripts');
                $resourceContainer->addStyleTemplate('FastCheckout::Styles');
            }
        );
    }
}
