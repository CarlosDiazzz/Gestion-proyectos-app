<?php

namespace Database\Factories;

use App\Models\Juez;
use App\Models\Especialidad;
use Illuminate\Database\Eloquent\Factories\Factory;

class JuezFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Juez::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->name(),
            'correo' => $this->faker->unique()->safeEmail(),
            'telefono' => $this->faker->phoneNumber(),
            'especialidad_id' => Especialidad::factory(), // Assumes EspecialidadFactory exists
        ];
    }
}
