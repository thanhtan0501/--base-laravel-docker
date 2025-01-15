<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

abstract class BaseEnum extends Enum
{
    /**
     * Summary of getConstants
     * @return array
     */
    protected static function getConstants(): array
    {
        $reflection = new \ReflectionClass(static::class);
        $constants = $reflection->getConstants();
        return array_filter($constants, function ($key) {
            return strpos($key, '_') !== 0;
        }, ARRAY_FILTER_USE_KEY);
    }
}
