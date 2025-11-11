<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Repositorio extends Model
{
    protected $fillable = ['proyecto_id', 'url', 'tipo'];

    // Relación Inversa (Uno a Muchos): Un Repositorio pertenece a un Proyecto
    public function proyecto()
    {
        return $this->belongsTo(Proyecto::class, 'proyecto_id');
    }
}
