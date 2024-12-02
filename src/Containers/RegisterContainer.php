<?php

namespace FastCheckout\Containers;

use Plenty\Plugin\Templates\Twig;

class RegisterContainer
{
    public function call(Twig $twig, $arg): string
    {
        return $twig->render('FastCheckout::Containers.RegisterContainer', ['showRegistration' => $arg]);
    }
}
