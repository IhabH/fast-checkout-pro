<?php

namespace FastCheckout\Controllers;

use FastCheckout\Services\CustomerService;
use Plenty\Plugin\Controller;
use Plenty\Plugin\Http\Request;
use Plenty\Plugin\Http\Response;

class CustomerController extends Controller
{
    /** @var Response $response */
    private $response;

    /** @var Request $request */
    private $request;

    public function __construct(
        Request $request,
        Response $response
    ) {
        $this->request = $request;
        $this->response = $response;
    }

    /**
     * @return mixed
     */
    public function checkEmail()
    {
        $email = $this->request->get('email', null);

        /** @var CustomerService $customerService */
        $customerService = pluginApp(CustomerService::class);

        $emailExists = $customerService->getContactIdByEmail($email);

        return $this->response->create(['email' => !is_null($emailExists)], 200);
    }

    /**
     * @return mixed
     */
    public function registerContact()
    {
        $billingAddress = $this->request->get("billingAddress", null);
        $deliveryAddress = $this->request->get("deliveryAddress", null);

        /** @var CustomerService $customerService */
        $customerService = pluginApp(CustomerService::class);

        $address = $customerService->registerAsGuest($billingAddress, $deliveryAddress);

        return $this->response->json($address, 201);
    }

    /**
     *
     * @param int $addressId
     * @return void
     */
    public function createContact()
    {
        $addressId = $this->request->get("addressId", 0);
        $password = $this->request->get("password", "");

        if ($addressId > 0) {
            $customerService = pluginApp(CustomerService::class);

            $contact = $customerService->convertGuestByAddress($addressId, $password);

            return $this->response->json($contact, 201);
        }
        return $this->response->json(["msg" => 'Not created'], 403);
    }
}
