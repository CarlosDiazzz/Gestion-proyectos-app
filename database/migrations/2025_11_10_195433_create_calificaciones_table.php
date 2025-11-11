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
        Schema::create('calificaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyecto_id')->constrained('proyectos')->onDelete('cascade'); // Added proyecto_id
            $table->foreignId('juez_id')->constrained('jueces')->onDelete('cascade'); // Added juez_id
            $table->foreignId('criterio_id')->constrained('criterios')->onDelete('restrict');
            $table->decimal('puntuacion', 5, 2); // Renamed from 'calificacion'
            $table->text('comentarios')->nullable(); // Added comentarios
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calificaciones');
    }
};
