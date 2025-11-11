<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class Usuario extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'nombre',
        'correo',
        'password', // Changed from 'contraseña'
        'is_active',
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    // Relación Uno a Uno: Un Usuario puede ser un Participante
    public function participante()
    {
        return $this->hasOne(Participante::class, 'usuario_id'); // Referencia Usuario_id(FK) en Participante
    }

    // Relación Muchos a Muchos: Un Usuario tiene varios Roles (via Usuario_Rol)
    public function roles()
    {
        return $this->belongsToMany(Rol::class, 'usuario_rol', 'usuario_id', 'rol_id');
    }
}
