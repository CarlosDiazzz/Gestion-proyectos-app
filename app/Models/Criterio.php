<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Criterio extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'descripcion'];

    // Relación Uno a Muchos: Un Criterio tiene muchas Calificaciones
    public function calificaciones()
    {
        return $this->hasMany(Calificacion::class, 'criterio_id');
    }

    // Relación Muchos a Muchos: Un Criterio pertenece a muchos Proyectos
    public function proyectos()
    {
        return $this->belongsToMany(Proyecto::class, 'proyecto_criterio', 'criterio_id', 'proyecto_id');
    }
}
