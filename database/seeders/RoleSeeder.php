<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allPermissionNames = Permission::pluck('name')->toArray();
        $admin = Role::create([
            'name'          => 'admin'
        ]);
        $contractor = Role::create([
            'name'          => 'contractor'
        ]);
        $user = Role::create(['name' => 'user']);

        $admin->givePermissionTo($allPermissionNames);
    }
}
