<?php

namespace FastCheckout\Extensions;

use FastCheckout\Services\CustomerService;

class TwigServiceContainer
{
    public function getCustomer(): CustomerService
    {
        return pluginApp(CustomerService::class);
    }
}
