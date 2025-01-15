<?php

declare(strict_types=1);

namespace App\Enums;

final class Status extends BaseEnum
{
    public const ACTIVE = "active";
    public const INACTIVE = "inactive";
    public static function getValues(string|array|null $keys = null): array
    {
        return [
            self::ACTIVE,
            self::INACTIVE,
        ];
    }
    public static function getDescription($value): string
    {
        if ($value === self::ACTIVE) {
            return __('active');
        }
        if ($value === self::INACTIVE) {
            return __('inactive');
        }

        return parent::getDescription($value);
    }
}
