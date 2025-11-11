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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Renamed from 'nombre'
            $table->string('email')->unique(); // Renamed from 'correo'
            $table->timestamp('email_verified_at')->nullable(); // Added for User model
            $table->string('password'); // Renamed from 'contraseña'
            $table->string('two_factor_secret', 100)->nullable(); // Added for Fortify
            $table->text('two_factor_recovery_codes')->nullable(); // Added for Fortify
            $table->timestamp('two_factor_confirmed_at')->nullable(); // Added for Fortify
            $table->rememberToken(); // Added for User model
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
