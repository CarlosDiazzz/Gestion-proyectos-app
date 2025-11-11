<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    protected $fillable = ['nombre', 'fecha_inicio', 'fecha_fin', 'descripcion'];

    // Relación Uno a Muchos: Un Evento tiene muchos Proyectos
    public function proyectos()
    {
        return $this->hasMany(Proyecto::class, 'evento_id');
    }
}
