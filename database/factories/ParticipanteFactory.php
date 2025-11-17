<?php

namespace Database\Factories;

use App\Models\Participante;
use App\Models\User;
use App\Models\Carrera;
use Illuminate\Database\Eloquent\Factories\Factory;

class ParticipanteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Participante::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'usuario_id' => User::factory(), // Assumes UserFactory exists
            'no_control' => $this->faker->unique()->numerify('########'),
            'carrera_id' => Carrera::inRandomOrder()->first() ?? Carrera::factory(), // Use existing carrera or create new
            'nombre' => $this->faker->name(),
            'correo' => $this->faker->unique()->safeEmail(),
            'telefono' => $this->faker->unique()->phoneNumber(),
        ];
    }
}
