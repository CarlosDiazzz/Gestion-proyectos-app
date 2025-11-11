<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asesor extends Model
{
    protected $fillable = ['nombre', 'correo', 'telefono'];

    // Relación Uno a Muchos: Un Asesor tiene muchos Proyectos
    public function proyectos()
    {
        return $this->hasMany(Proyecto::class, 'asesor_id');
    }
}
