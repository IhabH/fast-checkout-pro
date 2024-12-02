<?php

namespace FastCheckout\Helpers;

/**
 * Class WidgetTranslator
 * @package FastCheckout\Helpers
 */
class WidgetTranslator
{
    const TRANSLATABLE_KEYS = [
        'name',
        'tooltipText',
        'caption',
    ];

    public static function translateSettings($widgetSettings, $skipTranslationKeys = [])
    {
        foreach ($widgetSettings as $key => &$setting) {
            $setting = self::translateSettingOptions($setting, $skipTranslationKeys);
        }

        return $widgetSettings;
    }

    private static function translateSettingOptions($settingOptions, $skipTranslationKeys = [])
    {
        foreach ($settingOptions as $key => &$option) {
            if (in_array($key . "", self::TRANSLATABLE_KEYS) && !in_array($option, $skipTranslationKeys)) {
                $option = "Ceres::" . $option;
            }

            if (is_array($option)) {
                $option = self::translateSettingOptions($option, $skipTranslationKeys);
            }
        }

        return $settingOptions;
    }
}
