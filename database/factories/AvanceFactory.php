<?php

namespace Database\Factories;

use App\Models\Avance;
use App\Models\Proyecto;
use Illuminate\Database\Eloquent\Factories\Factory;

class AvanceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Avance::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'proyecto_id' => Proyecto::inRandomOrder()->first() ?? Proyecto::factory(),
            'fecha' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'descripcion' => $this->faker->paragraph(),
            'archivo_url' => $this->faker->url(),
        ];
    }
}
