<?php

namespace FastCheckout\Services;

use IO\Builder\Order\AddressType;
use IO\Services\CustomerService as IOCustomerService;
use Plenty\Modules\Account\Contact\Contracts\ContactRepositoryContract;
use Plenty\Modules\Account\Contact\Contracts\ConvertGuestsRepositoryContract;
use Plenty\Modules\Authorization\Services\AuthHelper;
use Plenty\Modules\Webshop\Contracts\SessionStorageRepositoryContract;
use Plenty\Plugin\Log\Loggable;

/**
 * Class CustomerService
 * @package FastCheckout\Services
 */
class CustomerService
{
    use Loggable;

    /**
     * @param array $contactData
     * @param $billingAddressData
     * @param $deliveryAddressData
     * @return mixed
     */
    public function registerAsCustomer(array $contactData, $billingAddressData = null, $deliveryAddressData = null)
    {
        /** @var IOCustomerService $ioCustomerService */
        $ioCustomerService = pluginApp(IOCustomerService::class);

        $ioCustomerService->registerCustomer($contactData, $billingAddressData, $deliveryAddressData);

        return $ioCustomerService->getContact();
    }

    /**
     * @param $billingAddressData
     * @param $deliveryAddressData
     * @return \Exception
     */
    public function registerAsGuest($billingAddressData = null, $deliveryAddressData = null)
    {
        /** @var IOCustomerService $ioCustomerService */
        $ioCustomerService = pluginApp(IOCustomerService::class);

        /** @var SessionStorageRepositoryContract $sessionStorageRepository */
        //$sessionStorageRepository = pluginApp(SessionStorageRepositoryContract::class);

        $this->getLogger(__METHOD__)->debug("FastCheckout::Debug.registerGuestData", [
            "billingAddress" => $billingAddressData,
            "deliveryAddress" => $deliveryAddressData,
        ]);

        try {
            $address2 = null;

            $ioCustomerService->deleteGuestAddresses();

            //$sessionStorageRepository->setSessionValue(SessionStorageRepositoryContract::GUEST_EMAIL, $email);

            // Create Addresses
            $address1 = $ioCustomerService->createAddress($billingAddressData, AddressType::BILLING);

            if (!is_null($deliveryAddressData)) {
                $address2 = $ioCustomerService->createAddress($deliveryAddressData, AddressType::DELIVERY);
            }

            $this->getLogger(__METHOD__)->debug("FastCheckout::Debug.registerGuestAddresses", [
                "address1" => $address1,
                "address2" => $address2,
            ]);

            return $address1;
        } catch (\Exception $exception) {
            $this->getLogger(__METHOD__)->error("FastCheckout::Debug.registerGuestError", [
                "error" => $exception,
            ]);

            return $exception;
        }
    }

    public function convertGuestByAddress($addressId = 0, $password)
    {
        try {
            if ($addressId > 0) {
                $convertGuestsRepositoryContract = pluginApp(ConvertGuestsRepositoryContract::class);

                $contact = $convertGuestsRepositoryContract->convertGuestByAddressId($addressId);

                if (!is_null($contact)) {
                    $authHelper = pluginApp(AuthHelper::class);

                    $contactRepositoryContract = pluginApp(ContactRepositoryContract::class);

                    $contact = $authHelper->processUnguarded(
                        function () use ($password, $contact, $contactRepositoryContract) {
                            return $contactRepositoryContract->updateContact(
                                [
                                    'changeOnlyPassword' => true,
                                    'password' => $password,
                                ],
                                (int) $contact->id
                            );
                        }
                    );

                    return $contact;
                }
            }
            return null;
        } catch (\Exception $e) {
            return $e;
        }
    }

    /**
     * Check if a contact with the given email exists
     * @param mixed $email
     * @return mixed
     */
    public function getContactIdByEmail($email)
    {
        if (empty($email)) {
            return null;
        }

        /** @var ContactRepositoryContract $contactRepository */
        $contactRepository = pluginApp(ContactRepositoryContract::class);

        return $contactRepository->getContactIdByEmail($email);
    }

    /**
     * Get the contact id by email from the given options
     * @param mixed $options
     * @return mixed
     */
    public function getContactIdByEmailFromOptions($options)
    {
        if (empty($options)) {
            return null;
        }

        foreach ($options as $option) {
            if ($option['typeId'] === 5) {
                return $this->getContactIdByEmail($option['value']);
            }
        }

        return null;
    }
}
