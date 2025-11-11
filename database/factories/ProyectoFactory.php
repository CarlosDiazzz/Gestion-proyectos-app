<?php

namespace Database\Factories;

use App\Models\Proyecto;
use App\Models\Equipo;
use App\Models\Evento;
use App\Models\Asesor;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProyectoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Proyecto::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'equipo_id' => Equipo::factory(),
            'calificacion_id' => null, // Will be linked later if needed
            'categoria' => $this->faker->word(),
            'evento_id' => Evento::factory(),
            'asesor_id' => Asesor::factory(),
            'avance_id' => null, // Will be linked later if needed
            'repositorio_id' => null, // Will be linked later if needed
            'nombre' => $this->faker->unique()->sentence(4),
        ];
    }
}
