<?php

namespace App\Http\Resources;


class PermissionResource extends BaseResource
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
        ];
    }
}
