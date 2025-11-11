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
        Schema::create('participante_equipo', function (Blueprint $table) {
            $table->foreignId('participante_id')->constrained('participantes')->onDelete('cascade');
            $table->foreignId('perfil_id')->constrained('perfiles')->onDelete('restrict');
            $table->foreignId('equipo_id')->constrained('equipos')->onDelete('cascade');
            $table->primary(['participante_id', 'equipo_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participante_equipo');
    }
};
