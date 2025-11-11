<?php

namespace Database\Factories;

use App\Models\Calificacion;
use App\Models\Proyecto;
use App\Models\Juez;
use App\Models\Criterio;
use Illuminate\Database\Eloquent\Factories\Factory;

class CalificacionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Calificacion::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'proyecto_id' => Proyecto::factory(),
            'juez_id' => Juez::factory(),
            'criterio_id' => Criterio::factory(),
            'puntuacion' => $this->faker->numberBetween(0, 100),
            'comentarios' => $this->faker->paragraph(),
        ];
    }
}
