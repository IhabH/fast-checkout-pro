<?php

namespace FastCheckout\Controllers;

use IO\Controllers\CategoryController;
use IO\Controllers\CheckoutController;
use IO\Extensions\Constants\ShopUrls;
use IO\Guards\AuthGuard;
use Plenty\Modules\Basket\Contracts\BasketItemRepositoryContract;
use Plenty\Modules\Category\Models\Category;
use Plenty\Modules\ShopBuilder\Helper\ShopBuilderRequest;
use Plenty\Modules\Webshop\Contracts\SessionStorageRepositoryContract;
use Plenty\Plugin\Http\Response;
use Plenty\Plugin\Log\Loggable;

class CustomCheckoutController extends CheckoutController
{
    use Loggable;

    /**
     * Prepare and render the data for the checkout
     *
     * @param Category $category
     *
     * @return string
     * @throws \ErrorException
     */
    public function showCheckout($category = null)
    {
        /** @var BasketItemRepositoryContract $basketItemRepository */
        $basketItemRepository = pluginApp(BasketItemRepositoryContract::class);

        /** @var SessionStorageRepositoryContract $sessionStorageRepository */
        $sessionStorageRepository = pluginApp(SessionStorageRepositoryContract::class);

        /** @var ShopUrls $shopUrls */
        $shopUrls = pluginApp(ShopUrls::class);

        /** @var ShopBuilderRequest $shopBuilderRequest */
        $shopBuilderRequest = pluginApp(ShopBuilderRequest::class);
        $shopBuilderRequest->setMainContentType('checkout');

        if (!$shopBuilderRequest->isShopBuilder()) {
            if (!count($basketItemRepository->all())) {
                $this->getLogger(__CLASS__)->info("IO::Debug.CheckoutController_emptyBasket");
                if ($sessionStorageRepository->getSessionValue(SessionStorageRepositoryContract::LATEST_ORDER_ID) > 0) {
                    AuthGuard::redirect($shopUrls->confirmation, []);
                } else {
                    AuthGuard::redirect($shopUrls->home, []);
                }
            }
        } elseif (is_null($category)) {
            /** @var CategoryController $categoryController */
            $categoryController = pluginApp(CategoryController::class);

            return $categoryController->showCategory("checkout");
        }

        /**
         * @var Response $response
         */
        $response = pluginApp(Response::class);
        $headers = [
            "Cache-Control" => "no-cache, no-store, must-revalidate",
            "Pragma" => "no-cache",
            "Expires" => "0",
        ];

        $responseData = $this->renderTemplate(
            "tpl.checkout",
            [
                'category' => $category,
            ],
            false
        );

        return $response->make($responseData, 200, $headers);
    }
}
