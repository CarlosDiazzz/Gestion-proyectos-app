<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Rol; // Import the Rol model

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rol::firstOrCreate(['nombre' => 'administrador']);
        Rol::firstOrCreate(['nombre' => 'juez']);
        Rol::firstOrCreate(['nombre' => 'participante']);
    }
}
