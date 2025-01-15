<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    protected static ?string $password;
    public function run(): void
    {

        $admin = User::create([
            "full_name" => "Admin",
            "email" => "admin@example.com",
            "password" => static::$password ??= Hash::make("password"),
            "remember_token" => Str::random(10),
            "email_verified_at" => now()
        ]);
        $admin->assignRole("admin");

        $contractor = User::create([
            "full_name" => "Admin 1",
            "email" => "admin1@example.com",
            "password" => static::$password ??= Hash::make("password"),
            "remember_token" => Str::random(10),
            "email_verified_at" => now()
        ]);
        $contractor->assignRole("contractor");
    }
}
