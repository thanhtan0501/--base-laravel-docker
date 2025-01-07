<?php

namespace App\Http\Resources;

class UserResource extends BaseResource
{
    protected static function getListFields(): array
    {
        return [
            'id',
            'avatar',
            'full_name',
            'address',
            'email',
            'email_verified_at',
        ];
    }
    protected function getFieldMappings(): array
    {
        return [
            'id'        => fn() => $this->id,
            // 'avatar'      => fn() => $this->avatar(),
            'avatar'      => fn() => $this->avatar,
            'address'      => fn() => $this->address,
            'full_name'        => fn() => $this->full_name,
            'email'      => fn() => $this->email,
            'email_verified_at'        => fn() => $this->email_verified_at?->diffForHumans() ?? 'Email not verified',
        ];
    }
}
