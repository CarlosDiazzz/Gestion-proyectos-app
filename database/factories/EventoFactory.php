<?php

namespace Database\Factories;

use App\Models\Evento;
use App\Models\Juez; // Import Juez model
use Illuminate\Database\Eloquent\Factories\Factory;

class EventoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Evento::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('now', '+1 year');
        $endDate = $this->faker->dateTimeBetween($startDate, (clone $startDate)->modify('+1 month'));

        return [
            'nombre' => $this->faker->unique()->sentence(3),
            'fecha_inicio' => $startDate,
            'fecha_fin' => $endDate,
            'descripcion' => $this->faker->paragraph(),
            'juez_id' => Juez::factory(), // Add juez_id
        ];
    }
}
