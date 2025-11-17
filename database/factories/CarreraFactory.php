<?php

namespace Database\Factories;

use App\Models\Carrera;
use Illuminate\Database\Eloquent\Factories\Factory;

class CarreraFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Carrera::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $carreras = [
            'Ingeniería en Sistemas Computacionales',
            'Ingeniería en Gestión Empresarial',
            'Ingeniería Industrial',
            'Ingeniería Electromecánica',
            'Licenciatura en Administración',
            'Contador Público',
            'Ingeniería en Informática',
            'Ingeniería en Electrónica',
            'Ingeniería Mecánica',
            'Ingeniería Civil'
        ];
        
        return [
            'nombre' => $this->faker->unique()->randomElement($carreras),
        ];
    }
}
