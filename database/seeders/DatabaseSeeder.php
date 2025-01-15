<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Schema::disableForeignKeyConstraints();
        // User::truncate();
        // Schema::enableForeignKeyConstraints();

        // DB::beginTransaction();
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            AdminSeeder::class,
        ]);
        User::factory(20)->create();

        
    }
}
