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
            'first_name'        => fn() => $this->first_name,
            'last_name'        => fn() => $this->last_name,
            'email'      => fn() => $this->email,
            "roles"      => fn() => $this->when($this->roles, fn() => RoleResource::collection($this->roles)),
            "birthday"      => fn() => $this->birthday,
            "status"      => fn() => $this->status,
            "gender"      => fn() => $this->gender,
            'email_verified_at'        => fn() => $this->email_verified_at?->diffForHumans() ?? 'Email not verified',
        ];
    }
}
