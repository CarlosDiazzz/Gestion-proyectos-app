<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrera extends Model
{
    use HasFactory;
    protected $fillable = ['nombre'];

    // Relación Uno a Muchos: Una Carrera tiene muchos Participantes
    public function participantes()
    {
        return $this->hasMany(Participante::class, 'carrera_id');
    }
}
