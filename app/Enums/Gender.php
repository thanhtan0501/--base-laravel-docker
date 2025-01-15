<?php

declare(strict_types=1);

namespace App\Enums;

final class Gender extends BaseEnum
{
    public const MALE = "male";
    public const FEMALE = "female";
    public const OTHER = "other";
    public static function getValues(string|array|null $keys = null): array
    {
        return [
            self::MALE,
            self::FEMALE,
            self::OTHER,
        ];
    }
    public static function getDescription($value): string
    {
        if ($value === self::MALE) {
            return __('male');
        }
        if ($value === self::FEMALE) {
            return __('female');
        }

        if ($value === self::OTHER) {
            return __('other');
        }

        return parent::getDescription($value);
    }
}
