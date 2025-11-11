<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Criterio extends Model
{
    protected $fillable = ['nombre', 'descripcion'];

    // Relación Uno a Muchos: Un Criterio tiene muchas Calificaciones
    public function calificaciones()
    {
        return $this->hasMany(Calificacion::class, 'criterio_id');
    }
}
