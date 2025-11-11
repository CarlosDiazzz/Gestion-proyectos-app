<?php

// app/Models/Participante.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participante extends Model
{
    protected $fillable = ['usuario_id', 'no_control', 'carrera_id', 'nombre', 'correo', 'telefono'];

    // Relación Inversa (Uno a Uno): El Participante pertenece a un Usuario
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    // Relación Muchos a Muchos: Un Participante pertenece a muchos Equipos (via Participante_Equipo)
    public function equipos()
    {
        return $this->belongsToMany(Equipo::class, 'participante_equipo', 'participante_id', 'equipo_id')
                    ->withPivot('perfil_id'); // Para acceder al Id perfil(FK) de la tabla pivote
    }
}
