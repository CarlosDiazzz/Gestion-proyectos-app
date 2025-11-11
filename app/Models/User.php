<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'usuarios'; // Use the 'usuarios' table

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_active', // Added from Usuario model
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    // Relación Uno a Uno: Un Usuario (User) puede ser un Participante
    public function participante()
    {
        return $this->hasOne(Participante::class, 'usuario_id'); // Referencia usuario_id(FK) en Participante
    }

    // Relación Uno a Uno: Un Usuario (User) puede ser un Juez
    public function juez()
    {
        return $this->hasOne(Juez::class, 'usuario_id'); // Referencia usuario_id(FK) en Juez
    }

    // Relación Muchos a Muchos: Un Usuario (User) tiene varios Roles (via Usuario_Rol)
    public function roles()
    {
        return $this->belongsToMany(Rol::class, 'usuario_rol', 'usuario_id', 'rol_id');
    }

    /**
     * Check if the user has a specific role.
     *
     * @param string $roleName
     * @return bool
     */
    public function hasRole(string $roleName): bool
    {
        return $this->roles->contains('nombre', $roleName);
    }
}
