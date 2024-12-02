<?php

namespace FastCheckout\Widgets;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\WidgetTypes;
use FastCheckout\Helpers\WidgetTranslator;

class FastCheckoutWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "FastCheckout::Widgets.FastCheckoutWidget";

    /**
     * @inheritDoc
     */#9acb0e

    public function getData()
    {
        return WidgetDataFactory::make("FastCheckout::FastCheckoutWidget")
            ->withLabel("FAST CHECKOUT")
            ->withPreviewImageUrl("/images/widgets/fast-checkout.svg")
            ->withType(WidgetTypes::CHECKOUT)
            ->withCategory(WidgetCategories::CHECKOUT)
            ->withPosition(200)
            ->withSearchKeyWords([
                "fast", "checkout", "address", "customer", "guest", "register",
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();
        $settingsFactory->createAppearance();

        $settingsFactory->createSelect("addressDefaultSalutation")
            ->withName("Widget.addressDefaultSalutation")
            ->withTooltip("Widget.addressDefaultSalutationTooltip")
            ->withDefaultValue("male")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("please select", "Widget.addressDefaultSalutationValuePleaseSelect")
                    ->addEntry("male", "Widget.addressDefaultSalutationValueMale")
                    ->addEntry("female", "Widget.addressDefaultSalutationValueFemale")
                    ->addEntry("diverse", "Widget.addressDefaultSalutationValueDiverse")
                    ->addEntry("company", "Widget.addressDefaultSalutationValueCompany")
                    ->toArray()
            );

        $settingsFactory->createCheckbox("showRegisterNote")
            ->withName("Widget.registerNote")
            ->withDefaultValue(true);

        $container = $settingsFactory->createVerticalContainer("customerBenefits")
            ->withName("Widget.customerBenefits")
            ->withCondition("showRegisterNote");

        $container->children->createText("text")
            ->withName("Widget.customerBenefit")
            ->withDefaultValue([])
            ->withList(1);

        $invoiceAddressContainer = $settingsFactory->createVerticalContainer("invoiceAddressContainer")->withName("Widget.addressInvoice");

        $invoiceAddressContainer->children->createCheckboxGroup("addressFieldsInvoiceDE")
            ->withName("Widget.addressFieldsInvoiceDE")
            ->withDefaultValue(["billing_address.name1", "billing_address.salutation", "billing_address.email"])
            ->withCheckboxValues(
                $this->makeAddressFieldsValueList("billing_address.", false, "DE")
            );

        $invoiceAddressContainer->children->createCheckboxGroup("addressRequiredFieldsInvoiceDE")
            ->withName("Widget.addressRequiredFieldsInvoiceDE")
            ->withDefaultValue([])
            ->withCheckboxValues(
                $this->makeAddressFieldsValueList("billing_address.", true, "DE")
            );

        $invoiceAddressContainer->children->createCheckboxGroup("addressFieldsInvoiceGB")
            ->withName("Widget.addressFieldsInvoiceGB")
            ->withDefaultValue(["billing_address.name1", "billing_address.address2", "billing_address.salutation", "billing_address.email"])
            ->withCheckboxValues(
                $this->makeAddressFieldsValueList("billing_address.", false, "GB")
            );

        $invoiceAddressContainer->children->createCheckboxGroup("addressRequiredFieldsInvoiceGB")
            ->withName("Widget.addressRequiredFieldsInvoiceGB")
            ->withDefaultValue([])
            ->withCheckboxValues(
                $this->makeAddressFieldsValueList("billing_address.", true, "GB")
            );

        $shippingAddressContainer = $settingsFactory->createVerticalContainer("shippingAddressContainer")->withName("Widget.addressShipping");

        $shippingAddressContainer->children->createCheckboxGroup("addressFieldsShippingDE")
            ->withName("Widget.addressFieldsShippingDE")
            ->withDefaultValue(["delivery_address.name1", "delivery_address.salutation", "delivery_address.email"])
            ->withCheckboxValues(
                $this->makeAddressFieldsValueList("delivery_address.", false, "DE")
            );

        $shippingAddressContainer->children->createCheckboxGroup("addressRequiredFieldsShippingDE")
            ->withName("Widget.addressRequiredFieldsShippingDE")
            ->withDefaultValue([])
            ->withCheckboxValues(
                $this->makeAddressFieldsValueList("delivery_address.", true, "DE")
            );

        $shippingAddressContainer->children->createCheckboxGroup("addressFieldsShippingGB")
            ->withName("Widget.addressFieldsShippingGB")
            ->withDefaultValue(["delivery_address.name1", "delivery_address.salutation", "delivery_address.email"])
            ->withCheckboxValues(
                $this->makeAddressFieldsValueList("delivery_address.", false, "GB")
            );

        $shippingAddressContainer->children->createCheckboxGroup("addressRequiredFieldsShippingGB")
            ->withName("Widget.addressRequiredFieldsShippingGB")
            ->withDefaultValue([])
            ->withCheckboxValues(
                $this->makeAddressFieldsValueList("delivery_address.", true, "GB")
            );

        $settingsFactory->createSpacing();

        return WidgetTranslator::translateSettings($settingsFactory->toArray(), [
            "Widget.registerNote",
            "Widget.customerBenefits",
            "Widget.customerBenefit"
        ]);
    }

    private function makeAddressFieldsValueList($fieldPrefix = 'billing_address.', $requiredFields = false, $addressLayout = "DE")
    {
        $fieldList = ValueListFactory::make();

        if (!$requiredFields) {
            // Field "company" will be required on dynamic conditions
            $fieldList->addEntry($fieldPrefix . "name1", "Widget.addressFieldName1");
        }

        $fieldList
            ->addEntry($fieldPrefix . "email", "Widget.addressField" . ($addressLayout === 'GB' ? 'En' : '') . "EMail")
            ->addEntry($fieldPrefix . "vatNumber", "Widget.addressField" . ($addressLayout === 'GB' ? 'En' : '') . "VatNumber")
            ->addEntry($fieldPrefix . "contactPerson", "Widget.addressField" . ($addressLayout === 'GB' ? 'En' : '') . "ContactPerson");

        if (!$requiredFields) {
            $fieldList
                ->addEntry($fieldPrefix . "salutation", "Widget.addressField" . ($addressLayout === 'GB' ? 'En' : '') . "Salutation");
        }

        $fieldList
            ->addEntry($fieldPrefix . "title", "Widget.addressField" . ($addressLayout === 'GB' ? 'En' : '') . "Title");

        if ($fieldPrefix === 'billing_address.') {
            $fieldList->addEntry($fieldPrefix . "birthday", "Widget.addressField" . ($addressLayout === 'GB' ? 'En' : '') . "Birthday");
        }

        $fieldList->addEntry($fieldPrefix . "name4", "Widget.addressField" . ($addressLayout === 'GB' ? 'En' : '') . "Name4");

        if ($addressLayout === "GB") {
            // Address 2 (= house no) is mandatory for german addresses and cannot be deactivated
            $fieldList->addEntry($fieldPrefix . "address2", "Widget.addressField" . ($addressLayout === 'GB' ? 'En' : '') . "Address2");
        }

        $fieldList
            ->addEntry($fieldPrefix . "address3", "Widget.addressField" . ($addressLayout === 'GB' ? 'En' : '') . "Address3")
            ->addEntry($fieldPrefix . "address4", "Widget.addressField" . ($addressLayout === 'GB' ? 'En' : '') . "Address4");

        if ($addressLayout === "DE") {
            // states can only be activated for german addresses
            $fieldList->addEntry($fieldPrefix . "stateId", "Widget.addressField" . ($addressLayout === 'GB' ? 'En' : '') . "StateId");
        }

        return $fieldList
            ->addEntry($fieldPrefix . "phoneNumber", "Widget.addressField" . ($addressLayout === 'GB' ? 'En' : '') . "PhoneNumber")
            ->toArray();
    }
}
