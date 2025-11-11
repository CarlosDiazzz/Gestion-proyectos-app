<?php

namespace Database\Factories;

use App\Models\Repositorio;
use App\Models\Proyecto;
use Illuminate\Database\Eloquent\Factories\Factory;

class RepositorioFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Repositorio::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'proyecto_id' => Proyecto::factory(),
            'url' => $this->faker->url(),
            'tipo' => $this->faker->randomElement(['GitHub', 'GitLab', 'Bitbucket', 'Other']),
        ];
    }
}
