<?php

namespace App\Http\Resources;


class RoleResource extends BaseResource
{
    protected static function getListFields(): array
    {
        return [
            'id',
            'name',
        ];
    }
    protected function getFieldMappings(): array
    {
        return [
            'id'                   => fn() => $this->id,
            'name'                 => fn() => $this->name,
            'status'                 => fn() => $this->status,
            'permissions'          => fn() => $this->when($this->permissions, fn() => PermissionResource::collection($this->permissions))
        ];
    }
}
