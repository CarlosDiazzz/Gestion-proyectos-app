<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'fecha_inicio', 'fecha_fin', 'descripcion'];

    // Relación Uno a Muchos: Un Evento tiene muchos Proyectos
    public function proyectos()
    {
        return $this->hasMany(Proyecto::class, 'evento_id');
    }

    // Relación Muchos a Muchos: Un Evento tiene muchos Jueces
    public function jueces()
    {
        return $this->belongsToMany(Juez::class, 'evento_juez');
    }
}
