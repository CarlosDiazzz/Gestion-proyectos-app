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
            $table->foreignId('calificacion_id')->nullable()->constrained('calificaciones')->onDelete('set null');
            $table->foreignId('evento_id')->constrained('eventos')->onDelete('restrict');
            $table->foreignId('asesor_id')->constrained('asesores')->onDelete('restrict');
            $table->foreignId('avance_id')->nullable()->constrained('avances')->onDelete('set null');
            $table->foreignId('repositorio_id')->nullable()->constrained('repositorios')->onDelete('set null');
            
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
