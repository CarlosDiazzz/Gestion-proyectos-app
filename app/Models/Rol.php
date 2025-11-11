<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'roles'; // Explicitly define the table name
    protected $fillable = ['nombre'];

    // Relación Muchos a Muchos: Un Rol tiene varios Permisos (via Rol_Permiso)
    public function permisos()
    {
        return $this->belongsToMany(Permiso::class, 'rol_permiso', 'rol_id', 'permiso_id');
    }

    // Relación Muchos a Muchos: Un Rol pertenece a varios Usuarios (via Usuario_Rol)
    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'usuario_rol', 'rol_id', 'usuario_id');
    }
}
