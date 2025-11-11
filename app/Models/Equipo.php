<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    protected $fillable = ['nombre', 'codigo_registro'];

    // Relación Uno a Muchos: Un Equipo tiene muchos Proyectos
    public function proyectos()
    {
        return $this->hasMany(Proyecto::class, 'equipo_id');
    }

    // Relación Muchos a Muchos: Un Equipo tiene muchos Participantes (via Participante_Equipo)
    public function participantes()
    {
        return $this->belongsToMany(Participante::class, 'participante_equipo', 'equipo_id', 'participante_id')
                    ->withPivot('perfil_id');
    }
}
