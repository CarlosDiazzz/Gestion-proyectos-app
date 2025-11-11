<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Especialidad extends Model
{
    protected $fillable = ['nombre'];

    // Relación Uno a Muchos: Una Especialidad tiene muchos Jueces
    public function jueces()
    {
        return $this->hasMany(Juez::class, 'especialidad_id');
    }
}
