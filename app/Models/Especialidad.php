<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especialidad extends Model
{
    use HasFactory;
    protected $table = 'especialidades'; // Explicitly define the table name
    protected $fillable = ['nombre'];

    // Relación Uno a Muchos: Una Especialidad tiene muchos Jueces
    public function jueces()
    {
        return $this->hasMany(Juez::class, 'especialidad_id');
    }
}
