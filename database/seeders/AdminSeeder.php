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

        User::create([
            "full_name" => "Admin",
            "email" => "admin@example.com",
            "password" => static::$password ??= Hash::make("password"),
            "role" => Config::get(("user.role.admin")),
            "remember_token" => Str::random(10),
            "email_verified_at" => now()
        ]);
    }
}
