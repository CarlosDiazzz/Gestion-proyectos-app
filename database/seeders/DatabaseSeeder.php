<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Juez;
use App\Models\Evento;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);

        // Create one of each user type for easy testing
        User::factory()->withRole('administrador')->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        $juezUser = User::factory()->withRole('juez')->create([
            'name' => 'Judge User',
            'email' => 'judge@example.com',
        ]);

        Juez::factory()->create([
            'nombre' => $juezUser->name,
            'correo' => $juezUser->email,
        ]);

        User::factory()->withRole('participante')->create([
            'name' => 'Participant User',
            'email' => 'participant@example.com',
        ]);

        // Create additional participants
        User::factory()->count(10)->withRole('participante')->create();

        // Create additional judges
        Juez::factory()->count(5)->create();

        // Create events
        Evento::factory()->count(10)->create();
    }
}
