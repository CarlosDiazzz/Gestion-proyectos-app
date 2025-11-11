<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Juez extends Model
{
    protected $fillable = ['nombre', 'correo', 'telefono', 'especialidad_id'];

    // Relación Inversa (Uno a Muchos): Un Juez pertenece a una Especialidad
    public function especialidad()
    {
        return $this->belongsTo(Especialidad::class, 'especialidad_id');
    }

    // Relación Uno a Muchos: Un Juez puede calificar muchos Proyectos
    public function calificaciones()
    {
        return $this->hasMany(Calificacion::class, 'juez_id');
    }
}
