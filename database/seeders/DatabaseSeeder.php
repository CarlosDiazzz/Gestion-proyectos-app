<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Rol;
use App\Models\Permiso;
use App\Models\Carrera;
use App\Models\Perfil;
use App\Models\Criterio;
use App\Models\Especialidad;
use App\Models\Equipo;
use App\Models\Asesor;
use App\Models\Juez;
use App\Models\Participante;
use App\Models\Evento;
use App\Models\Proyecto;
use App\Models\Avance;
use App\Models\Repositorio;
use App\Models\Calificacion;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call base seeders
        $this->call(RoleSeeder::class);
        // Permiso::factory(10)->create(); // Create some permissions if needed

        // Create independent models
        Carrera::factory(5)->create();
        Perfil::factory(5)->create();
        Especialidad::factory(5)->create();
        Asesor::factory(10)->create();
        Criterio::factory(10)->create();

        // Create Jueces (depends on Especialidad) - moved up
        Juez::factory(10)->create();

        // Create Eventos (depends on Juez) - moved down
        Evento::factory(5)->create();

        // Create Participantes (depends on User, Carrera)
        Participante::factory(30)->create();

        // Create Equipos
        Equipo::factory(10)->create()->each(function ($equipo) {
            // Attach participants to teams
            $participantes = Participante::inRandomOrder()->take(rand(1, 5))->get();
            foreach ($participantes as $participante) {
                $equipo->participantes()->attach($participante->id, ['perfil_id' => Perfil::inRandomOrder()->first()->id]);
            }
        });

        // Create Proyectos (depends on Equipo, Evento, Asesor)
        Proyecto::factory(20)->create()->each(function ($proyecto) {
            // Link Avance, Repositorio, Calificacion
            $proyecto->avance_id = Avance::factory()->create(['proyecto_id' => $proyecto->id])->id;
            $proyecto->repositorio_id = Repositorio::factory()->create(['proyecto_id' => $proyecto->id])->id;
            $proyecto->calificacion_id = Calificacion::factory()->create(['proyecto_id' => $proyecto->id])->id;
            $proyecto->save();
        });

        // Create a specific test user and assign 'administrador' role
        $testUser = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test Admin',
                'password' => bcrypt('password'),
                'is_active' => true,
            ]
        );
        $adminRole = Rol::where('nombre', 'administrador')->first();
        if ($adminRole) {
            $testUser->roles()->syncWithoutDetaching([$adminRole->id]);
        }
    }
}
