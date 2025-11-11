<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('proyectos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('categoria');
            
            // Claves Foráneas (FKs)
            $table->foreignId('equipo_id')->constrained('equipos')->onDelete('restrict');
            // calificacion_id, avance_id, and repositorio_id will be added in separate migrations
            $table->foreignId('evento_id')->constrained('eventos')->onDelete('restrict');
            $table->foreignId('asesor_id')->constrained('asesores')->onDelete('restrict');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyectos');
    }
};
