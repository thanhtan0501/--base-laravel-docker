<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "gender" => $gender = fake()->randomElement(Config::get("user.gender")),
            'first_name' => $firstName = fake()->firstName($gender),
            'last_name' => $lastName = fake()->lastName($gender),
            'full_name' => $lastName . ' ' . $firstName,
            "address" => fake()->address(),
            "phone" => fake()->phoneNumber(),
            "birthday" => fake()->dateTimeBetween("-80 years", "-10 years"),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'avatar' => fake()->imageUrl(320, 320),
            "description" => fake()->sentence(50),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
